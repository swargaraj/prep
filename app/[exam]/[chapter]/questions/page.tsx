import Link from "next/link";
import { notFound } from "next/navigation";

export default function QuestionsPage() {
  return (
    <div className="min-h-screen md:pt-20 pt-8 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Link
          href={`/exams/`}
          className="text-gray-500 hover:text-gray-300 mb-8 inline-block"
        >
          ← Back to Chapters
        </Link>

        <h1 className="text-2xl md:text-3xl font-mono text-primary/70 mb-8">
          JEE Physics
        </h1>

        <div className="w-full grid gap-4">
          <h2 className="text-xl font-mono text-gray-400 mb-4">
            Question List
          </h2>

          <div className="grid gap-3">
            {questions.map((question) => (
              <Link
                key={question.id}
                href={`/exams/subjects/questions/${question.id}`}
                className="hover:bg-muted-foreground/5 hover:border-gray-700 cursor-pointer p-4 border border-input bg-background shadow-xs"
              >
                <div className="font-mono text-gray-400">
                  Question {question.id} of 50
                </div>
                <div className="text-gray-200 mt-2">{question.preview}</div>
              </Link>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button className="text-gray-500 hover:text-gray-300">
              ← Previous
            </button>
            <button className="text-gray-500 hover:text-gray-300">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const questions = [
  {
    id: "1",
    preview:
      "A particle moves in a straight line with constant acceleration...",
  },
  {
    id: "2",
    preview:
      "The wavelength of the first line of Lyman series for hydrogen atom is...",
  },
  {
    id: "3",
    preview:
      "A body is projected with velocity u at an angle θ with the horizontal...",
  },
  {
    id: "4",
    preview: "The electric field at a point due to a point charge varies as...",
  },
  {
    id: "5",
    preview:
      "The magnetic field at the center of a circular current-carrying loop...",
  },
  {
    id: "6",
    preview: "The energy of a photon of wavelength λ is...",
  },
  {
    id: "7",
    preview:
      "The de Broglie wavelength of an electron accelerated through a potential difference V is...",
  },
  {
    id: "8",
    preview: "In an expression a × 10^b...",
  },
];
