import client from "@/lib/client";
import { ChapterItem } from "@/lib/types";

export const getChapters = async (
  id: string,
  syllabusCategory = "asPerSyllabus",
  offset = 0,
  limit = 50
) => {
  const response = await client.get(
    `/v3/cpyqb/subjects/${id}/chapters?syllabusCategory=${syllabusCategory}&offset=${offset}&limit=${limit}`
  );

  const chapters: ChapterItem[] = response.data.data.map((chapter: any) => ({
    id: chapter._id,
    title: chapter.title,
    importance: chapter.importance,
    questionsCount: chapter.questionsCount,
  }));

  return {
    title: response.data.data[0].cpyqbSubject.title,
    exam: response.data.data[0].cpyqbExam.id,
    chapters,
  };
};
