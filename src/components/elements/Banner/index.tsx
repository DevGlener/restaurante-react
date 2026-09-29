import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ContainerBanner } from './style';

import type { restaurantes as Restaurante } from '../../../types/restaurantes';

function Banner() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  const { id } = useParams();

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((res) => setRestaurantes(res));
  }, []);

  if (restaurantes.length === 0) {
    return <h3>Carregando...</h3>;
  }

  const restaurante = restaurantes.find((item) => item.id === Number(id));

  if (!restaurante) {
    return <h3>Restaurante não encontrado</h3>;
  }

  return (
    <ContainerBanner
      style={{
        backgroundImage: `url(${restaurante.capa})`,
      }}
    >
      <div className="container">
        <h5>{restaurante.tipo}</h5>

        <h4>{restaurante.titulo}</h4>
      </div>
    </ContainerBanner>
  );
}

export default Banner;
