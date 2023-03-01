"use client";

import Container from "@/components/Container";
import SelectField from "@/components/SelectField";
import {
  Collections,
  DepartmentResponse,
  SubjectResponse,
} from "@/generated/pocketbaseTypes";
import pb from "@/utils/pb";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubjectList() {
  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
  const router = useRouter();
  const params = useSearchParams();
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);

  useEffect(() => {
    async function fetchRecords() {
      const departments = await pb
        .collection(Collections.Department)
        .getFullList<DepartmentResponse>(200 /* batch size */, {
          sort: "-created",
        });
      setDepartments(departments);

      const subjects = await pb
        .collection(Collections.Subject)
        .getFullList<SubjectResponse>(200 /* batch size */, {
          sort: "-created",
          filter: params.get("department")
            ? params.get("department") == "all"
              ? ""
              : `department_affiliation ~ "${params.get("department")}"`
            : "",
        });
      setSubjects(subjects);
    }

    fetchRecords();
  }, [params]);

  return (
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-10 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          All Subjects
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
          Explore all the subjects and find the one you are interested in.
        </p>
      </div>

      <div className="mt-8 max-w-md">
        <SelectField
          label="Filter by Department"
          name="university"
          id="university"
          options={[
            { label: "All Subjects", value: "all" },
            ...departments.map((u) => {
              return {
                label: u.name,
                value: u.id,
              };
            }),
          ]}
          value={params.get("department") ?? ""}
          onChange={(e) => {
            if (e.target.value) {
              router.push(`/subjects/?department=${e.target.value}`);
            }
          }}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:mt-12 xl:grid-cols-4">
        {subjects.map((s) => {
          return (
            <Link
              key={s.id}
              href={`/subjects/${s.id}`}
              title=""
              className="no-style inline-flex h-full items-center justify-center rounded-md border-2 border-black px-4 py-4 text-black transition-all duration-200 hover:bg-black hover:text-white focus:bg-black focus:text-white"
              role="button"
            >
              {s.name}
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
