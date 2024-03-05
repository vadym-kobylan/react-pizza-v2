import React from 'react';
import { useSelector } from 'react-redux';
import { setCategoryId } from '../redux/filter/slice';
import { RootState, useAppDispatch } from '../redux/store';

const Categories = React.memo(() => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const dispatch = useAppDispatch();

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={index === categoryId ? 'active' : ''}
            key={index + category}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
