import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, sortBy, order, search, currentPage } = params;
  const res = await axios.get(
    `https://65c29367f7e6ea59682b8a87.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  return res.data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success || error
};

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
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = 'error';
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
