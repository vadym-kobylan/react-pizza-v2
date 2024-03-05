import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem, cartSliceState } from './types';
import { calcTotalPrice } from '../../utils/calcTotalPrice';



const initialState: cartSliceState = getCartFromLS();

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
      state.totalPrice = calcTotalPrice(state.items);
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

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(state, action: PayloadAction<{ id: string; size: number; type: string }>) {
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size,
      );
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});


export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
