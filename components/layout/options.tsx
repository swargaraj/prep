import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import clsx from "clsx";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

interface QuestionOptionsProps {
  questionState: any;
  currentDetailedQuestion: any;
  handleSelectOption: (optionText: string) => void;
  questionsData: any;
  questionList: any;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  dispatch: (action: any) => void;
  currentQuestionIndex: number;
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({
  questionState,
  currentDetailedQuestion,
  handleSelectOption,
  questionsData,
  questionList,
  currentIndex,
  handlePrev,
  handleNext,
  dispatch,
}) => {
  const { highlightedOptionIndex, keyboardNavigationActive } =
    useKeyboardNavigation({
      questionState,
      questionsData,
      questionList,
      currentIndex,
      handlePrev,
      handleNext,
      dispatch,
    });

  return (
    <div className="grid grid-cols-1 gap-3 select-none mb-4">
      {currentDetailedQuestion.options.map(
        (
          option: {
            text: string | null | undefined;
            isCorrect: any;
            id: React.Key | null | undefined;
          },
          idx: number
        ) => {
          const optionSelected =
            questionState.selectedOptions[
              questionState.currentQuestionIndex
            ] === option.text;
          const isAnswerCorrect = option.isCorrect;
          const buttonClasses = clsx("justify-start h-auto py-3 px-4 border", {
            "bg-green-900/20 border-green-700 text-green-400":
              optionSelected && isAnswerCorrect,
            "bg-red-900/20 border-red-700 text-red-400":
              optionSelected && !isAnswerCorrect,
            "border-green-500":
              questionState.selectedOptions[
                questionState.currentQuestionIndex
              ] !== null &&
              !optionSelected &&
              isAnswerCorrect,
            "hover:bg-muted-foreground/5 hover:border-gray-700 cursor-pointer":
              questionState.selectedOptions[
                questionState.currentQuestionIndex
              ] === null,
            "ring ring-neutral-500":
              keyboardNavigationActive &&
              questionState.selectedOptions[
                questionState.currentQuestionIndex
              ] === null &&
              highlightedOptionIndex === idx,
          });

          return (
            <Button
              key={option.id}
              variant="outline"
              className={buttonClasses}
              onClick={() => handleSelectOption(option.text ?? "")}
              disabled={
                questionState.selectedOptions[
                  questionState.currentQuestionIndex
                ] !== null && !isAnswerCorrect
              }
              aria-label={`Option ${String.fromCharCode(65 + idx)}: ${
                option.text
              }`}
            >
              <span className="mr-3 text-gray-500">
                {String.fromCharCode(65 + idx)}
              </span>
              <span>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                >
                  {option.text}
                </ReactMarkdown>
              </span>
              {optionSelected &&
                (isAnswerCorrect ? (
                  <Check className="ml-auto h-4 w-4 text-green-500" />
                ) : (
                  <X className="ml-auto h-4 w-4 text-red-500" />
                ))}
              {!optionSelected &&
                questionState.selectedOptions[
                  questionState.currentQuestionIndex
                ] !== null &&
                isAnswerCorrect && (
                  <Check className="ml-auto h-4 w-4 text-green-500" />
                )}
            </Button>
          );
        }
      )}
    </div>
  );
};

export default QuestionOptions;
