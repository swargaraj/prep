"use server";

import client from "@/lib/client";
import { ExamItem, ExamSubjectItem } from "@/lib/types";

export const getExams = async () => {
  const response = await client.get("/v1/cpyqb/chapter-wise");
  const data = response.data.data;

  const exams: ExamItem[] = data.flatMap((stream: any) =>
    stream.streams.flatMap((streamItem: any) =>
      streamItem.exams.map((exam: any) => ({
        title: exam.title,
        examId: exam._id,
        tagline:
          `${exam.keyPointsMeta[0]?.description} • ${exam.keyPointsMeta[2]?.description} Questions` ||
          "",
      }))
    )
  );

  return exams;
};

export const getExamSubjects = async (id: string) => {
  const response = await client.get(`/v2/cpyqb/exams/${id}/subjects`);

  const subjects: ExamSubjectItem[] = response.data.data.subjects.map(
    (subject: any) => ({
      id: subject._id,
      title: subject.title,
      chapters: subject.chapters,
      questionsCount: subject.questionsCount,
      chaptersCount: subject.chapters.length,
    })
  );

  return { title: response.data.data.title, subjects };
};
