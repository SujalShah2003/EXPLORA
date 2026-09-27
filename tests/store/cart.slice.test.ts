import { describe, expect, it } from 'vitest';
import type { RootState } from '@/store';
import {
  ADD_TO_CART,
  CLEAR_CART,
  GET_CART_COUNT,
  GET_CART_ITEMS,
  GET_CART_QUANTITY,
  GET_CART_SUBTOTAL,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  cartSlice
} from '@/store/app/cart.slice.ts';

const reducer = cartSlice.reducer;
const rice = { id: 1, title: 'Rice', thumbnail: 'rice.webp', price: 5.43 };
const coffee = { id: 2, title: 'Coffee', thumbnail: 'coffee.webp', price: 7.99 };

const toRoot = (cart: ReturnType<typeof reducer>) => ({ app: { cart } }) as unknown as RootState;

describe('cart reducer', () => {
  it('starts empty', () => {
    expect(reducer(undefined, { type: 'init' })).toEqual({ items: [] });
  });

  it('adds a new item with quantity 1 by default', () => {
    const state = reducer(undefined, ADD_TO_CART(rice));
    expect(state.items).toEqual([{ ...rice, quantity: 1 }]);
  });

  it('adds the given quantity', () => {
    const state = reducer(undefined, ADD_TO_CART({ ...rice, quantity: 3 }));
    expect(state.items[0].quantity).toBe(3);
  });

  it('increases the quantity instead of duplicating an existing item', () => {
    let state = reducer(undefined, ADD_TO_CART(rice));
    state = reducer(state, ADD_TO_CART({ ...rice, quantity: 2 }));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it('updates a quantity but never below 1', () => {
    let state = reducer(undefined, ADD_TO_CART(rice));
    state = reducer(state, UPDATE_CART_QUANTITY({ id: rice.id, quantity: 5 }));
    expect(state.items[0].quantity).toBe(5);

    state = reducer(state, UPDATE_CART_QUANTITY({ id: rice.id, quantity: 0 }));
    expect(state.items[0].quantity).toBe(1);
  });

  it('ignores quantity updates for items not in the cart', () => {
    const state = reducer(undefined, UPDATE_CART_QUANTITY({ id: 999, quantity: 4 }));
    expect(state.items).toEqual([]);
  });

  it('removes a single item', () => {
    let state = reducer(undefined, ADD_TO_CART(rice));
    state = reducer(state, ADD_TO_CART(coffee));
    state = reducer(state, REMOVE_FROM_CART(rice.id));
    expect(state.items.map(item => item.id)).toEqual([coffee.id]);
  });

  it('clears everything', () => {
    let state = reducer(undefined, ADD_TO_CART(rice));
    state = reducer(state, ADD_TO_CART(coffee));
    state = reducer(state, CLEAR_CART());
    expect(state.items).toEqual([]);
  });
});

describe('cart selectors', () => {
  let cart = reducer(undefined, ADD_TO_CART({ ...rice, quantity: 3 }));
  cart = reducer(cart, ADD_TO_CART(coffee));
  const state = toRoot(cart);

  it('counts every unit across items', () => {
    expect(GET_CART_COUNT(state)).toBe(4);
  });

  it('sums price × quantity rounded to cents', () => {
    // 3 × 5.43 + 7.99 = 24.28
    expect(GET_CART_SUBTOTAL(state)).toBe(24.28);
  });

  it('returns the quantity of one product, or 0 if absent', () => {
    expect(GET_CART_QUANTITY(rice.id)(state)).toBe(3);
    expect(GET_CART_QUANTITY(999)(state)).toBe(0);
  });

  it('handles a state rehydrated without a cart', () => {
    const empty = { app: {} } as unknown as RootState;
    expect(GET_CART_ITEMS(empty)).toEqual([]);
    expect(GET_CART_COUNT(empty)).toBe(0);
    expect(GET_CART_SUBTOTAL(empty)).toBe(0);
  });
});
