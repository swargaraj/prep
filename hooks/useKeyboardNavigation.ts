import { useState, useEffect, useCallback } from "react";

interface UseKeyboardNavigationProps {
  questionState: any;
  questionsData: any;
  questionList: any;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  dispatch: (action: any) => void;
}
export function useKeyboardNavigation({
  questionState,
  questionsData,
  questionList,
  currentIndex,
  handlePrev,
  handleNext,
  dispatch,
}: UseKeyboardNavigationProps) {
  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(0);
  const [keyboardNavigationActive, setKeyboardNavigationActive] =
    useState(false);

  useEffect(() => {
    setHighlightedOptionIndex(0);
  }, [questionState.currentQuestionIndex]);

  const handleSelectOption = useCallback(
    (optionText: string) => {
      const currentQuestion = questionsData[questionList[currentIndex]?.id];
      if (!currentQuestion) return;
      if (questionState.selectedOptions[questionState.currentQuestionIndex] !== null)
        return;
      dispatch({ type: "selectOption", payload: { option: optionText } });
    },
    [questionState, questionsData, questionList, currentIndex, dispatch]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentQuestion = questionsData[questionList[currentIndex]?.id];
      if (!currentQuestion) return;
      const isAnswered =
        questionState.selectedOptions[questionState.currentQuestionIndex] !== null;

      if (!isAnswered) {
        if (event.key === "w" || event.key === "ArrowUp") {
          event.preventDefault();
          if (!keyboardNavigationActive) {
            setKeyboardNavigationActive(true);
            setHighlightedOptionIndex(0);
            return;
          }
          setHighlightedOptionIndex((prev) =>
            prev > 0 ? prev - 1 : currentQuestion.options.length - 1
          );
          return;
        }
        if (event.key === "s" || event.key === "ArrowDown") {
          event.preventDefault();
          if (!keyboardNavigationActive) {
            setKeyboardNavigationActive(true);
            setHighlightedOptionIndex(0);
            return;
          }
          setHighlightedOptionIndex((prev) =>
            prev < currentQuestion.options.length - 1 ? prev + 1 : 0
          );
          return;
        }
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          if (!keyboardNavigationActive) {
            setKeyboardNavigationActive(true);
            setHighlightedOptionIndex(0);
            handleSelectOption(currentQuestion.options[0].text);
            return;
          }
          handleSelectOption(
            currentQuestion.options[highlightedOptionIndex].text
          );
          return;
        }
      }

      if (event.key === "a" || event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
        return;
      }
      if (event.key === "d" || event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    questionsData,
    questionList,
    currentIndex,
    questionState,
    keyboardNavigationActive,
    highlightedOptionIndex,
    handleNext,
    handlePrev,
    handleSelectOption,
  ]);

  return { highlightedOptionIndex, keyboardNavigationActive };
}
