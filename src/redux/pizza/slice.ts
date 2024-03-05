import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PizzaItem, PizzaSliceState, SearchPizzaParams, Status } from './types';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: SearchPizzaParams) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get(
      `https://65c29367f7e6ea59682b8a87.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    return data as PizzaItem[];
  },
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    // setItems(state, action) {
    //   state.items = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

// export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
