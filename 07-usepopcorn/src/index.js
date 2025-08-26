import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import StarRating from "./StartRating";
function Test() {
  const [r, setR] = useState(0);
  console.log(r);
  return (
    <StarRating
      maxRating={6}
      defaultRating={4}
      messages={["a", "b", "c", "d", "e"]}
      color="blue"
      size={100}
      onSetRating={setR}
    />
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>{/* <App /> */ <Test />}</React.StrictMode>);
