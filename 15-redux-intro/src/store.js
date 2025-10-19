import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const root = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(root);

export default store;
