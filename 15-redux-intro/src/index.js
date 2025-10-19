import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * what i have learned
 * 1. how to write redux code alone (the classic way)
 */
