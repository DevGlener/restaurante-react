import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { RootReducer } from '../../store'
import { usePurchaseMutation } from '../../services/api'
import { clear } from '../../store/reducers/carrinho'

import { CheckoutContainer, InputGroup, Row, OrdemConcluida } from './style'
import { Navigate } from 'react-router-dom'
import { setEtapa, close } from '../../store/reducers/carrinho'

function Checkout() {
  const dispatch = useDispatch()
  const { total } = useSelector((state: RootReducer) => state.carrinho)
  const [showCard, setShowCard] = useState<'mostrar' | 'naoMostrar'>('mostrar')
  const [purchase, { isSuccess, data }] = usePurchaseMutation()
  const { itens } = useSelector((state: RootReducer) => state.carrinho)

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
      expiresYear: ''
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
        .min(9, 'O campo deve ter pelo menos 1 caracteres')
        .max(9, 'O campo de ter 8 caracteres')
        .required('Este campo é obrigatório'),
      numberAddress: Yup.string()
        .min(2, 'O campo deve ter pelo menos 2 caracteres')
        .required('Este campo é obrigatório'),
      complement: Yup.string()
        .min(5, 'O campo deve ter pelo menos 5 caracteres')
        .required('Este campo é obrigatório'),
      nameOnCard: Yup.string().required('Este campo é obrigatório'),
      cardNumber: Yup.string().required('Este campo é obrigatório'),
      cardCode: Yup.string().required('Este campo é obrigatório'),
      expiresMonth: Yup.string().required('Este campo é obrigatório'),
      expiresYear: Yup.string().required('Este campo é obrigatório')
    }),
    onSubmit: (values) => {
      purchase({
        payment: {
          card: {
            name: values.nameOnCard,
            number: Number(values.cardNumber),
            code: Number(values.cardCode),
            expires: {
              month: Number(values.expiresMonth),
              year: Number(values.expiresYear)
            }
          }
        },
        delivery: {
          receiver: values.name,
          address: {
            city: values.city,
            complement: values.complement,
            number: Number(values.numberAddress),
            zipCode: Number(values.postalCode)
          }
        },
        products: itens.map((item) => ({
          id: item.id,
          price: item.preco
        }))
      })
    }
  })

  const checkInputHasError = (fieldName: string) => {
    const estaMexido = fieldName in form.touched
    const estaInvalido = fieldName in form.errors
    const estaErrado = estaMexido && estaInvalido

    return estaErrado
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  if (itens.length === 0 && !isSuccess) {
    dispatch(close())
    return (
      <>
        <Navigate to={'/'} />
      </>
    )
  }

  return (
    <CheckoutContainer>
      {isSuccess ? (
        <OrdemConcluida>
          <h2> Pedido Realizado - {data.orderId} </h2>
          <p>
            Estamos felizes em informar que seu pedido já está em processo de preparação e, em
            breve, será entregue no endereço fornecido.
            <br />
          </p>
          <p>
            Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar
            cobranças extras.
            <br />
          </p>
          <p>
            Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo
            assim sua segurança e bem-estar durante a refeição.
            <br />
          </p>
          <p>
            Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom
            apetite!
          </p>

          <button type="submit" onClick={() => dispatch(close())}>
            concluir
          </button>
        </OrdemConcluida>
      ) : (
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
                    className={checkInputHasError('name') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('address') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('city') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('numberAddress') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('complement') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('nameOnCard') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('cardNumber') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('cardCode') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('expiresMonth') ? 'error' : ''}
                  />
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
                    className={checkInputHasError('expiresYear') ? 'error' : ''}
                  />
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
      )}
    </CheckoutContainer>
  )
}

export default Checkout
