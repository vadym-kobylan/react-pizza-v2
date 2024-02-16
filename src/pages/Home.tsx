import { useState, useEffect, useContext, useRef } from 'react';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import { sortList } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaContentLoader from '../components/PizzaContentLoader';
import Pagination from '../components/Pagination/Pagination';
import PizzaEmpty from '../components/PizzaEmpty';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  const { searchValue } = useContext(SearchContext);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage,
      }),
    );
  };

  // If there was a first rendering, we check URL-parameters and save it in redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
    window.scrollTo(0, 0);
  }, []);

  // If parameters changed and there was a first render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // If there was a first rendering, then we fetch pizzas
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const sceletons = [...Array(4)].map((e, i) => <PizzaContentLoader key={i} />);

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
        <div className="content__items">{status === 'loading' ? sceletons : pizzas}</div>
      )}

      <Pagination />
    </>
  );
};

export default Home;
