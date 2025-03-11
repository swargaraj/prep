"use server";

import client from "@/lib/client";
import { ChapterQuestionItem, QuestionItem } from "@/lib/types";

export const getChapterDetails = async (
  id: string,
  syllabusCategory: string = "asPerSyllabus"
) => {
  const response = await client.get(
    `/v3/cpyqb/chapters/${id}/details/dynamic?syllabusCategory=${syllabusCategory}`
  );

  return {
    title: response.data.data.chapterId.title,
    subject: response.data.data.cpyqbSubject.id,
    questions: response.data.data.questions.slice().reverse(),
  };
};

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
      questionType: question.questionType,
      yearsAppeared: question.yearsAppeared[0].title,
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
    correctValue: question.correctValue,
    solution: question.solution,
    answer: question.answer,
    yearsAppeared: question.previousYearPapers[0].title,
    numericalUpperLimit: question.numericalUpperLimit,
    numericalLowerLimit: question.numericalLowerLimit,
  };

  return questionData;
};
