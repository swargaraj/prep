export type ExamItem = {
  title: string;
  examId: string;
  icon: {
    light: string;
    dark: string;
  };
};

export interface ExamSubjectItem {
  id: string;
  title: string;
  chapters: string[];
  icon: string;
  questionsCount: number;
  chaptersCount: number;
}

export interface ChapterItem {
  id: string;
  title: string;
  importance: string;
  questions: string[];
  class: string;
  questionsCount: number;
  icon: string;
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
  yearsAppeared: {
    _id: string;
    title: string;
    heldOn: string;
  }[];
}

export interface QuestionItem {
  answer: string | null;
  id: string;
  title: string;
  image: string | null;
  previousYearPapers: { title: string }[];
  approximateTimeRequired: number;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    image: string | null;
  }[];
  correctValue: string | null;
  solution: { text: string; image: string | null };
  numericalUpperLimit: number | null;
  numericalLowerLimit: number | null;
}
