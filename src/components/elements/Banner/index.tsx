import { useParams } from 'react-router-dom';

import { useGetEfoodQuery } from '../../../services/api';

import { ContainerBanner } from './style';

function Banner() {
  const { id } = useParams();

  const { data: opcoes } = useGetEfoodQuery();

  if (!opcoes) {
    return <h3>Carregando...</h3>;
  }

  const restauranteList = opcoes.find((item) => item.id === Number(id));

  if (!restauranteList) {
    return <h3>Restaurante não encontrado</h3>;
  }

  return (
    <ContainerBanner
      style={{
        backgroundImage: `url(${restauranteList.capa})`,
      }}
    >
      <div className="container">
        <h5>{restauranteList.tipo}</h5>
        <h4>{restauranteList.titulo}</h4>
      </div>
    </ContainerBanner>
  );
}

export default Banner;
