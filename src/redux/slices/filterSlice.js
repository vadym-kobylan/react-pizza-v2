import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'popular ↑',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;

export const { setCategoryId, setSortType, setSearchValue, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
