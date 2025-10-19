// notice this code is just js (not redux things)
// all of redux is inside the store.js

const initialStateAccount = {
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
export default function accountReducer(state = initialStateAccount, action) {
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

// Action creators account
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

export { deposit, withdraw, requestLoan, payLoan };
