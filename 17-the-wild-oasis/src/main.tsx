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
 * 1. create a responsive layout
 * 2. create buetifull sidebar with extending the styles of NavLink from react-router using styled-components
 * 3. using supabase: handle global remote state
 * 4. i am creating a fullstack application using react and supabase (wow)
 * 5. react-hook-form to handle form and form validation
 * 6. Learn react patterns
 *  1. render-props-pattern
 *  2. higher order component to enhance uneditable component
 *  3. compound component
 * react-render-props&HOC-patterns examples:https://codesandbox.io/p/devbox/react-render-props-starter-forked-t6ldmf?workspaceId=ws_3NBMZ7KK8AnpBAeUSmFiZZ
 * compound component example:
 * react-compound-components-pattern sandbox example: https://codesandbox.io/p/sandbox/react-compound-components-final-igzh7c
 * 7. building a highly reusable modal using react-compound-component
 *    - create the modal with react portal (portal is very usefull for elements that we want them to be above all other elements such as tooltips, modal and menus)
 *    - you are using portal to move the modal in the dom tree because the user of the modal can cut it when putting it in parent that is overflow: hidden , so to avoid confilcts with css pro
 *  - convert the normal modal into high reusable modal using compound component pattern
 *  - detecting outside click of the modal to close it (dealing with js capture and bubbling phases)
 */

/**
 * Teck stack
 * 1. React router: SPA
 * 2. styled components: writing component-scoped css
 * 3. React Query: Remote state management
 * 4. context api: global ui state management
 * 5. react hook form: form management
 * 6. other tools: React icons - react hot toast - recharts - date-fns - supabase
 * the ways of styling i have learned through out this course css modules - tailwind css - styled components
 */
