import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface cartSliceState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: cartSliceState = {
  items: [],
  totalPrice: 0,
};

const refreshTotalPrice = (state: cartSliceState) => {
  return state.items.reduce((sum: number, obj: CartItem) => obj.price * obj.count + sum, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = refreshTotalPrice(state);
    },

    minusItem(state, action: PayloadAction<{ id: string; size: number; type: string }>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        --findItem.count;
      }

      state.totalPrice = refreshTotalPrice(state);
    },

    removeItem(state, action: PayloadAction<{ id: string; size: number; type: string }>) {
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size,
      );
      state.totalPrice = refreshTotalPrice(state);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
