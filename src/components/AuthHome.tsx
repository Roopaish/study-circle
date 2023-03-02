"use client";

import InputField from "@/components/InputField";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Icon from "@/components/icons";
import Modal from "@/components/Modal";
import Question from "@/components/Question";
import SelectField from "@/components/SelectField";
import {
  Collections,
  QuestionResponse,
  SubjectResponse,
  TagsResponse,
  UsersResponse,
} from "@/generated/pocketbaseTypes";
import pb from "@/utils/pb";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import { Tag, WithContext as ReactTags } from "react-tag-input";
import { toast } from "react-toastify";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function AuthHome() {
  const [body, setBody] = useState("");
  const [askingQuestion, setAskingQuestion] = useState(false);
  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
  const [questions, setQuestions] = useState<
    QuestionResponse<{
      subject_affiliation: SubjectResponse;
      user_affiliation: UsersResponse;
      tag_affiliation: TagsResponse[];
    }>[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchRecords() {
      const subjects = await pb
        .collection(Collections.Subject)
        .getFullList<SubjectResponse>(200, {
          sort: "-created",
        });
      setSubjects(subjects);

      const resourceFilter = pb.authStore.model?.tag_affiliation
        .map((tag: string) => `tag_affiliation ~ "${tag}"`)
        .join(" || ");
      console.log(resourceFilter);
      const questions = await pb.collection(Collections.Question).getFullList<
        QuestionResponse<{
          subject_affiliation: SubjectResponse;
          user_affiliation: UsersResponse;
          tag_affiliation: TagsResponse[];
        }>
      >(10, {
        sort: `-created`,
        expand: "subject_affiliation,user_affiliation,tag_affiliation",
        filter: resourceFilter,
      });

      setQuestions(questions);
    }

    fetchRecords();
  }, []);

  // Question tags
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [customTag, setCustomTag] = useState<Tag | undefined>();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchRecords() {
      const tags = await pb
        .collection("tags")
        .getFullList<TagsResponse>(200 /* batch size */, {
          sort: "-created",
        });
      setSuggestions(
        tags.map((t) => {
          return {
            id: t.id,
            text: t.tagname,
          };
        })
      );
    }

    fetchRecords();
  }, []);

  // useEffect(() => {
  //   if (!customTag) return;
  //   if (customTag.text.trim() == "") return;

  //   if (suggestions.some((value) => value.text != customTag.text)) {
  //     setSuggestions((prevSuggestion) => [{ id: 'addNew', text: `${customTag.text} (Click to add)` }, ...prevSuggestion])
  //   }
  // }, [customTag])

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = async (tag: Tag) => {
    if (tag.id == "addNew") {
      const newTag = await pb.collection("tags").create<TagsResponse>({
        tagname: tag.text.split(":")[0],
      });

      const _tag = { id: newTag.id, text: newTag.tagname };
      setSuggestions((prevSuggestions) => [_tag, ...prevSuggestions]);

      setTags([...tags, _tag]);
      return;
    }

    setTags([...tags, tag]);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  async function submitQsn(e: any) {
    e.preventDefault();
    const data = {
      title: e.target["title"].value,
      body: body,
      user_affiliation: pb.authStore.model?.id,
      // "answer_affiliation": [
      //     "RELATION_RECORD_ID"
      // ],
      subject_affiliation: e.target["subject"].value,
      // "rating_affiliation": [
      //     "RELATION_RECORD_ID"
      // ],
      tag_affiliation: [...tags.map((t) => t.id)],
    };

    const spamData =
      e.target["title"].value + " " + body + tags.map((t) => t.id).join(" ");

    try {
      const res = await fetch("http://localhost:8000", {
        method: "POST",
        body: JSON.stringify({ content: spamData }),
      });

      const data = await res.json();

      const isValid = data.safe;

      if (!isValid) {
        toast("Please be respectfull", { type: "error" });
        return;
      }

      const qsn = await pb.collection("question").create(data);
      toast("Qsn posted successfully", { type: "success" });
      router.push(`/subjects/${e.target["subject"].value}/${qsn.id}`, {
        forceOptimisticNavigation: true,
      });
    } catch (e: any) {
      console.log(e);
      toast(e.message, { type: "error" });
    }
  }

  return (
    <section className=" bg-gray-50 p-6">
      <div className="container">
        <Modal
          variant="screen"
          title="Ask question"
          trigger={
            <button
              className="fixed bottom-5 right-5 mt-4 flex max-w-max items-center justify-between gap-4 rounded-md border border-gray-300 bg-orange-500 py-3 px-4 text-base font-medium text-black shadow-sm hover:bg-orange-400  "
              onClick={() => setAskingQuestion(!askingQuestion)}
            >
              <span>Ask Question</span>
              <Icon type="help-circle" />
            </button>
          }
        >
          <form
            className="mx-auto mt-10 max-w-3xl space-y-4"
            onSubmit={submitQsn}
          >
            <SelectField
              label="Subject"
              required
              name="subject"
              options={subjects.map((s) => {
                return { value: s.id, label: s.name };
              })}
            />
            <InputField label="Question Title" required name="title" />
            <div>
              <label className="block pb-2.5 text-base font-medium text-gray-900">
                Question Tags
              </label>
              <ReactTags
                tags={tags}
                suggestions={
                  customTag
                    ? suggestions.some((tag) => tag.text == customTag.text)
                      ? suggestions
                      : [
                          {
                            id: "addNew",
                            text: `${customTag.text}:(Click to add)`,
                          },
                          ...suggestions,
                        ]
                    : suggestions
                }
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
                handleInputChange={(value) => {
                  setCustomTag({ text: value, id: value });
                }}
              />
            </div>

            <div>
              <label className="mb-2.5 block text-base font-medium text-gray-900">
                Question Description
              </label>
              <article className="prose max-w-3xl lg:prose-xl prose-img:max-h-60">
                <SimpleMDE value={body} onChange={setBody}></SimpleMDE>
              </article>
            </div>
            <div className="text-right">
              <Button
                type="submit"
                className="max-w-[150px] bg-green-600 hover:bg-green-500 focus:bg-green-500"
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal>

        {/* Qsns */}
        {/* <h2 className="mt-20 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
      Recommended Questions
    </h2>
    <p className="mt-4 text-base leading-relaxed text-gray-600">
      Questions you might be interested in.
    </p> */}

        <div className="mx-auto grid max-w-3xl  grid-cols-1 gap-6">
          {questions.map((q) => (
            <div key={q.id}>
              <Question question={q} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
