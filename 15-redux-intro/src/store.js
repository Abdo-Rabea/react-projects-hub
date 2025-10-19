import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

/**
 * just like use reducer:
 *  1. you will write only pure function
 *  2. reducer are not allowed to modify state
 *  3. reducer are not allowed to do any async. logic or other side effect
 *
 */

function AccountReducer(state = initialStateAccount, action) {
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

function CustomerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

const root = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer,
});

const store = createStore(root);

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

// Action creators customer

//* think of how dispatch this action -> don't bother yourself with this thing function creator
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(800));
store.dispatch(requestLoan(300, "by a car"));
store.dispatch(payLoan());

store.dispatch(createCustomer("abdo", "2131231"));
store.dispatch(updateName("Ahmed"));

console.log(store.getState());
