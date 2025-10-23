import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

/**
 * what i have learned
 * 1. how to write redux code alone (the classic way)
 * 2. creating different reducers with their action creators
 * 3. combine differnt reducor into root reducer
 * 4. testing them using simple dispatch
 * 5. use react-redux to connect redux with react so that i can provide the store to the component (something really similar to the context-api with reducer)
 *  then you can consoume any piece of data inside the store using useSelector
 * 6. react-redux: to organize and optimize the consuming of data but dispatching actions comes with redux (wrong)
 * 7. you have access to the dispatch function using useDispatch hook from react-redux
 * 8.  using THUNK MIddleware for async. operations
 *    after user dispatch action it goes to the diddleware (not store yet), then all of the async. code is done the action goes to the reducer with the data that comes
 *  example: dispatch desposit action but after converting amount into usd dollars if the user dispatch another one
 * applyMiddleware will enable dispatch function to accept function that will execute the side effect and then dispatch action whenever you want const store = createStore(root, applyMiddleware(thunk));
 * now the component is clean without any async. call (all async. code in the central place for each feature)
 * using RTK : it is compatible with redux + middleware (wow), but you code will be written in RTK way...
 * all packages: redux, react-redux, redux-thunk, rtk
 */
