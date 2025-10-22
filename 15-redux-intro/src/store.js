import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";

const root = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// * applyMiddleware will enable dispatch function to accept function that will execute the side effect and then dispatch action whenever you want
const store = createStore(root, applyMiddleware(thunk));

export default store;
