"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ExamSubjectItem } from "@/lib/types";
import LoadingDots from "@/components/layout/dots";

interface Props {
  subjects: {
    title: string;
    subjects: ExamSubjectItem[];
  };
}

export function SubjectPage({ subjects }: Props) {
  useEffect(() => {
    document.title = `${subjects.title} • swrg.dev`;
  }, [subjects.title]);

  return (
    <div className="min-h-screen md:py-20 py-6 flex flex-col items-center justify-center p-4">
      <div className="md:w-[80%] w-[95%]">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-300 mb-8 inline-block"
        >
          ← Back to Exams
        </Link>

        <h1 className="text-2xl md:text-3xl font-mono text-primary/70 mb-8">
          {subjects.title}
        </h1>

        <div className="w-full grid gap-4">
          <h2 className="text-xl font-mono text-gray-400 mb-4">
            Select Subject
          </h2>

          <div className="grid gap-3">
            {subjects.subjects.length > 0 ? (
              subjects.subjects.map((subject, index) => (
                <Link
                  key={index}
                  href={`/subject/${subject.id}`}
                  className="hover:bg-muted-foreground/5 hover:border-gray-700 cursor-pointer p-4 border border-input bg-background shadow-xs"
                >
                  <div className="font-mono text-lg text-gray-200">
                    {subject.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {subject.chaptersCount} Chapters, {subject.questionsCount}{" "}
                    Questions
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No subjects found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SubjectLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">
        Loading subjects <LoadingDots />
      </p>
    </div>
  );
}
