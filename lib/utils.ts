import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QuestionItem } from "@/lib/types";

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
