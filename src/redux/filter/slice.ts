import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterSliceState, SortPropertyEnum, SortItem } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'popular ↑',
    sortBy: SortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSortType, setSearchValue, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
