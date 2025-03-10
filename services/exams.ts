import client from "@/lib/client";
import { ExamItem, ExamSubjectItem } from "@/lib/types";

export const getExams = async () => {
  const response = await client.get("/v3/dashboard/platform/web");
  const data = response.data.data;

  const examComponent = data.items.find(
    (item: any) => item.componentTitle === "ChapterwiseExams"
  );

  const exams: ExamItem[] = examComponent.items.map((item: any) => ({
    title: item.title,
    examId: item.examId,
  }));

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

  return subjects;
};
