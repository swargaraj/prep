"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { getChapterQuestions, getChapterDetails } from "@/services/questions";
import { ChapterQuestionItem } from "@/lib/types";
import { notFound } from "next/navigation";
import LoadingDots from "@/components/layout/dots";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Button } from "@/components/ui/button";
import { formatQuestionType } from "@/lib/utils";

interface Props {
  params: Promise<{ chapter: string }>;
}

export default function QuestionsPage({ params }: Props) {
  const { chapter } = use(params);

  const [questions, setQuestions] = useState<ChapterQuestionItem[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [subjectId, setSubjectId] = useState("");
  const [subjectTitle, setSubjectTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 25;

  useEffect(() => {
    async function fetchChapterDetails() {
      try {
        const details = await getChapterDetails(chapter);
        setTotalQuestions(details.questions.length);
        document.title = `${details.title} • swrg.dev`;
        setSubjectId(details.subject);
        setSubjectTitle(details.title);
      } catch (error) {
        console.error("Error fetching chapter details:", error);
      }
    }
    fetchChapterDetails();
  }, [chapter, document.title]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const data = await getChapterQuestions(chapter, offset, limit);
        setQuestions((prev) => [...prev, ...data]);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [chapter, offset]);

  const handleNext = () => {
    if (questions.length < totalQuestions) {
      setOffset(offset + limit);
    }
  };

  const handlePrevious = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  if (!loading && questions.length === 0) return notFound();

  if (loading && questions.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading Questions <LoadingDots />
        </p>
      </div>
    );

  return (
    <div className="min-h-screen md:py-20 py-6 flex flex-col items-center justify-center p-4">
      <div className="md:w-[80%] w-[95%]">
        <Link
          href={`/subject/${subjectId}`}
          className="text-gray-500 hover:text-gray-300 mb-8 inline-block"
        >
          ← Back to Chapters
        </Link>

        <h1 className="text-2xl md:text-3xl font-mono text-primary/70 mb-8">
          {subjectTitle}
        </h1>

        <div className="w-full grid gap-4">
          <h2 className="text-xl font-mono text-gray-400 mb-4">
            Question List
          </h2>

          <div className="grid gap-3">
            {questions.map((question, index) => (
              <Link
                key={index}
                href={`/chapter/${chapter}/${question.id}`}
                className="hover:bg-muted-foreground/5 hover:border-gray-700 cursor-pointer p-4 border border-input bg-background shadow-xs"
              >
                <div className="font-mono text-gray-400">
                  Question {index + 1} of {questions.length}
                </div>
                <div className="text-gray-200 mt-2 overflow-hidden line-clamp-2">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex, rehypeRaw]}
                    components={{
                      img: ({ src, alt }) => (
                        <img src={src} alt={alt} className="my-2 w-96" />
                      ),
                    }}
                  >
                    {question.title.trim().replace(/(<br\s*\/?>)+$/, "")}
                  </ReactMarkdown>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {question.yearsAppeared} •{" "}
                  {formatQuestionType(question.questionType)}
                </div>
              </Link>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center pt-2 items-center">
              <p className="text-gray-500">
                Loading Question <LoadingDots />
              </p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              className="text-gray-500 hover:text-gray-300"
              disabled={offset === 0}
            >
              ← Previous
            </Button>
            <Button
              variant="ghost"
              onClick={handleNext}
              disabled={questions.length >= totalQuestions}
              className={`text-gray-500 hover:text-gray-300 ${
                questions.length >= totalQuestions
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
