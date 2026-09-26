import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type CartItem = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
};

export type ICartSlice = {
  items: CartItem[];
};

const initialState: ICartSlice = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART: (
      state,
      action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>
    ) => {
      const { quantity = 1, ...item } = action.payload;
      const existing = state.items.find(entry => entry.id === item.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
    },
    UPDATE_CART_QUANTITY: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(entry => entry.id === action.payload.id);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
    REMOVE_FROM_CART: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    CLEAR_CART: state => {
      state.items = [];
    }
  }
});

export const { ADD_TO_CART, UPDATE_CART_QUANTITY, REMOVE_FROM_CART, CLEAR_CART } =
  cartSlice.actions;

const EMPTY_CART: CartItem[] = [];

export const GET_CART_ITEMS = (state: RootState) => state.app.cart?.items ?? EMPTY_CART;

export const GET_CART_SUBTOTAL = (state: RootState) =>
  Math.round(
    (state.app.cart?.items.reduce((total, item) => total + item.price * item.quantity, 0) ?? 0) *
      100
  ) / 100;

// `cart` can be missing right after rehydrating state persisted before the cart existed (hardSet).
export const GET_CART_QUANTITY = (id: number) => (state: RootState) =>
  state.app.cart?.items.find(item => item.id === id)?.quantity ?? 0;

export const GET_CART_COUNT = (state: RootState) =>
  state.app.cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;
