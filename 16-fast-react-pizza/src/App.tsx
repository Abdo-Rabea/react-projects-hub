import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState<number>(2);

  useEffect(
    function () {
      console.log(count);
    },
    [count]
  );
  return <div></div>;
}

export default App;
