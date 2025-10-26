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
 * 3. learn how to make AppLayout (don't have routes): this is the fixed part that is always visible and its children are rendered based in Outlet when its path match the url -> paths can really be anything
 */

/**
 * Tech stack
 * 1. react with typescript
 * 2. React Router: the standard for react spa
 * 3. tailwindcss: for styling
 * 4. React Router: for Remote State management
 * 5. Redux: for UI State management
 */
