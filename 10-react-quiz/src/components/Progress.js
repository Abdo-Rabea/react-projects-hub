function Progress({ index, numQuestions, points, totalPoints, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="progress">
      <progress value={index + Number(hasAnswered)} max={numQuestions} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </div>
  );
}

export default Progress;
