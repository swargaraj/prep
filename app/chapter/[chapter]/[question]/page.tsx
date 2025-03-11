"use client";

import { use } from "react";
import QuestionContainer from "@/components/layout/container";

interface Props {
  params: Promise<{ chapter: string; question: string }>;
}

export default function QuestionPage({ params }: Props) {
  const { chapter, question } = use(params);

  return (
    <div className="min-h-dvh pt-20 text-white font-mono flex flex-col items-center justify-center p-4 w-full">
      <QuestionContainer chapter={chapter} question={question} />
    </div>
  );
}
