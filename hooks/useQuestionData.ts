import { useReducer, useState, useEffect, useRef, useCallback } from "react";
import { getChapterDetails, getQuestion } from "@/services/questions";
import { QuestionItem } from "@/lib/types";
import { questionReducer, QuestionState } from "@/lib/reducer";
import { useDebounce } from "@/lib/debounce";

interface UseQuestionDataProps {
  chapter: string;
  questionId: string;
}

interface UseQuestionDataReturn {
  error: string | null;
  questionList: string[];
  questionsData: { [id: string]: QuestionItem };
  loadingQuestion: boolean;
  currentIndex: number;
  questionState: QuestionState;
  dispatch: React.Dispatch<any>;
  handleNext: () => Promise<void>;
  handlePrev: () => Promise<void>;
  handleSelectOption: (optionText: string) => void;
}

export function useQuestionData({
  chapter,
  questionId,
}: UseQuestionDataProps): UseQuestionDataReturn {
  const debouncedQuestionId = useDebounce(questionId, 200);
  const [error, setError] = useState<string | null>(null);
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [questionsData, setQuestionsData] = useState<{
    [id: string]: QuestionItem;
  }>({});
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questionState, dispatch] = useReducer(questionReducer, {
    currentQuestionIndex: 0,
    selectedOptions: [],
  });

  const loadingRequests = useRef<{ [id: string]: boolean }>({});
  const hasInitialized = useRef(false);

  const loadQuestionDetail = useCallback(
    async (index: number) => {
      const qItem = questionList[index];
      if (!qItem) return;
      if (loadingRequests.current[qItem]) return;

      loadingRequests.current[qItem] = true;
      try {
        const detailed = await getQuestion(qItem);
        setQuestionsData((prev) => {
          // Only update if not already loaded
          if (prev[detailed.id]) return prev;
          return { ...prev, [detailed.id]: detailed };
        });
      } catch (err) {
        console.error("Error loading question detail:", err);
        setError("Error loading question");
      } finally {
        loadingRequests.current[qItem] = false;
      }
    },
    [questionList]
  );

  // Initial data fetching
  useEffect(() => {
    if (hasInitialized.current) return;
    let isMounted = true;
    async function init() {
      try {
        const [currentDetail, chapterQs] = await Promise.all([
          getQuestion(debouncedQuestionId),
          getChapterDetails(chapter),
        ]);
        if (!isMounted) return;
        setQuestionsData((prev) => ({
          ...prev,
          [currentDetail.id]: currentDetail,
        }));
        setQuestionList(chapterQs);
        const idx = chapterQs.findIndex((q) => q === currentDetail.id);
        const newIndex = idx >= 0 ? idx : 0;
        setCurrentIndex(newIndex);
        dispatch({
          type: "setCurrentQuestionIndex",
          payload: { index: newIndex },
        });
        dispatch({
          type: "resetSelectedOptions",
          payload: { length: chapterQs.length },
        });
        hasInitialized.current = true;
      } catch (err) {
        console.error("Error initializing questions:", err);
        setError("Marks API Error Occurred");
      } finally {
        setLoadingQuestion(false);
      }
    }
    init();
    return () => {
      isMounted = false;
    };
  }, [debouncedQuestionId, chapter]);

  const handleNext = useCallback(async () => {
    if (loadingQuestion) return;
    if (currentIndex >= questionList.length - 1) return;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    dispatch({ type: "nextQuestion" });
    await loadQuestionDetail(newIndex);
  }, [currentIndex, questionList.length, loadingQuestion, loadQuestionDetail]);

  const handlePrev = useCallback(async () => {
    if (loadingQuestion) return;
    if (currentIndex <= 0) return;
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    dispatch({ type: "prevQuestion" });
    await loadQuestionDetail(newIndex);
  }, [currentIndex, loadingQuestion, loadQuestionDetail]);

  const handleSelectOption = (optionText: string) => {
    dispatch({
      type: "selectOption",
      payload: { option: optionText },
    });
  };

  useEffect(() => {
    if (!questionList.length) return;

    const preloadStart = Math.max(0, currentIndex - 3);
    const preloadEnd = Math.min(questionList.length - 1, currentIndex + 5);

    for (let i = preloadStart; i <= preloadEnd; i++) {
      const qId = questionList[i];
      if (!questionsData[qId] && !loadingRequests.current[qId]) {
        loadQuestionDetail(i);
      }
    }

    // Only update questionsData if necessary
    setQuestionsData((prev) => {
      const newData: { [id: string]: QuestionItem } = {};
      const start = Math.max(0, currentIndex - 25);
      const end = Math.min(questionList.length - 1, currentIndex + 25);

      for (let i = start; i <= end; i++) {
        const qId = questionList[i];
        if (prev[qId]) newData[qId] = prev[qId];
      }
      return newData;
    });
  }, [currentIndex, questionList, loadQuestionDetail]); // Removed questionsData here

  return {
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
  };
}
