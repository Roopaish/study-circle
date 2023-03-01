import {
  QuestionResponse,
  SubjectResponse,
  TagsResponse,
  UsersResponse,
} from "@/generated/pocketbaseTypes";
import Link from "next/link";
import Avatar from "./Avatar";

export default function Question({
  question: q,
}: {
  question: QuestionResponse<{
    subject_affiliation: SubjectResponse;
    user_affiliation: UsersResponse;
    tag_affiliation: TagsResponse[];
  }>;
}) {
  return (
    <div
      key={q.id}
      className="block overflow-hidden rounded-md border-2 text-blue-600  hover:bg-slate-100 hover:text-blue-700"
    >
      <div className="pl-2 pr-2 pb-2 pt-4">
        <div className="flex items-start">
          <div>
            <Avatar name={q.expand?.user_affiliation?.name ?? "A B"} />
          </div>
          <div className="ml-5 w-full">
            <Link
              href={`/subjects/${q.expand?.subject_affiliation.id}/${q.id}`}
              className="no-style w-full  space-y-1"
            >
              <h1>{q.expand?.user_affiliation?.name}</h1>
              <p className="no-style text-xl font-semibold text-black">
                {q.title}
              </p>
              <p className="max-h-[72px] overflow-hidden">{q.body}</p>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 space-x-1">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </span>
                  <span className="text-lg font-bold">{q.rating}</span>
                </div>
              </div>
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {q.expand?.tag_affiliation?.map((tag) => (
                <div
                  key={tag.id}
                  className="rounded-md bg-gray-200 px-2 py-1 text-sm font-semibold"
                >
                  {tag.tagname}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
