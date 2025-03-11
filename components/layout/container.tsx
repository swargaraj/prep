"use client";

import QuestionHeader from "./header";
import QuestionQuestion from "./question";
import QuestionOptions from "./options";
import QuestionNavigation from "./navigation";
import LoadingDots from "./dots";
import { useQuestionData } from "@/hooks/useQuestionData";

interface QuestionContainerProps {
  chapter: string;
  question: string;
}

export default function QuestionContainer({
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

  const currentDetailedQuestion = questionsData[questionList[currentIndex]];

  if (error) {
    return <div className="text-red-400 text-center">{error}</div>;
  }
  if (loadingQuestion || !currentDetailedQuestion) {
    return (
      <p className="text-gray-500">
        Loading Question <LoadingDots />
      </p>
    );
  }

  return (
    <div className="w-[90%] md:w-[70%] mx-auto">
      <QuestionHeader
        title={currentDetailedQuestion.yearsAppeared}
        chapter={chapter}
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
