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
 */
