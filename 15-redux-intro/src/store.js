import { type } from "@testing-library/user-event/dist/type";
import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

/**
 * just like use reducer:
 *  1. you will write only pure function
 *  2. reducer are not allowed to modify state
 *  3. reducer are not allowed to do any async. logic or other side effect
 *
 */

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      // if (action.payload >= state.balance) return { ...state, balance: 0 };
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan": // todo: can i dispatch withdraw action here (yes you can)
      //! can go negative
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    // * No error and also no state update
    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({ type: "account/withdraw", payload: 800 });
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 300, purpose: "by a car" },
});
store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
