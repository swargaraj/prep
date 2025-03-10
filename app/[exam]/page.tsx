"use cache";

import { getExamSubjects } from "@/services/exams";
import { notFound } from "next/navigation";
import { SubjectPage, SubjectLoading } from "./subjects";
import { Suspense } from "react";

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

export default async function Page({
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
