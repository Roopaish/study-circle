"use client";

import pb from "@/utils/pb";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import InputField from "@/components/InputField";
import { useEffect, useState } from "react";
import { Collections, QuestionResponse } from "@/generated/pocketbaseTypes";
import { useRouter, useSearchParams } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [searchQsns, setSearchQsns] = useState<QuestionResponse[]>([]);

  useEffect(() => {
    async function getQsns() {
      const qsns = await pb
        .collection(Collections.Question)
        .getList<QuestionResponse>(1, 5, {
          filter: `title ?~ "${params.get("q")}" || body ?~ "${params.get(
            "q"
          )}"`,
        });

      setSearchQsns(qsns.items);
    }

    getQsns();
  }, [params]);

  const [showSuggestions, setShowSuggesttions] = useState(false);

  return (
    <html lang="en">
      <head />
      <body>
        <ToastContainer />
        <header className="">
          <div className="mx-auto flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
            <Link href="/" className="no-style">
              <h1 className="flex items-center justify-center text-2xl font-bold">
                <span>Study</span>
                <span className="text-3xl text-orange-500">O</span>
              </h1>
            </Link>
            <nav className="ml-auto hidden w-full flex-1 items-center justify-center space-x-10 md:flex ">
              {/* <Link
                  href="/universities"
                  className="no-style text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                >
                  Universities
                </Link>
                <Link
                  href="/departments"
                  className="no-style text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                >
                  Departments
                </Link> */}
              <Link
                href="/subjects"
                className="no-style text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
              >
                All Subjects
              </Link>
              <InputField
                placeholder="Search Questions"
                className="w-full"
                type="search"
                onFocus={() => setShowSuggesttions(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowSuggesttions(false);
                  }, 300);
                }}
                onChange={(e) => {
                  if (e.target.value) {
                    router.push(`?q=${e.target.value}`);
                  }
                }}
              />
              {showSuggestions && (
                <section className="absolute top-[105px] left-0 right-0  space-y-2 border bg-white p-4">
                  {searchQsns.map((q) => (
                    <Link
                      key={q.id}
                      href={`/subjects/${q.subject_affiliation}/${q.id}`}
                      className="block bg-slate-100 p-5 hover:bg-slate-200"
                    >
                      {q.title}
                    </Link>
                  ))}
                </section>
              )}
            </nav>
            <nav className="ml-auto flex items-center justify-center space-x-4">
              {pb.authStore.isValid ? (
                <div className="flex items-center gap-2">
                  <span>{pb.authStore.model?.name}</span>
                  <span
                    className="cursor-pointer rounded-sm bg-red-500 p-2 text-white"
                    onClick={() => {
                      pb.authStore.clear();
                      router.refresh();
                    }}
                  >
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
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </span>
                </div>
              ) : (
                <Link
                  href="/register"
                  title=""
                  className="no-style rounded-full bg-black px-4 py-2 text-base font-semibold text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Join now
                </Link>
              )}
            </nav>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
          <div id="message-renderer"></div>
        </main>

        <footer className="bg-gray-50 py-10 sm:pt-16 lg:pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-y-16 gap-x-12 md:col-span-3 lg:grid-cols-6">
              <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                <Link href="/" className="no-style">
                  <h1 className="flex items-center justify-start text-2xl font-bold">
                    <span>Study</span>
                    <span className="text-3xl text-orange-500">O</span>
                  </h1>
                </Link>
                <p className="mt-7 text-base leading-relaxed text-gray-600">
                  StudyCircle, Connect with peers and ace your courses with our
                  University Q&A Platform.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                  Links
                </p>
                <nav className="mt-6 space-y-4">
                  <Link
                    href="/universities"
                    className="no-style  block text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                  >
                    Universities
                  </Link>
                  <Link
                    href="/departments"
                    className="no-style block text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                  >
                    Departments
                  </Link>
                  <Link
                    href="/subjects"
                    className="no-style block text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                  >
                    Subjects
                  </Link>
                </nav>
              </div>
            </div>

            <hr className="mt-16 mb-10 border-gray-200" />
            <p className="text-center text-sm text-gray-600">
              © Copyright 2023, All Rights Reserved by StudyCircle
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
