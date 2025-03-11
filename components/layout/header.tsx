import Link from "next/link";

interface QuestionHeaderProps {
  title: string;
  chapter: string;
  currentQuestionNumber: number;
  totalQuestions: number;
}

export default function QuestionHeader({
  title,
  chapter,
  currentQuestionNumber,
  totalQuestions,
}: QuestionHeaderProps) {
  return (
    <div className="mb-4">
      <Link
        href={`/chapter/${chapter}`}
        className="text-gray-500 text-sm hover:text-gray-300 mb-8 inline-block"
      >
        ← Back to Questions
      </Link>
      <div className="flex text-sm text-gray-500 mb-4 select-none">
        <span>
          {title} • Question {currentQuestionNumber} of {totalQuestions}
        </span>
      </div>
    </div>
  );
}
