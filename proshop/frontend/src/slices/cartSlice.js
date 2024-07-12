import { createSlice } from '@reduxjs/toolkit';

const localStorageCart = localStorage.getItem('cart');
const initialState = localStorageCart
  ? JSON.parse(localStorageCart)
  : { cartItems: {} };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItemQty = state.cartItems[item._id]?.qty || 0;
      state.cartItems[item._id] = {
        ...item,
        qty: existingItemQty + item.qty,
      };

      state.itemsPrice = Object.values(state.cartItems).reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      state.taxPrice = state.itemsPrice * 0.15;
      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;

      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateCartItemQty: (state, action) => {
      const { id, newQty } = action.payload;
      state.cartItems[id].qty = newQty;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      delete state.cartItems[id];
      console.log(state.cartItems.totalPrice);
    },
  },
});
export const selectCartItemsCount = (state) =>
  Object.values(state.cart.cartItems).reduce(
    (acc, cartItem) => acc + cartItem.qty,
    0
  );
export const selectCartItemsPrice = (state) =>
  Object.values(state.cart.cartItems).reduce(
    (acc, item) => acc + item.qty * item.price,
    0.0
  );
export const selectCartItems = (state) => state.cart.cartItems;
export const { addToCart, updateCartItemQty, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
