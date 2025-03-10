"use client";

import { use } from "react";
import "katex/dist/katex.min.css";
import QuestionContainer from "@/components/layout/container";

interface Props {
  params: Promise<{ exam: string; chapter: string; question: string }>;
}

export default function Page({ params }: Props) {
  const { exam, chapter, question } = use(params);

  return (
    <div className="min-h-dvh pt-20 text-white font-mono flex flex-col items-center justify-center p-4 w-full">
      <QuestionContainer exam={exam} chapter={chapter} question={question} />
    </div>
  );
}
