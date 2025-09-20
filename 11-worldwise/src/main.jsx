import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * react routers to create spa
 * css modules
 * params (react-router)
 * searchQuery (react-router)
 * cities context api with all of its benefits
 */
