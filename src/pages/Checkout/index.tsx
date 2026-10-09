import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootReducer } from '../../store';
import { setEtapa } from '../../store/reducers/carrinho';

import { CheckoutContainer, InputGroup, Row } from './style';

function Checkout() {
  const dispatch = useDispatch();
  const { total } = useSelector((state: RootReducer) => state.carrinho);
  const [showCard, setShowCard] = useState<'mostrar' | 'naoMostrar'>('mostrar');

  return (
    <CheckoutContainer>
      <form>
        {showCard === 'mostrar' ? (
          <div>
            <h2 className="tiltles">Entrega</h2>
            <Row>
              <InputGroup>
                <label htmlFor="name">Quem irá receber</label>
                <input id="name" type="text" />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup>
                <label htmlFor="address">Endereço</label>
                <input id="address" type="text" />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup>
                <label htmlFor="city">Cidade</label>
                <input id="city" type="text" />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup maxWidth="154px">
                <label htmlFor="postalcode">CEP</label>
                <input id="postalcode" type="text" />
              </InputGroup>
              <InputGroup maxWidth="154px">
                <label htmlFor="numberaddress">Número</label>
                <input id="numberaddress" type="text" />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup>
                <label htmlFor="complement">Complemento (Opcional)</label>
                <input id="complement" type="text" />
              </InputGroup>
            </Row>

            <div className="butons">
              <button type="button" onClick={() => setShowCard('naoMostrar')}>
                Continuar com o pagamento
              </button>
              <button type="button" onClick={() => dispatch(setEtapa('carrinho'))}>
                Voltar para o carrinho
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="tiltles">Pagamento - Valor a pagar R$ {total.toFixed(2)}</h2>
            <Row>
              <InputGroup>
                <label htmlFor="nameOnCard">Nome do Cartão</label>
                <input id="nameOnCard" type="text" />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup maxWidth="228px">
                <label htmlFor="cardNumber">Número do Cartão</label>
                <input id="cardNumber" type="text" />
              </InputGroup>
              <InputGroup maxWidth="88px">
                <label htmlFor="cardCode">CVV</label>
                <input id="cardCode" type="text" />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup maxWidth="154px">
                <label htmlFor="expiresMonth">Mês de Vencimento</label>
                <input id="expiresMonth" type="text" />
              </InputGroup>
              <InputGroup maxWidth="154px">
                <label htmlFor="expiresYear">Ano de Vencimento</label>
                <input id="expiresYear" type="text" />
              </InputGroup>
            </Row>

            <div className="butons">
              <button type="button">Finalizar Pagamento</button>
              <button type="button" onClick={() => setShowCard('mostrar')}>
                Voltar para Edição de Endereço
              </button>
            </div>
          </div>
        )}
      </form>
    </CheckoutContainer>
  );
}

export default Checkout;
