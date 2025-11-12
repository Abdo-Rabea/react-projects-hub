import { createSlice } from "@reduxjs/toolkit";
import type { pizzaItem } from "../../types/pizzaItem";
import type { RootState } from "../../store";

const initialState: { cart: pizzaItem[] } = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 2,
  //     name: "Mediterranean",
  //     unitPrice: 12,
  //     quantity: 2,
  //     totalPrice: 24,
  //   },
  // ],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload: pizzaID
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload: pizzaID
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item !== undefined) {
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decreaseItemQuantity(state, action) {
      // payload: pizzaID
      // todo: may be deleted
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item !== undefined) {
        item.quantity--;
        item.totalPrice = item.unitPrice * item.quantity;
        // if (item.quantity === 0) this.deleteItem(item.pizzaId);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// selector functions
export const selectCartTotalQuantity = (store: RootState) =>
  store.cart.cart.reduce((acc, item) => item.quantity + acc, 0);

export const selectCartTotalPrice = (store: RootState) =>
  store.cart.cart.reduce((acc, item) => item.totalPrice + acc, 0);
