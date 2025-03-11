"use cache";

import type { Metadata } from "next";

import { Suspense } from "react";
import { getExams } from "@/services/exams";
import { ExamPage, ExamsLoading } from "./exams";
import Footer from "@/components/layout/footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Exams • swrg.dev",
  };
}

async function ExamClient() {
  const exams = await getExams();
  return <ExamPage exams={exams} />;
}

export default async function ExamsPage() {
  return (
    <Suspense fallback={<ExamsLoading />}>
      <ExamClient />
      <Footer />
    </Suspense>
  );
}
