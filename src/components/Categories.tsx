import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Categories = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={index === categoryId ? 'active' : ''}
            key={index + categorie}>
            {categorie}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
