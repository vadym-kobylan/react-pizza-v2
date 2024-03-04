import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: string;
  }>();

  const { pizzaId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizzaById() {
      try {
        const { data } = await axios.get(
          `https://65c29367f7e6ea59682b8a87.mockapi.io/items/${pizzaId}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Such pizza was not found...');
        navigate('/');
      }
    }

    fetchPizzaById();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <h4>From ${pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
