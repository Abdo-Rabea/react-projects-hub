import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * 1. practising memo, useCallback to memoize components
 * 2. use useEffect to update state if it relys on ohter states so that the updating logic is not spread over the code (but this will create another render)
 */
