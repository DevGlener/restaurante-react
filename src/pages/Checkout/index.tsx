import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Navigate } from 'react-router-dom'
import type { RootReducer } from '../../store'
import { usePurchaseMutation } from '../../services/api'
import { clear, setEtapa, close } from '../../store/reducers/carrinho'
import { CheckoutContainer, InputGroup, Row, OrdemConcluida } from './style'

type FormValues = {
  name: string
  address: string
  city: string
  postalCode: string
  numberAddress: string
  complement: string
  nameOnCard: string
  cardNumber: string
  cardCode: string
  expiresMonth: string
  expiresYear: string
}

const initialValues: FormValues = {
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
}

const camposEntrega = [
  'name',
  'address',
  'city',
  'postalCode',
  'numberAddress',
  'complement'
] as const

function Checkout() {
  const dispatch = useDispatch()
  const { total, itens } = useSelector((state: RootReducer) => state.carrinho)
  const [showCard, setShowCard] = useState<'mostrar' | 'naoMostrar'>('mostrar')
  const [purchase, { isSuccess, isError, isLoading, data }] = usePurchaseMutation()

  const form = useFormik<FormValues>({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(5, 'Digite o nome completo (mín. 5 caracteres)')
        .required('Este campo é obrigatório'),
      address: Yup.string()
        .trim()
        .min(5, 'Digite um endereço válido (mín. 5 caracteres)')
        .required('Este campo é obrigatório'),
      city: Yup.string()
        .trim()
        .min(3, 'Digite uma cidade válida (mín. 3 caracteres)')
        .required('Este campo é obrigatório'),
      postalCode: Yup.string()
        .matches(/^\d{5}-?\d{3}$/, 'CEP inválido. Use 00000-000 ou 00000000')
        .required('Este campo é obrigatório'),
      numberAddress: Yup.string()
        .matches(/^\d+$/, 'Digite apenas números')
        .required('Este campo é obrigatório'),

      complement: Yup.string().trim(),
      nameOnCard: Yup.string()
        .trim()
        .min(3, 'Digite o nome impresso no cartão')
        .required('Este campo é obrigatório'),
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, 'O cartão deve ter 16 dígitos')
        .required('Este campo é obrigatório'),
      cardCode: Yup.string()
        .matches(/^\d{3,4}$/, 'O CVV deve ter 3 ou 4 dígitos')
        .required('Este campo é obrigatório'),
      expiresMonth: Yup.string()
        .matches(/^(0[1-9]|1[0-2])$/, 'Mês inválido (01 a 12)')
        .required('Este campo é obrigatório'),
      expiresYear: Yup.string()
        .matches(/^\d{4}$/, 'Digite o ano com 4 dígitos (ex: 2030)')
        .required('Este campo é obrigatório')
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
            zipCode: Number(values.postalCode.replace(/\D/g, ''))
          }
        },
        products: itens.map((item) => ({
          id: item.id,
          price: item.preco
        }))
      })
    }
  })

  const getError = (field: keyof FormValues) =>
    form.touched[field] && form.errors[field] ? form.errors[field] : ''

  const isValid = (field: keyof FormValues) =>
    !!form.touched[field] && !form.errors[field] && form.values[field].trim() !== ''

  const handleContinue = async () => {
    const errors = await form.validateForm()
    const touched = camposEntrega.reduce((acc, f) => ({ ...acc, [f]: true }), { ...form.touched })
    form.setTouched(touched, false)

    const temErro = camposEntrega.some((f) => errors[f])
    if (!temErro) setShowCard('naoMostrar')
  }

  const renderField = (opts: {
    name: keyof FormValues
    label: string
    maxWidth?: string
    placeholder?: string
    inputMode?: 'text' | 'numeric'
  }) => {
    const { name, label, maxWidth, placeholder, inputMode = 'text' } = opts
    const error = getError(name)
    const valid = isValid(name)

    return (
      <InputGroup maxWidth={maxWidth}>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type="text"
          name={name}
          inputMode={inputMode}
          placeholder={placeholder}
          value={form.values[name]}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className={error ? 'error' : valid ? 'valid' : ''}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {error && (
          <small id={`${name}-error`} className="error-text" role="alert">
            {error}
          </small>
        )}
        {!error && valid && <small className="success-text">✓ Campo preenchido</small>}
      </InputGroup>
    )
  }

  useEffect(() => {
    if (isSuccess) dispatch(clear())
  }, [isSuccess, dispatch])

  const carrinhoVazio = itens.length === 0 && !isSuccess

  useEffect(() => {
    if (carrinhoVazio) dispatch(close())
  }, [carrinhoVazio, dispatch])

  if (carrinhoVazio) {
    return <Navigate to="/" />
  }

  return (
    <CheckoutContainer>
      {isSuccess ? (
        <OrdemConcluida>
          <h2> Pedido Realizado - {data?.orderId} </h2>
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

          <button type="button" onClick={() => dispatch(close())}>
            Concluir
          </button>
        </OrdemConcluida>
      ) : (
        <form onSubmit={form.handleSubmit} noValidate>
          {showCard === 'mostrar' ? (
            <div>
              <h2 className="tiltles">Entrega</h2>
              <Row>{renderField({ name: 'name', label: 'Quem irá receber' })}</Row>
              <Row>{renderField({ name: 'address', label: 'Endereço' })}</Row>
              <Row>{renderField({ name: 'city', label: 'Cidade' })}</Row>
              <Row>
                {renderField({
                  name: 'postalCode',
                  label: 'CEP',
                  maxWidth: '154px',
                  placeholder: '00000-000',
                  inputMode: 'numeric'
                })}
                {renderField({
                  name: 'numberAddress',
                  label: 'Número',
                  maxWidth: '154px',
                  inputMode: 'numeric'
                })}
              </Row>
              <Row>{renderField({ name: 'complement', label: 'Complemento (Opcional)' })}</Row>

              <div className="butons">
                <button type="button" onClick={handleContinue}>
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
              <Row>{renderField({ name: 'nameOnCard', label: 'Nome do Cartão' })}</Row>
              <Row>
                {renderField({
                  name: 'cardNumber',
                  label: 'Número do Cartão',
                  maxWidth: '228px',
                  inputMode: 'numeric'
                })}
                {renderField({
                  name: 'cardCode',
                  label: 'CVV',
                  maxWidth: '88px',
                  inputMode: 'numeric'
                })}
              </Row>
              <Row>
                {renderField({
                  name: 'expiresMonth',
                  label: 'Mês de Vencimento',
                  maxWidth: '154px',
                  placeholder: 'MM',
                  inputMode: 'numeric'
                })}
                {renderField({
                  name: 'expiresYear',
                  label: 'Ano de Vencimento',
                  maxWidth: '154px',
                  placeholder: 'AAAA',
                  inputMode: 'numeric'
                })}
              </Row>

              {isError && (
                <small className="error-text" role="alert">
                  Não foi possível finalizar o pedido. Verifique os dados e tente novamente.
                </small>
              )}

              <div className="butons">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processando...' : 'Finalizar Pagamento'}
                </button>
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
