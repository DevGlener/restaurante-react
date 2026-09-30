import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { RootReducer } from '../../store';

import { adicionar, abrirModal, fecharModal } from '../../store/reducers/carrinho';
import { getDescription } from '../../utils/textSlice';
import { useGetCardapioQuery } from '../../services/api';

import Banner from '../../components/elements/Banner';
import Footer from '../../components/ui/Footer';
import Header from '../../components/ui/Header';

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

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: restaurante } = useGetCardapioQuery(id!);

  const { itens, modalEstaAberto, itemSelecionado } = useSelector(
    (state: RootReducer) => state.carrinho,
  );

  const adicionarAoCarrinho = () => {
    if (itemSelecionado) {
      dispatch(adicionar(itemSelecionado));
      dispatch(fecharModal());
    }
  };

  if (!restaurante) {
    return <h3>carregando ...</h3>;
  }

  return (
    <ProfileContainer>
      <Header name={'Restaurantes'} quantity={itens.length} text={' Produto(s) no Carrinho'} />
      <Banner />
      <div className="container">
        <ListCards>
          {restaurante.cardapio.map((item) => (
            <li key={item.id}>
              <CardEdit image={item.foto} title={item.nome}>
                {getDescription(item.descricao)}

                <ButonEdit onClick={() => dispatch(abrirModal(item))} type="button">
                  Mais detalhes
                </ButonEdit>
              </CardEdit>
            </li>
          ))}
        </ListCards>
      </div>

      {modalEstaAberto && itemSelecionado && (
        <Modal onClick={() => dispatch(fecharModal())}>
          <ModalContainer className="container" onClick={(e) => e.stopPropagation()}>
            <Fechar onClick={() => dispatch(fecharModal())} src={close} alt="icone de fechar" />
            <div>
              <img src={itemSelecionado.foto} alt={itemSelecionado.nome} />
              <ContentModal>
                <h3>{itemSelecionado.nome}</h3>
                <h5>{itemSelecionado.descricao}</h5>
                <p>{itemSelecionado.porcao}</p>

                <button type="button" onClick={adicionarAoCarrinho}>
                  Adicionar ao Carrinho - R$ <span>{itemSelecionado.preco.toFixed(2)}</span>
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
