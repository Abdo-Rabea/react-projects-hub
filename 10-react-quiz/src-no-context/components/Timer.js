import { useEffect } from "react";

function Timer({ dispatch, timeRemaining }) {
  const mints = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "tick" }), 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mints < 10 && "0"}
      {mints}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
