import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();
const SECONDS_PER_QUESTIONS = 30;

const initialState = {
  questions: [],
  // loading, ready, error, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SECONDS_PER_QUESTIONS,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const correctAnswer = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: state.points + (correctAnswer ? question.points : 0),
      };
    case "nextQuestion":
      const canIncrease = state.index < state.questions.length - 1;
      return {
        ...state,
        answer: canIncrease ? null : state.answer,
        index: canIncrease ? state.index + 1 : state.index,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finish",
        highScore: Math.max(state.highScore, state.points),
      };
    case "restartQuiz":
      return { ...state, status: "ready", index: 0, answer: null, points: 0 };
    case "tick":
      const isFinished = state.timeRemaining - 1 <= 0;
      if (isFinished)
        return {
          ...state,
          status: "finish",
          highScore: Math.max(state.highScore, state.points),
        };
      return { ...state, timeRemaining: state.timeRemaining - 1 };
    default:
      throw new Error("Action Unkown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        timeRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("the quiz context was used outside its provider");
  return context;
}

export { QuizProvider, useQuiz };
