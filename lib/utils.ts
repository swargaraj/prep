import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QuestionItem, QuestionType } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOptionCorrect(
  question: QuestionItem,
  selected: string | null
): boolean {
  if (selected === null) return false;
  return question.options.some((opt) => opt.text === selected && opt.isCorrect);
}

export const formatQuestionType = (type: QuestionType) => {
  return type
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};
