// notice this code is just js (not redux things)
// all of redux is inside the store.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // there will be an action creator function what will be called auto. for every reducer here
    // note that the user only need the // *action creator function so it is greate
    // the generated action creator will return an action with type: account/deposit then the deposit logic will be called with current state and the action that is returned from auto generated action creators
    deposit(state, action) {
      // don't return state here it is mutable for early return just return
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      // takes all of you custome data then return the payload
      prepare(amount, purpose) {
        // you can do many preparatino here : more on that later :)
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      // order here really mattars
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    currencyConvert(state, action) {
      state.isLoading = true;
    },
  },
});

// you want this for the store
export default accountSlice.reducer;
// you want this for the users
// drawback of these actions is that they are not custome anymore -> they only accept one arguement (payload) , then return action {actiontype, payload}
// 2 solutions: 1. pass only one object with all data you need
//              2. pass multiple value to the function but use prepare first
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// * using old way of thunk with RTK
// there is a way of tlk of doing async. operation but johnas defer it to the next course.
// but remember that the outer user will need only the action creator to dispatch and tlk and redux+middleware are compatible
// * my custome action creator (classic way redux+middleware)
export function deposit(amount, currency) {
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
