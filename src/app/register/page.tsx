"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import {
  Collections,
  DepartmentResponse,
  TagsResponse,
  UniversityResponse,
} from "@/generated/pocketbaseTypes";
import pb from "@/utils/pb";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Tag, WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function RegisterPage() {
  const [universities, setUniversities] = useState<UniversityResponse[]>([]);
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);

  const router = useRouter();

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

  useEffect(() => {
    async function getRecords() {
      const u = await pb
        .collection(Collections.University)
        .getFullList<UniversityResponse>(200 /* batch size */, {
          sort: "-created",
        });
      setUniversities(u);

      const d = await pb
        .collection(Collections.Department)
        .getFullList<DepartmentResponse>(200 /* batch size */, {
          sort: "-created",
        });
      setDepartments(d);

      const records = await pb
        .collection("resource")
        .getFullList(200 /* batch size */, {
          sort: "-created",
        });
    }

    getRecords();
  }, []);

  async function onSubmit(e: any) {
    e.preventDefault();

    const data = {
      username: e.target["username"].value,
      email: e.target["email"].value,
      emailVisibility: true,
      password: e.target["password"].value,
      passwordConfirm: e.target["passwordConfirm"].value,
      name: e.target["name"].value,
      universityId: e.target["university"].value,
      depId: e.target["department"].value,
      tag_affiliation: [...tags.map((t) => t.id)],
    };
    try {
      await pb.collection("users").create(data);
      toast("Account Registered! Please login now", { type: "success" });
      router.push("/login");
    } catch (e: any) {
      toast(e.message, { type: "error" });
    }
  }

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="">
              Register to Study<span className="text-orange-500 ">O</span>
            </h2>
            <p>
              {" "}
              Already have an account?{" "}
              <Link
                href="/login"
                title=""
                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
              >
                Login now
              </Link>
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <InputField label="Email" type="email" name="email" required />
              <InputField label="Name" type="text" name="name" required />
              <SelectField
                options={universities.map((u) => {
                  return { label: u.name, value: u.id };
                })}
                label="University"
                name="university"
                required
              />
              <SelectField
                options={departments.map((u) => {
                  return { label: u.name, value: u.id };
                })}
                label="Department"
                name="department"
                required
              />
              <div>
                <label className="block pb-2.5 text-base font-medium text-gray-900">
                  Question Tags
                </label>
                <ReactTags
                  placeholder="Please enter tags you're interested in"
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
              <InputField
                label="Username"
                type="text"
                name="username"
                required
              />
              <InputField
                label="Password"
                type="password"
                name="password"
                required
              />
              <InputField
                label="Confirm Password"
                type="password"
                name="passwordConfirm"
                required
              />

              <Button type="submit">Register</Button>
            </form>

            {/* <div className="mt-3 space-y-3">
              <SocialButton
                icon={
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                }
              >
                Sign up with Google
              </SocialButton>
            </div> */}
          </div>
        </div>

        <div className="flex items-center justify-center bg-gray-50 px-4 py-10 sm:py-16 sm:px-6 lg:py-24 lg:px-8">
          <div>
            <Image
              className="mx-auto w-full max-w-sm"
              src="/images/books.png"
              alt="books"
              width={300}
              height={300}
              quality={100}
            />
            <div className="mx-auto w-full max-w-md xl:max-w-xl">
              <h3 className="text-center text-2xl font-bold text-black">
                Learn together, grow together
              </h3>
              <p className="mt-2.5 text-center leading-relaxed text-gray-500">
                StudyO is a community of students who are passionate about
                learning and sharing knowledge. Join us and learn together.
              </p>

              <div className="mt-10 flex items-center justify-center space-x-3">
                <div className="h-1.5 w-20 rounded-full bg-orange-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
