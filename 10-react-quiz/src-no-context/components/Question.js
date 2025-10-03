import Options from "./Options";

function Question({ question, answer, dispatch }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Question;
