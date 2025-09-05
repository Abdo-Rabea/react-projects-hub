function NextButton({ displayButton, dispatch, isLastQuestion }) {
  if (isLastQuestion)
    return (
      <>
        {displayButton && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finishQuiz" })}
          >
            Finish
          </button>
        )}
      </>
    );

  return (
    <>
      {displayButton && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
    </>
  );
}

export default NextButton;
