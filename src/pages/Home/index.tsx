import { useEffect, useState } from 'react';

import { ListCards, ButtonEdit } from './style';
import Footer from '../../components/ui/Footer';
import Header from '../../components/ui/Header';
import Card from '../../components/elements/Card';

import type { restaurantes } from '../../types/restaurantes';

function Home() {
  const [intensRestaurantes, setItensRestaurantes] = useState<restaurantes[]>([]);

  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((res) => setItensRestaurantes(res));
  }, []);

  if (!intensRestaurantes) {
    return <h3>carregando ...</h3>;
  }

  function getDescription(description: string) {
    if (description.length > 280) {
      return description.slice(0, 250) + '...';
    }
    return description;
  }

  return (
    <>
      <Header />
      <div className="container">
        <ListCards>
          {intensRestaurantes.length <= 0 && 'Carregando ...'}
          {intensRestaurantes.length > 0 &&
            intensRestaurantes.map((item) => (
              <li key={item.id}>
                <Card
                  key={item.id}
                  title={item.titulo}
                  image={item.capa}
                  nota={item.avaliacao}
                  infos={[...(item.destacado ? ['Destaque do dia'] : []), item.tipo]}
                >
                  {getDescription(item.descricao)}

                  <ButtonEdit type={'link'} to={`/perfil/${item.id}`}>
                    Saiba mais
                  </ButtonEdit>
                </Card>
              </li>
            ))}
        </ListCards>
      </div>
      <Footer />
    </>
  );
}
export default Home;
