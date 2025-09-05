function NextButton({ displayButton, dispatch }) {
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
