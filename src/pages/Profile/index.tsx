import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import Banner from '../../components/elements/Banner';
import Footer from '../../components/ui/Footer';
import Header from '../../components/ui/Header';

// import Pizza from '../../assets/images/esfira.png';
import close from '../../assets/images/close.png';

import {
  ProfileContainer,
  ListCards,
  ButonEdit,
  CardEdit,
  Modal,
  ModalContainer,
  Fechar,
  ContentModal,
} from './style';

import type { restaurantes, itensCardapio } from '../../types/restaurantes';

function Profile() {
  const [restaurante, setRestaurante] = useState<restaurantes>();

  const { id } = useParams();

  const [abraModal, setAbraModal] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<itensCardapio>();

  function abrirModal(item: itensCardapio) {
    setItemSelecionado(item);
    setAbraModal(true);
  }

  function fechaModal() {
    setAbraModal(false);
  }

  useEffect(() => {
    fetch(`https://api-ebac.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setRestaurante(res));
  }, [id]);

  if (!restaurante) {
    return <h3>carregando ...</h3>;
  }

  function getDescription(description: string) {
    if (description.length > 120) {
      return description.slice(0, 122) + '...';
    }
    return description;
  }

  return (
    <ProfileContainer>
      <Header name={'Restaurantes'} quantity={0} text={' Produto(s) no Carrinho'} />
      <Banner country={'italiana'} name={'La Dolce Vita Trattoria'} />
      <div className="container">
        <ListCards>
          {restaurante.cardapio.map((item) => (
            <li key={item.id}>
              <CardEdit image={item.foto} title={item.nome}>
                {getDescription(item.descricao)}
                <ButonEdit onClick={() => abrirModal(item)} type="button">
                  Adicionar ao carrinho
                </ButonEdit>
              </CardEdit>
            </li>
          ))}
        </ListCards>
      </div>
      {abraModal && itemSelecionado && (
        <Modal>
          <ModalContainer className="container">
            <Fechar onClick={fechaModal} src={close} alt="icone de fechar " />
            <div>
              <img src={itemSelecionado.foto} alt="imagem da pizza" />
              <ContentModal>
                <h3>{itemSelecionado.nome}</h3>
                <h5>{itemSelecionado.descricao}</h5>
                <p>{itemSelecionado.porcao}</p>
                <button>
                  Adicionar ao Carrinho - R$ <span>${itemSelecionado.preco.toFixed(2)}</span>
                </button>
              </ContentModal>
            </div>
          </ModalContainer>
        </Modal>
      )}
      <Footer />
    </ProfileContainer>
  );
}
export default Profile;
