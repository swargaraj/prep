"use server";

import client from "@/lib/client";
import { ChapterQuestionItem, QuestionItem } from "@/lib/types";

export const getChapterQuestions = async (
  id: string,
  offset: number,
  limit: number
) => {
  const response = await client.get(
    `/v3/cpyqb/chapters/${id}/questions?offset=${offset}&limit=${limit}`
  );

  const questions: ChapterQuestionItem[] = response.data.data.map(
    (question: any) => ({
      id: question._id,
      title: question.title.text,
      image: question.title.image,
      questionType: question.questionType,
      yearsAppeared: question.yearsAppeared,
    })
  );

  return questions;
};

export const getQuestion = async (id: string) => {
  const response = await client.post(`/v2/questions/${id}`);

  const question = response.data.data;
  const questionData: QuestionItem = {
    id: question._id,
    title: question.question.text,
    image: question.question.image,
    options: question.options,
    approximateTimeRequired: question.approximateTimeRequired,
    previousYearPapers: question.previousYearPapers,
    correctValue: question.correctValue,
    solution: question.solution,
    answer: question.answer,
    numericalUpperLimit: question.numericalUpperLimit,
    numericalLowerLimit: question.numericalLowerLimit,
  };

  return questionData;
};

export const getQuestionsByIds = async (ids: string[]) => {
  const questions = await Promise.all(ids.map((id) => getQuestion(id)));
  return questions;
};
