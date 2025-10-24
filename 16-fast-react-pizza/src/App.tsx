import { useEffect, useState } from "react";
import Test from "./Test";

function App() {
  const [count, setCount] = useState<number>(2);

  useEffect(function () {
    console.log(count);
  }, []);
  return (
    <div>
      <Test>helo</Test>
    </div>
  );
}

export default App;
