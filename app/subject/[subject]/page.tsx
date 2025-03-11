"use cache";

import type { Metadata } from "next";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getChapters } from "@/services/chapters";
import { ChapterPage, ChapterLoading } from "./chapters";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Loading • swrg.dev",
  };
}

async function fetchChapters(subjectId: string) {
  try {
    const data = await getChapters(subjectId);
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return null;
  }
}

async function ChapterClient({ subject }: { subject: string }) {
  const chapters = await fetchChapters(subject);

  if (!chapters) return notFound();

  return <ChapterPage chapters={chapters} />;
}

export default async function ChaptersPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return (
    <Suspense fallback={<ChapterLoading />}>
      <ChapterClient subject={subject} />
    </Suspense>
  );
}
