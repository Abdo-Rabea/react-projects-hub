import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * What i have learned?
 *
 */

/**
 * Teck stack
 * 1. React router: SPA
 * 2. styled components: writing component-scoped css
 * 3. React Query: Remote state management
 * 4. context api: global ui state management
 * 5. react hook form: form management
 * 6. other tools: React icons - react hot toast - recharts - date-fns - supabase
 */
