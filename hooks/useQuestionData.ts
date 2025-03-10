import { useReducer, useState, useEffect, useRef, useCallback } from "react";
import { getChapterQuestions, getQuestion } from "@/services/questions";
import { ChapterQuestionItem, QuestionItem } from "@/lib/types";
import { questionReducer, QuestionState } from "@/lib/reducer";
import { useDebounce } from "@/lib/debounce";

interface UseQuestionDataProps {
  chapter: string;
  questionId: string;
}

interface UseQuestionDataReturn {
  error: string | null;
  questionList: ChapterQuestionItem[];
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
  const [questionList, setQuestionList] = useState<ChapterQuestionItem[]>([]);
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
      if (questionsData[qItem.id] || loadingRequests.current[qItem.id]) return;
      loadingRequests.current[qItem.id] = true;
      try {
        const detailed = await getQuestion(qItem.id);
        setQuestionsData((prev) => ({ ...prev, [detailed.id]: detailed }));
      } catch (err) {
        console.error("Error loading question detail:", err);
        setError("Error loading question");
      } finally {
        loadingRequests.current[qItem.id] = false;
      }
    },
    [questionList, questionsData]
  );

  // Initial data fetching
  useEffect(() => {
    if (hasInitialized.current) return;
    let isMounted = true;
    async function init() {
      try {
        const [currentDetail, chapterQs] = await Promise.all([
          getQuestion(debouncedQuestionId),
          getChapterQuestions(chapter, 0, 50),
        ]);
        if (!isMounted) return;
        setQuestionsData((prev) => ({
          ...prev,
          [currentDetail.id]: currentDetail,
        }));
        setQuestionList(chapterQs);
        const idx = chapterQs.findIndex((q) => q.id === currentDetail.id);
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

  // Preload adjacent questions
  useEffect(() => {
    if (!questionList.length) return;
    const preloadIndices = [currentIndex - 2, currentIndex + 2];
    preloadIndices.forEach((i) => {
      if (i >= 0 && i < questionList.length) {
        const qId = questionList[i].id;
        if (!questionsData[qId] && !loadingRequests.current[qId]) {
          loadQuestionDetail(i);
        }
      }
    });
  }, [currentIndex, questionList, questionsData, loadQuestionDetail]);

  // Limit detailed questions to a window of 25 items
  useEffect(() => {
    if (!questionList.length) return;
    const windowSize = 25;
    const halfWindow = Math.floor(windowSize / 2);
    let start = currentIndex - halfWindow;
    let end = currentIndex + halfWindow;
    if (start < 0) {
      end = Math.min(end - start, questionList.length - 1);
      start = 0;
    } else if (end > questionList.length - 1) {
      start = Math.max(0, start - (end - (questionList.length - 1)));
      end = questionList.length - 1;
    }
    setQuestionsData((prev) => {
      const newData: { [id: string]: QuestionItem } = {};
      for (let i = start; i <= end; i++) {
        const qId = questionList[i].id;
        if (prev[qId]) newData[qId] = prev[qId];
      }
      return newData;
    });
  }, [currentIndex, questionList]);

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
