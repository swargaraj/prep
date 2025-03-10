// --- Question State Types & Reducer --- //

export interface QuestionState {
  currentQuestionIndex: number;
  selectedOptions: (string | null)[];
}

export type Action =
  | { type: "selectOption"; payload: { option: string } }
  | { type: "nextQuestion" }
  | { type: "prevQuestion" }
  | { type: "setCurrentQuestionIndex"; payload: { index: number } }
  | { type: "resetSelectedOptions"; payload: { length: number } };

export function questionReducer(state: QuestionState, action: Action): QuestionState {
  switch (action.type) {
    case "selectOption": {
      if (state.selectedOptions[state.currentQuestionIndex] !== null)
        return state;
      const updated = [...state.selectedOptions];
      updated[state.currentQuestionIndex] = action.payload.option;
      return { ...state, selectedOptions: updated };
    }
    case "nextQuestion":
      return state.currentQuestionIndex < state.selectedOptions.length - 1
        ? { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 }
        : state;
    case "prevQuestion":
      return state.currentQuestionIndex > 0
        ? { ...state, currentQuestionIndex: state.currentQuestionIndex - 1 }
        : state;
    case "setCurrentQuestionIndex":
      return { ...state, currentQuestionIndex: action.payload.index };
    case "resetSelectedOptions":
      return {
        ...state,
        selectedOptions: Array(action.payload.length).fill(null),
      };
    default:
      return state;
  }
}
