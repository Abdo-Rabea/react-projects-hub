import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  console.log("helllo");
  return <h1>Hello world</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log(root);
