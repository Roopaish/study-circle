import Container from "@/components/Container";
import { Collections, UniversityResponse } from "@/generated/pocketbaseTypes";
import pb from "@/utils/pb";
import Link from "next/link";

async function getUniversities() {
  const universities = await pb
    .collection(Collections.University)
    .getFullList<UniversityResponse>(2, {
      sort: "created",
    });

  // const res = await fetch("http://127.0.0.1:8090/api/collections/university/records?page=1&perPage=30");
  // const universities = await res.json();
  return universities ?? [];
}

export default async function Universities() {
  const universities = await getUniversities();

  return (
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Find your university
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
          See department and courses provided by your university.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:gap-10">
        {universities.map((university) => (
          <Link
            href={`/departments?university=${university.id}`}
            key={university.code}
            className="no-style overflow-hidden rounded bg-white shadow hover:bg-slate-100"
          >
            <div className="p-8">
              <div className="flex items-center">
                <img
                  className="h-auto w-12 flex-shrink-0"
                  src={university.image_url}
                  alt={university.name}
                  width={48}
                  height={48}
                />
                <div className="ml-5 mr-auto">
                  <p className="text-xl font-semibold text-black">
                    {university.name}
                  </p>
                  <p className="mt-px text-sm text-gray-600">
                    {university.location}
                  </p>
                </div>
                {/* <svg className="hidden w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg> */}
              </div>
              {/* <p className="text-base leading-relaxed text-gray-600 mt-7">Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p> */}
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
