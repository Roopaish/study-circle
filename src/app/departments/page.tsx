"use client";

import Container from "@/components/Container";
import SelectField from "@/components/SelectField";
import {
  Collections,
  DepartmentResponse,
  UniversityResponse,
} from "@/generated/pocketbaseTypes";
import pb from "@/utils/pb";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DepartmentsList() {
  const router = useRouter();
  const params = useSearchParams();
  const [departments, setDepartments] = useState<
    DepartmentResponse<{ university_affiliation: UniversityResponse[] }>[]
  >([]);
  const [universities, setUniversities] = useState<UniversityResponse[]>([]);
  const [currentState, setCurrentState] = useState<
    "loading" | "loaded" | "empty"
  >("loading");

  useEffect(() => {
    async function fetchRecords() {
      const universities = await pb
        .collection(Collections.University)
        .getFullList<UniversityResponse>(200 /* batch size */, {
          sort: "-created",
        });
      setUniversities(universities);

      const departments = await pb
        .collection(Collections.Department)
        .getFullList<
          DepartmentResponse<{ university_affiliation: UniversityResponse[] }>
        >(200 /* batch size */, {
          sort: "-created",
          expand: "university_affiliation",
          filter: params.get("university")
            ? params.get("university") == "all"
              ? ""
              : `university_affiliation ~ "${params.get("university")}"`
            : "",
        });
      setDepartments(departments);

      if (departments.length === 0) {
        setCurrentState("empty");
      } else {
        setCurrentState("loaded");
      }
    }

    fetchRecords();
  }, [params]);

  return (
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Departments
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
          Explore departments and their subjects.
        </p>
      </div>

      <div className="mt-8 max-w-md">
        <SelectField
          label="Filter by University"
          name="university"
          id="university"
          options={[
            { label: "All university", value: "all" },
            ...universities.map((u) => {
              return {
                label: u.name,
                value: u.id,
              };
            }),
          ]}
          value={params.get("university") ?? ""}
          onChange={(e) => {
            if (e.target.value) {
              router.push(`/departments/?university=${e.target.value}`);
            }
          }}
        />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-0 xl:mt-20 xl:grid-cols-4">
        {currentState === "empty" ? (
          <div className="rounded-md  pb-4">
            <div className="ml-3 mr-auto min-w-0">
              <h1 className="truncate text-center text-2xl font-semibold text-black">
                No departments found.
              </h1>
            </div>
          </div>
        ) : currentState === "loading" ? (
          <div className="rounded-md  pb-4">
            <div className="ml-3 mr-auto min-w-0">
              <h1 className="truncate text-center text-2xl font-semibold text-black">
                Loading...
              </h1>
            </div>
          </div>
        ) : (
          <div>
            {departments.map((d) => {
              return (
                <Link
                  href={`/subjects?department=${d.id}`}
                  key={d.id}
                  className="no-style block rounded-md bg-white pb-4 hover:bg-slate-100"
                >
                  <div className="ml-3 mr-auto min-w-0">
                    <p className="truncate text-base font-semibold text-black">
                      {d.name}
                    </p>
                    <p className="truncate text-sm text-gray-600">
                      {d.expand?.university_affiliation
                        .map((u) => "@" + u.code)
                        .join(" ")}
                    </p>
                    {/* <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    You made it so simple. My new site is so much faster and easier
                    to work with than my old site. I just choose the page, make the
                    change and click save.
                    <span className="block text-sky-500">#another</span>
                  </p>
                </blockquote> */}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}
