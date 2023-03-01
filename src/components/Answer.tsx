'use client'

import { AnswerRatingResponse, AnswerResponse, Collections, UsersResponse } from "@/generated/pocketbaseTypes";
import pb from "@/utils/pb";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import Avatar from "./Avatar";

export default function Answer({
  answer
}: {
  answer: AnswerResponse<{
    user_affiliation: UsersResponse;
    rating_affiliation: AnswerRatingResponse[];
  }>
}) {
  const [currentRating, setCurrentRating] = useState<number>(answer.rating ?? 0);
  const [hasUpvoted, setHasUpvoted] = useState<boolean>((pb.authStore.isValid && answer.expand?.rating_affiliation?.some(rating => rating.value === 1)) ?? false);
  const [hasDownvoted, setHasDownvoted] = useState<boolean>((pb.authStore.isValid && answer.expand?.rating_affiliation?.some(rating => rating.value === -1)) ?? false);

  async function updateAnswer(rating: number) {
    const data = {
      "body": answer.body,
      "user_affiliation": answer.user_affiliation,
      "question_affiliation": answer.question_affiliation,
      "rating": rating
    };

    await pb.collection('answer').update(answer.id, data);
  }

  return (
    <article className="border-2">
      <div className="flex w-full items-center justify-between px-4 py-5 sm:p-6">
        <div className="flex items-center space-x-2">
          <Avatar name={answer.expand?.user_affiliation.name ?? "A B"} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-black">
              {answer.expand?.user_affiliation.name ?? ""}
            </span>
            {/* <span className="text-sm font-semibold text-gray-400">
                    {answer.expand?.user_affiliation.username ?? ""}
                  </span> */}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            disabled={
              hasUpvoted
            }
            onClick={async () => {
              const data = {
                "value": 1,
                "user_affiliation": pb.authStore.model?.id,
                "answer_affiliation": answer.id,
              };
              try {
                await pb.collection(Collections.AnswerRating).create(data);
                updateAnswer(currentRating + 1);
                setHasUpvoted(true);
                setCurrentRating(currentRating + 1);
              } catch (e: any) {
                toast(e.message, { type: "error" })
              }
            }}

            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200 ${hasUpvoted ? "text-green-500 border-green-500" : "text-gray-400 border-gray-400 "}`}
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
          <span>{currentRating}</span>
          <button
            disabled={
              hasDownvoted
            }
            onClick={async () => {
              const data = {
                "value": -1,
                "user_affiliation": pb.authStore.model?.id,
                "answer_affiliation": answer.id,
              };
              try {
                await pb.collection(Collections.AnswerRating).create<AnswerRatingResponse>(data);
                updateAnswer(currentRating - 1);
                setHasDownvoted(true);
                setCurrentRating(currentRating - 1);
              } catch (e: any) {
                toast(e.message, { type: "error" })
              }
            }}
            type="button"
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${hasDownvoted ? "text-red-500 border-red-500" : "text-gray-400 border-gray-400"} transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100`}
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
        </div>
      </div>
      <div className="w-full px-4 py-5 sm:p-6">
        <article className="prose max-w-full  prose-img:max-h-60">
          <Markdown>{answer.body ?? ""}</Markdown>
        </article>
      </div>
    </article>
  );
}