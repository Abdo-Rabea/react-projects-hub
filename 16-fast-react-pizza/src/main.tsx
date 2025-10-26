import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * what i have learned
 * 1. introducing ts for the first time in a project
 * 2. how to make profissional file structure (based on features)
 */

/**
 * Tech stack
 * 1. react with typescript
 * 2. React Router: the standard for react spa
 * 3. tailwindcss: for styling
 * 4. React Router: for Remote State management
 * 5. Redux: for UI State management
 */
