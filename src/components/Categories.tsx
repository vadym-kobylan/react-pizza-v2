import { useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

const Categories = () => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  const categoryId = useSelector((state: any) => state.filter.categoryId);
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
};

export default Categories;
