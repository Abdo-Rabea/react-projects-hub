import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import store from "./store";
import { deposit } from "./features/accounts/accountSlice";
import { createCustomer } from "./features/customers/customerSlice";

store.dispatch(deposit(500));
// store.dispatch(withdraw(800));
// store.dispatch(requestLoan(300, "by a car"));
// store.dispatch(payLoan());

store.dispatch(createCustomer("abdo", "2131231"));
// store.dispatch(updateName("Ahmed"));

console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * what i have learned
 * 1. how to write redux code alone (the classic way)
 * 2. creating different reducers with their action creators
 * 3. combine differnt reducor into root reducer
 * 4. testing them using simple dispatch
 * 5. use react-redux to connect redux with react so that i can provide the store to the component (something really similar to the context-api with reducer)
 */
