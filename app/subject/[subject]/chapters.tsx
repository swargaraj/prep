"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ChapterItem } from "@/lib/types";
import LoadingDots from "@/components/layout/dots";

interface Props {
  chapters: {
    title: string;
    exam: string;
    chapters: ChapterItem[];
  };
}

export function ChapterPage({ chapters }: Props) {
  useEffect(() => {
    document.title = `${chapters.title} • swrg.dev`;
  }, [chapters.title]);

  return (
    <div className="min-h-screen md:py-20 py-6 flex flex-col items-center justify-center p-4">
      <div className="md:w-[80%] w-[95%]">
        <Link
          href={`/exam/${chapters.exam}`}
          className="text-gray-500 hover:text-gray-300 mb-8 inline-block"
        >
          ← Back to Subjects
        </Link>

        <h1 className="text-2xl md:text-3xl font-mono text-primary/70 mb-8">
          {chapters.title}
        </h1>

        <div className="w-full grid gap-4">
          <h2 className="text-xl font-mono text-gray-400 mb-4">
            Select Chapter
          </h2>

          <div className="grid gap-3">
            {chapters.chapters.length > 0 ? (
              chapters.chapters.map((chapter, index) => (
                <Link
                  key={index}
                  href={`/chapter/${chapter.id}`}
                  className="hover:bg-muted-foreground/5 hover:border-gray-700 cursor-pointer p-4 border border-input bg-background shadow-xs"
                >
                  <div className="font-mono text-lg text-gray-200">
                    {chapter.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {chapter.importance ? `${chapter.importance}, ` : ""}
                    {chapter.questionsCount} Questions
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No chapters found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChapterLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">
        Loading chapters <LoadingDots />
      </p>
    </div>
  );
}
