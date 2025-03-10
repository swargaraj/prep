import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

interface QuestionProps {
  questionText: string;
}

export default function Question({ questionText }: QuestionProps) {
  return (
    <div className="md:text-lg text-md mb-6 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="my-2 w-96" />
          ),
        }}
      >
        {questionText.trim().replace(/(<br\s*\/?>)+$/, "")}
      </ReactMarkdown>
    </div>
  );
}
