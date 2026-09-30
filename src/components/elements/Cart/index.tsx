import { CartContainer, Overlay, Sidebar, CardCar, LixeiraImg, Precos, CartButton } from './style';
// import Esfira from '../../../assets/images/esfira.png';
import Lixeira from '../../../assets/images/icone-lixeira.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { RootReducer } from '../../../store';
import { close, remover } from '../../../store/reducers/carrinho';

function Cart() {
  const { isOpen, itens } = useSelector((state: RootReducer) => state.carrinho);

  const dispatch = useDispatch();

  function fechaModalCarrinho() {
    dispatch(close());
  }

  function removerPedido(id: number) {
    dispatch(remover(id));
  }

  const total = itens.reduce((acumulador, itemAtual) => {
    return acumulador + itemAtual.preco;
  }, 0);

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={fechaModalCarrinho} />
      <Sidebar>
        <div>
          {itens.map((item) => (
            <CardCar key={item.id}>
              <img className="productImage" src={item.foto} alt="" />
              <div>
                <h3>{item.nome}</h3>
                <p>{`R$ ${item.preco.toFixed(2)}`}</p>
              </div>
              <LixeiraImg
                onClick={() => removerPedido(item.id)}
                src={Lixeira}
                alt="icone de lixeira"
              />
            </CardCar>
          ))}
        </div>
        <Precos>
          <h4>Valor Total </h4>
          <h4>R$ {total.toFixed(2)}</h4>
        </Precos>
        <CartButton type="button"> Continuar com a entrega</CartButton>
      </Sidebar>
    </CartContainer>
  );
}
export default Cart;
