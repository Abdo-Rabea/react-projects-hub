// all comes with redux toolkit

import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// so just grapping all of the boilerplate code and focusing on code that does something
// ! note: you have only changed the store (the slices are the same) that is because redux+middleware and redux-toolkit are compatible
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
