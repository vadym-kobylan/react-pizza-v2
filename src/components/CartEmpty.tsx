import { Link } from 'react-router-dom';

import emptyCart from '../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>Cart is empty 😕</h2>
      <p>
        You probably haven't add a pizza yet.
        <br />
        To add pizza, go to the home page.
      </p>
      <img src={emptyCart} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};
