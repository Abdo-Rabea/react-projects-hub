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
 * searchQuery (react-router): changing them will cause the component to re-render
 * cities context api with all of its benefits
 * form add cities all functionalities (get data into for when clicking on the map, fetch the countries data from an api (name), filling the form using states, add the form using submit)
 * authentication mechanism (context + reducer (user, isAutheneticated) states + login - logout)
 * protected route to only access the app if user is authenticated
 * memoizing getCity using useCallback as it is used in the effect dependency and updating it will call the effect again (which in turn set some state) causing the provider to re-render so creating another getCity function causing the useEffect to call the effect function again
 * optimize the bundle size with code splitting using lazy function and suspense to provide a callback while loading
 */
