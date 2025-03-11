"use cache";

import type { Metadata } from "next";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getExamSubjects } from "@/services/exams";
import { SubjectPage, SubjectLoading } from "./subjects";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Loading • swrg.dev",
  };
}

async function fetchSubjects(examId: string) {
  try {
    const data = await getExamSubjects(examId);
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return null;
  }
}

async function SubjectClient({ exam }: { exam: string }) {
  const subjects = await fetchSubjects(exam);

  if (!subjects) return notFound();

  return <SubjectPage subjects={subjects} />;
}

export default async function SubjectsPage({
  params,
}: {
  params: Promise<{ exam: string }>;
}) {
  const { exam } = await params;
  return (
    <Suspense fallback={<SubjectLoading />}>
      <SubjectClient exam={exam} />
    </Suspense>
  );
}
