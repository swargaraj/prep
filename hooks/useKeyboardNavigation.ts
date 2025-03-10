import { useState, useEffect, useCallback, useRef } from "react";

interface UseKeyboardNavigationProps {
  questionState: any;
  questionsData: any;
  questionList: any;
  currentIndex: number;
  handlePrev: () => void;
  handleNext: () => void;
  dispatch: (action: any) => void;
}

export function useKeyboardNavigation(props: UseKeyboardNavigationProps) {
  const {
    questionState,
    questionsData,
    questionList,
    currentIndex,
    handlePrev,
    handleNext,
    dispatch,
  } = props;

  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(0);
  const [keyboardNavigationActive, setKeyboardNavigationActive] =
    useState(false);

  // Refs for state values
  const keyboardNavigationActiveRef = useRef(keyboardNavigationActive);
  const highlightedOptionIndexRef = useRef(highlightedOptionIndex);

  useEffect(() => {
    keyboardNavigationActiveRef.current = keyboardNavigationActive;
  }, [keyboardNavigationActive]);

  useEffect(() => {
    highlightedOptionIndexRef.current = highlightedOptionIndex;
  }, [highlightedOptionIndex]);

  // Reset highlighted option when the question changes
  useEffect(() => {
    setHighlightedOptionIndex(0);
  }, [questionState.currentQuestionIndex]);

  // Handler for selecting an option
  const handleSelectOption = useCallback(
    (optionText: string) => {
      const currentQuestion = questionsData[questionList[currentIndex]?.id];
      if (!currentQuestion) return;
      if (
        questionState.selectedOptions[questionState.currentQuestionIndex] !==
        null
      )
        return;
      dispatch({ type: "selectOption", payload: { option: optionText } });
    },
    [questionState, questionsData, questionList, currentIndex, dispatch]
  );

  // Create refs for props to avoid stale closures in the event listener
  const questionStateRef = useRef(questionState);
  const questionsDataRef = useRef(questionsData);
  const questionListRef = useRef(questionList);
  const currentIndexRef = useRef(currentIndex);
  const handlePrevRef = useRef(handlePrev);
  const handleNextRef = useRef(handleNext);
  const handleSelectOptionRef = useRef(handleSelectOption);

  // Update refs when props change
  useEffect(() => {
    questionStateRef.current = questionState;
  }, [questionState]);

  useEffect(() => {
    questionsDataRef.current = questionsData;
  }, [questionsData]);

  useEffect(() => {
    questionListRef.current = questionList;
  }, [questionList]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    handlePrevRef.current = handlePrev;
  }, [handlePrev]);

  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  useEffect(() => {
    handleSelectOptionRef.current = handleSelectOption;
  }, [handleSelectOption]);

  // Set up the keydown event listener once
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("Key pressed:", event.key);
      const currentQuestion =
        questionsDataRef.current[
          questionListRef.current[currentIndexRef.current]?.id
        ];
      if (!currentQuestion) return;

      const isAnswered =
        questionStateRef.current.selectedOptions[
          questionStateRef.current.currentQuestionIndex
        ] !== null;

      if (!isAnswered) {
        if (event.key === "w" || event.key === "ArrowUp") {
          event.preventDefault();
          if (!keyboardNavigationActiveRef.current) {
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
          if (!keyboardNavigationActiveRef.current) {
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
          if (!keyboardNavigationActiveRef.current) {
            setKeyboardNavigationActive(true);
            setHighlightedOptionIndex(0);
            // Select the first option by default on first Enter press
            handleSelectOptionRef.current(currentQuestion.options[0].text);
            return;
          }
          handleSelectOptionRef.current(
            currentQuestion.options[highlightedOptionIndexRef.current].text
          );
          return;
        }
      }

      // Left/right navigation regardless of answer status
      if (event.key === "a" || event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevRef.current();
        return;
      }
      if (event.key === "d" || event.key === "ArrowRight") {
        event.preventDefault();
        handleNextRef.current();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  return { highlightedOptionIndex, keyboardNavigationActive };
}
