"use client";

import Container from "@/components/Container";
import {
  AnswerRatingResponse,
  AnswerResponse,
  Collections,
  QuestionRatingResponse,
  QuestionResponse,
  ResourceResponse,
  SubjectResponse,
  TagsResponse,
  UsersResponse,
} from "@/generated/pocketbaseTypes";
import pb, { openAIApiKey, url } from "@/utils/pb";
import { useEffect, useState } from "react";

import Answer from "@/components/Answer";
import Button from "@/components/Button";
import Icon from "@/components/icons";
import "easymde/dist/easymde.min.css";
import Markdown from "markdown-to-jsx";
import SimpleMDE from "react-simplemde-editor";
import { toast } from "react-toastify";

export default function QuestionAnswers({
  params,
}: {
  params: { questionId: string; subjectId: string };
}) {
  const [q, setQuestion] = useState<
    QuestionResponse<{
      subject_affiliation: SubjectResponse;
      user_affiliation: UsersResponse;
      rating_affiliation: QuestionRatingResponse[];
      tag_affiliation: TagsResponse[];
    }>
  >();
  const [answers, setAnswers] = useState<
    AnswerResponse<{
      user_affiliation: UsersResponse;
      rating_affiliation: AnswerRatingResponse[];
    }>[]
  >([]);
  const [resources, setResources] = useState<ResourceResponse[]>([]);
  const [body, setBody] = useState("");
  const [answering, setAnswering] = useState(false);
  const [generatedAns, setGeneratedAns] = useState<string | null>(null);

  const [currentQsnRating, setCurrentQsnRating] = useState<number>();

  useEffect(() => {
    async function fetchRecords() {
      const _question = await pb.collection(Collections.Question).getOne<
        QuestionResponse<{
          subject_affiliation: SubjectResponse;
          user_affiliation: UsersResponse;
          rating_affiliation: QuestionRatingResponse[];
          tag_affiliation: TagsResponse[];
        }>
      >(params.questionId, {
        expand:
          "subject_affiliation,user_affiliation,rating_affiliation,tag_affiliation",
      });

      setQuestion(_question);
      var shouldGenerateResponse = false;

      if (_question.generated_ans != null) {
        if (_question.generated_ans.trim() == "") {
          shouldGenerateResponse = true;
        } else {
          shouldGenerateResponse = false;
        }
      } else {
        shouldGenerateResponse = true;
      }

      if (shouldGenerateResponse) {
        console.log("ooo");
        const data = {
          // prompt:
          // (_question.body ?? "").length < _question.title.length
          //   ? _question.title
          //   : _question.body,
          // max_tokens: 100,
          // n: 1,
          // stop: null,
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content:
                (_question.body ?? "").length < _question.title.length
                  ? _question.title
                  : _question.body,
            },
          ],
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAIApiKey}`,
          },
          body: JSON.stringify(data),
        };
        const apiUrl = "https://api.openai.com/v1/chat/completions";

        fetch(apiUrl, options)
          .then((response) => response.json())
          .then(async (data) => {
            setGeneratedAns(data.choices[0].message.content);

            // update the database
            const _data = {
              title: _question.title,
              user_affiliation: _question.user_affiliation,
              subject_affiliation: _question.subject_affiliation,
              tag_affiliation: _question.tag_affiliation,
              generated_ans: data.choices[0].message.content,
            };

            await pb.collection("question").update(_question.id, _data);
          })
          .catch((error) => console.error(error));
      } else {
        setGeneratedAns(_question.generated_ans!);
      }

      const _answers = await pb.collection(Collections.Answer).getFullList<
        AnswerResponse<{
          user_affiliation: UsersResponse;
          rating_affiliation: AnswerRatingResponse[];
        }>
      >(200, {
        sort: "-created",
        filter: `question_affiliation="${params.questionId}"`,
        expand: "user_affiliation,rating_affiliation",
      });

      setAnswers(_answers);

      const resourceFilter = _question?.expand?.tag_affiliation
        .map((tag) => `tag_affiliation ~ "${tag.id}"`)
        .join(" || ");

      const _resources = await pb
        .collection(Collections.Resource)
        .getFullList<ResourceResponse>(200, {
          sort: "-created",
          filter: `subject_affiliation="${params.subjectId}" || ${resourceFilter} `,
        });

      setResources(_resources);
    }

    fetchRecords();
  }, [params]);

  async function submitAns(e: any) {
    e.preventDefault();
    if (!body || body == "") return;

    if (!pb.authStore.model?.id)
      return toast("You must be logged in to answer a question!", {
        type: "error",
      });

    try {
      const data = {
        body: body,
        user_affiliation: pb.authStore.model?.id,
        question_affiliation: params.questionId,
      };

      const ans = await pb.collection(Collections.Answer).create<
        AnswerResponse<{
          user_affiliation: UsersResponse;
          rating_affiliation: AnswerRatingResponse[];
        }>
      >(data, {
        expand: "user_affiliation,rating_affiliation",
      });
      toast("Answer Posted", { type: "success" });
      setAnswers([ans, ...answers]);
      setBody("");
      setAnswering(false);
    } catch (e: any) {
      toast(e.message, { type: "error" });
    }
  }

  return (
    <Container>
      {!q ? (
        <h2>No page found</h2>
      ) : (
        <div className="mx-auto max-w-4xl">
          <article className="relative z-10 cursor-pointer border border-gray-200 bg-white shadow transition-all duration-200 hover:bg-gray-50">
            <div className="flex w-full px-4 py-5 sm:p-6">
              <section className="flex flex-col items-center justify-center space-y-2">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-400 text-gray-400 transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    ></path>
                  </svg>
                </button>
                <span className="text-sm font-semibold text-gray-400">
                  {" "}
                  {q.rating}{" "}
                </span>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-400 text-gray-400 transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
              </section>
              <section className="ml-10 w-full text-left">
                <h1 className=" text-lg font-semibold text-black">{q.title}</h1>
                <article className="prose max-w-full prose-img:max-h-60">
                  <Markdown>{q.body ?? ""}</Markdown>
                </article>
                <section className="mt-4 flex flex-wrap items-center gap-2">
                  {q.expand?.tag_affiliation?.map((tag) => (
                    <div
                      key={tag.id}
                      className="rounded-md bg-gray-200 px-2 py-1 text-sm font-semibold"
                    >
                      {tag.tagname}
                    </div>
                  ))}
                </section>
              </section>
            </div>
          </article>

          <section className="-z-10  -mt-2 ml-2 mr-2 rounded-lg bg-[#444654] pt-6 pl-3 pr-3 pb-3 text-white">
            {generatedAns != null && generatedAns.trim() != "" ? (
              <>
                <h1 className="italic">Answer generated by bot:</h1>
                {generatedAns}
                <div className="text-slate100 mt-5 text-right text-xs italic">
                  Disclaimer: The data might not fully be accurate{" "}
                </div>
              </>
            ) : (
              "Generating answer..."
            )}
          </section>

          {resources.length != 0 && (
            <article className="mt-10">
              <button
                type="button"
                className="mt-4 flex max-w-max items-center justify-between gap-4 rounded-md border border-gray-300 py-3 px-4 text-base font-medium  shadow-sm "
              >
                <span>Suggested Resources</span>
                <span>
                  <Icon type="arrow" className={`rotate-90`} />{" "}
                </span>
              </button>
              <div className="rounded-md border border-gray-300 py-3 px-4 text-base font-medium  shadow-sm ">
                {resources.map((r) => (
                  <a
                    key={r.id}
                    className="block"
                    href={`${url}/api/files/resource/${r.id}/${r.file}`}
                  >
                    {r.name}
                  </a>
                ))}
              </div>
            </article>
          )}

          {pb.authStore.isValid && (
            <section className="mt-10">
              <form className="space-y-4" onSubmit={submitAns}>
                <button
                  onClick={() => {
                    setAnswering(!answering);
                  }}
                  type="button"
                  className="mt-4 flex max-w-max items-center justify-between gap-4 rounded-md border border-gray-300 py-3 px-4 text-base font-medium  shadow-sm "
                >
                  <span>Want to answer?</span>
                  <span>
                    <Icon
                      type="arrow"
                      className={`${
                        answering ? "rotate-90" : "rotate-0"
                      } transition-all`}
                    />{" "}
                  </span>
                </button>
                {answering && (
                  <div>
                    <article className="prose max-w-full prose-img:max-h-60">
                      <SimpleMDE value={body} onChange={setBody}></SimpleMDE>
                    </article>

                    <div className="text-right">
                      <Button
                        type="submit"
                        className="max-w-[150px] bg-green-600 hover:bg-green-500 focus:bg-green-500"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </section>
          )}

          <section className="mt-10 space-y-20">
            {answers.map((a) => (
              <div key={q.id}>
                <Answer answer={a} />
              </div>
            ))}
          </section>
        </div>
      )}
    </Container>
  );
}
