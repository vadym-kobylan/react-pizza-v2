import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/slice';
import { SearchPizzaParams } from '../redux/pizza/types';

import { sortList } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaContentLoader from '../components/PizzaContentLoader';
import Pagination from '../components/Pagination/Pagination';
import PizzaEmpty from '../components/PizzaEmpty';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, searchValue, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortBy.replace('-', '');
    const order = sort.sortBy.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  // If there was a first rendering, we check URL-parameters and save it in redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => obj.sortBy === params.sortBy) || sortList[0];

      dispatch(
        setFilters({
          searchValue: params.search,
          currentPage: Number(params.currentPage),
          categoryId: Number(params.category),
          sort,
        }),
      );
      isSearch.current = true;
    }
    window.scrollTo(0, 0);
  }, []);

  // If parameters changed and there was a first render
  useEffect(() => {
    if (isMounted.current) {
      if (categoryId === 0 && currentPage === 1 && sort.sortBy === 'rating') {
        navigate(``);
      } else {
        const queryString = qs.stringify({
          sortBy: sort.sortBy,
          category: categoryId,
          currentPage,
        });
        navigate(`?${queryString}`);
      }
    }
    isMounted.current = true;
  }, [categoryId, sort.sortBy, currentPage]);

  // If there was a first rendering, then we fetch pizzas
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortBy, currentPage, searchValue]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...Array(4)].map((_el, i) => <PizzaContentLoader key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>

      {status === 'error' ? (
        <PizzaEmpty />
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination />
    </>
  );
};

export default Home;
