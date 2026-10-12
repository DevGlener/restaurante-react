import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootReducer } from '../../store';
import { setEtapa } from '../../store/reducers/carrinho';

import { CheckoutContainer, InputGroup, Row } from './style';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Checkout() {
  const dispatch = useDispatch();
  const { total } = useSelector((state: RootReducer) => state.carrinho);
  const [showCard, setShowCard] = useState<'mostrar' | 'naoMostrar'>('mostrar');

  const form = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      postalCode: '',
      numberAddress: '',
      complement: '',
      nameOnCard: '',
      cardNumber: '',
      cardCode: '',
      expiresMonth: '',
      expiresYear: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'O campo deve ter pelo menos 5 caracteres')
        .required('Este campo é obrigatório'),
      address: Yup.string()
        .min(5, 'O campo deve ter pelo menos 5 caracteres')
        .required('Este campo é obrigatório'),
      city: Yup.string()
        .min(5, 'O campo deve ter pelo menos 5 caracteres')
        .required('Este campo é obrigatório'),
      postalCode: Yup.string()
        .min(8, 'O campo deve ter pelo menos 1 caracteres')
        .max(8, 'O campo de ter 8 caracteres')
        .required('Este campo é obrigatório'),
      numberAddress: Yup.string()
        .min(2, 'O campo deve ter pelo menos 2 caracteres')
        .required('Este campo é obrigatório'),
      complement: Yup.string()
        .min(5, 'O campo deve ter pelo menos 5 caracteres')
        .required('Este campo é obrigatório'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const getErrorMessage = (fieldName: string, message?: string) => {
    const estaMexido = fieldName in form.touched;
    const estaInvalido = fieldName in form.errors;

    if (estaMexido && estaInvalido) return message;
    return ' ';
  };

  // console.log(form);

  return (
    <CheckoutContainer>
      <form onSubmit={form.handleSubmit}>
        {showCard === 'mostrar' ? (
          <div>
            <h2 className="tiltles">Entrega</h2>
            <Row>
              <InputGroup>
                <label htmlFor="name">Quem irá receber</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.values.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('name', form.errors.name)}</small>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup>
                <label htmlFor="address">Endereço</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={form.values.address}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('address', form.errors.address)}</small>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup>
                <label htmlFor="city">Cidade</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={form.values.city}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('city', form.errors.city)}</small>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup maxWidth="154px">
                <label htmlFor="postalCode">CEP</label>
                <input
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  value={form.values.postalCode}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('postalCode', form.errors.postalCode)}</small>
              </InputGroup>
              <InputGroup maxWidth="154px">
                <label htmlFor="numberAddress">Número</label>
                <input
                  id="numberAddress"
                  type="text"
                  name="numberAddress"
                  value={form.values.numberAddress}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('numberAddress', form.errors.numberAddress)}</small>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup>
                <label htmlFor="complement">Complemento (Opcional)</label>
                <input
                  id="complement"
                  type="text"
                  name="complement"
                  value={form.values.complement}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('complement', form.errors.complement)}</small>
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
                <input
                  id="nameOnCard"
                  type="text"
                  name="nameOnCard"
                  value={form.values.nameOnCard}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('nameOnCard', form.errors.nameOnCard)}</small>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup maxWidth="228px">
                <label htmlFor="cardNumber">Número do Cartão</label>
                <input
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  value={form.values.cardNumber}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('cardNumber', form.errors.cardNumber)}</small>
              </InputGroup>
              <InputGroup maxWidth="88px">
                <label htmlFor="cardCode">CVV</label>
                <input
                  id="cardCode"
                  type="text"
                  name="cardCode"
                  value={form.values.cardCode}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('cardCode', form.errors.cardCode)}</small>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup maxWidth="154px">
                <label htmlFor="expiresMonth">Mês de Vencimento</label>
                <input
                  id="expiresMonth"
                  type="text"
                  name="expiresMonth"
                  value={form.values.expiresMonth}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('expiresMonth', form.errors.expiresMonth)}</small>
              </InputGroup>
              <InputGroup maxWidth="154px">
                <label htmlFor="expiresYear">Ano de Vencimento</label>
                <input
                  id="expiresYear"
                  type="text"
                  name="expiresYear"
                  value={form.values.expiresYear}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('expiresYear', form.errors.expiresYear)}</small>
              </InputGroup>
            </Row>

            <div className="butons">
              <button type="submit">Finalizar Pagamento</button>
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
