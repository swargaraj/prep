export type ExamItem = {
  title: string;
  examId: string;
  tagline: string;
};

export interface ExamSubjectItem {
  id: string;
  title: string;
  chapters: string[];
  questionsCount: number;
  chaptersCount: number;
}

export interface ChapterItem {
  id: string;
  title: string;
  importance: string;
  questionsCount: number;
}

export enum QuestionType {
  Numerical = "numerical",
  SingleCorrect = "singleCorrect",
  MultipleCorrect = "multipleCorrect",
}

export interface ChapterQuestionItem {
  id: string;
  title: string;
  image: string | null;
  questionType: QuestionType;
  yearsAppeared: string;
}

export interface QuestionItem {
  answer: string | null;
  id: string;
  title: string;
  image: string | null;
  approximateTimeRequired: number;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    image: string | null;
  }[];
  yearsAppeared: string;
  correctValue: string | null;
  solution: { text: string; image: string | null };
  numericalUpperLimit: number | null;
  numericalLowerLimit: number | null;
}
