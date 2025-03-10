"use client";

import QuestionHeader from "./header";
import QuestionQuestion from "./question";
import QuestionOptions from "./options";
import QuestionNavigation from "./navigation";
import LoadingDots from "./dots";
import { useQuestionData } from "@/hooks/useQuestionData";

interface QuestionContainerProps {
  exam: string;
  chapter: string;
  question: string;
}

export default function QuestionContainer({
  exam,
  chapter,
  question: currentQuestionId,
}: QuestionContainerProps) {
  const {
    error,
    questionList,
    questionsData,
    loadingQuestion,
    currentIndex,
    questionState,
    dispatch,
    handleNext,
    handlePrev,
    handleSelectOption,
  } = useQuestionData({ chapter, questionId: currentQuestionId });

  const loadedQuestions = questionList
    .map((q) => questionsData[q])
    .filter((q): q is any => !!q);
  const currentDetailedQuestion = questionsData[questionList[currentIndex]];

  if (error) {
    return <div className="text-red-400 text-center">{error}</div>;
  }
  if (loadingQuestion || !currentDetailedQuestion) {
    return (
      <div className="text-center">
        Loading question <LoadingDots />
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[70%] mx-auto">
      <QuestionHeader
        title={currentDetailedQuestion.previousYearPapers[0].title}
        currentQuestionNumber={currentIndex + 1}
        totalQuestions={questionList.length}
      />
      <QuestionQuestion questionText={currentDetailedQuestion.title} />
      <QuestionOptions
        currentDetailedQuestion={currentDetailedQuestion}
        questionState={questionState}
        dispatch={dispatch}
        currentQuestionIndex={currentIndex}
        handleSelectOption={handleSelectOption}
        questionsData={questionsData}
        questionList={questionList}
        currentIndex={currentIndex}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <QuestionNavigation
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={loadingQuestion || currentIndex === 0}
        disableNext={
          loadingQuestion || currentIndex === questionList.length - 1
        }
      />
    </div>
  );
}
