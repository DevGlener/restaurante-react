import { CartContainer, Overlay, Sidebar, CardCar, LixeiraImg, Precos, CartButton } from './style';
import Esfira from '../../../assets/images/esfira.png';
import Lixeira from '../../../assets/images/icone-lixeira.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { RootReducer } from '../../../store';
import { close } from '../../../store/reducers/carrinho';

function Cart() {
  const { isOpen } = useSelector((state: RootReducer) => state.carrinho);

  const dispatch = useDispatch();

  function fechaModalCarrinho() {
    dispatch(close());
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={fechaModalCarrinho} />
      <Sidebar>
        <CardCar>
          <img className="productImage" src={Esfira} alt="" />
          <div>
            <h3>Pizza Marguerita</h3>
            <p>R$ 60,90</p>
          </div>
          <LixeiraImg src={Lixeira} alt="" />
        </CardCar>
        <CardCar>
          <img className="productImage" src={Esfira} alt="" />
          <div>
            <h3>Pizza Marguerita</h3>
            <p>R$ 60,90</p>
          </div>
          <LixeiraImg src={Lixeira} alt="" />
        </CardCar>
        <CardCar>
          <img className="productImage" src={Esfira} alt="" />
          <div>
            <h3>Pizza Marguerita</h3>
            <p>R$ 60,90</p>
          </div>
          <LixeiraImg src={Lixeira} alt="" />
        </CardCar>
        <Precos>
          <h4>Valor Total </h4>
          <h4>R$182,70</h4>
        </Precos>
        <CartButton type="button"> Continuar com a entrega</CartButton>
      </Sidebar>
    </CartContainer>
  );
}
export default Cart;
