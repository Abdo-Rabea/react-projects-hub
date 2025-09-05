function FinishScreen({ points, totalPoints, highScore, dispatch }) {
  const precent = Math.ceil((points / totalPoints) * 100);
  let emoji;
  if (precent >= 100) emoji = "🥇";
  else if (precent > 80) emoji = "🙃";
  else if (precent > 50) emoji = "🤔";
  else emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of
        <strong> {totalPoints}</strong> ({precent}
        %)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
