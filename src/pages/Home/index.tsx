import { useGetEfoodQuery } from '../../services/api';

import { getDescription } from '../../utils/textSlice';

import { ListCards, ButtonEdit } from './style';
import Footer from '../../components/ui/Footer';
import Header from '../../components/ui/Header';
import Card from '../../components/elements/Card';

function Home() {
  const { data: intensRestaurantes } = useGetEfoodQuery();

  if (!intensRestaurantes) {
    return <h3>carregando ...</h3>;
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
                  {getDescription(item.descricao, 280)}

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
