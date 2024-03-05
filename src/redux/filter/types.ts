export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type SortItem = {
  name: string;
  sortBy: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: SortItem;
}
