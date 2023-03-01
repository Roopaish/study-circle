"use client";

import AuthHome from "@/components/AuthHome";
import Container from "@/components/Container";
import pb from "@/utils/pb";

export default function Home() {
  return (
    <>
      {pb.authStore.isValid ? (
        <AuthHome />
      ) : (
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                Study<span className="text-orange-500 ">Circle</span>
                <br /> Students Q&A Platform
              </h1>

              <p className="mt-8 text-base text-black sm:text-xl">
                Connect with peers and ace your courses with our University Q&A
                Platform. Get answers to your academic questions, organized by
                university, department, and subject
              </p>
            </div>
            <div>
              <img src="/images/reading-girl.svg" alt="papers" />
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
