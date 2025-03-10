"use cache";

import { Suspense } from "react";
import { getExams } from "@/services/exams";
import { ExamsPage, ExamsLoading } from "./exams";

async function ExamClient() {
  const exams = await getExams();
  return <ExamsPage exams={exams} />;
}

export default async function Page() {
  return (
    <Suspense fallback={<ExamsLoading />}>
      <ExamClient />
    </Suspense>
  );
}
