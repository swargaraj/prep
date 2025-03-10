interface QuestionHeaderProps {
  title: string;
  currentQuestionNumber: number;
  totalQuestions: number;
}

export default function QuestionHeader({
  title,
  currentQuestionNumber,
  totalQuestions,
}: QuestionHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex text-sm text-gray-500 mb-4 select-none">
        <span>
          {title} • Question {currentQuestionNumber} of {totalQuestions}
        </span>
      </div>
    </div>
  );
}
