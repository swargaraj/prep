import client from "@/lib/client";
import { ChapterItem } from "@/lib/types";

export const getChapters = async (
  id: string,
  syllabusCategory = "asPerSyllabus",
  offset = 0,
  limit = 30
) => {
  const response = await client.get(
    `/v3/cpyqb/subjects/${id}/chapters?syllabusCategory=${syllabusCategory}&offset=${offset}&limit=${limit}`
  );

  const chapters: ChapterItem[] = response.data.data.map((chapter: any) => ({
    id: chapter._id,
    title: chapter.title,
    importance: chapter.importance,
    questions: chapter.questions,
    class: chapter.class,
    questionsCount: chapter.questionsCount,
    icon: "https://web.getmarks.app/icons/exam/" + chapter.chapterId.icon,
  }));

  return chapters;
};
