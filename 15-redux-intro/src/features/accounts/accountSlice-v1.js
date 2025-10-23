// notice this code is just js (not redux things)
// all of redux is inside the store.js

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
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
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

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
    case "account/currencyConvert":
      return { ...state, isLoading: true };
    // * No error and also no state update
    default:
      return state;
  }
}

// Action creators account
function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // * returing the function into dispatch only works if you download the middleware
  return async function (dispatch, getState) {
    dispatch({ type: "account/currencyConvert" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;

    // look at that :) (john. create new object)
    dispatch(deposit(convertedAmount, "USD"));
  };
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
