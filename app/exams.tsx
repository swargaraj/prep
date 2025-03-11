"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExamItem } from "@/lib/types";
import LoadingDots from "@/components/layout/dots";

interface ExamPageClientProps {
  exams: ExamItem[];
}

export function ExamPage({ exams }: ExamPageClientProps) {
  return (
    <div className="min-h-screen md:py-20 py-6 flex flex-col items-center justify-center p-4">
      <div className="md:w-[80%] w-[95%]">
        <h2 className="text-lg font-mono text-gray-400 mb-4">Select Exam</h2>
        <div className="grid gap-3">
          {exams.map((exam, index) => (
            <Link
              key={index}
              href={`/exam/${exam.examId}`}
              className="hover:bg-muted-foreground/5 hover:border-gray-700 cursor-pointer p-4 border border-input bg-background shadow-xs"
            >
              <div className="font-mono text-lg text-gray-200">
                {exam.title}
                <div className="text-sm text-gray-500 mt-2">{exam.tagline}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExamsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading exams <LoadingDots /></p>
    </div>
  );
}
