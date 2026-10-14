import { useDispatch, useSelector } from 'react-redux'
import type { RootReducer } from '../../../store'
import { CartContainer, Overlay, Sidebar, CardCar, LixeiraImg, Precos, CartButton } from './style'

import Lixeira from '../../../assets/images/icone-lixeira.png'
import { close, remover, setEtapa } from '../../../store/reducers/carrinho'
import Checkout from '../../../pages/Checkout'

function Cart() {
  const dispatch = useDispatch()

  const { isOpen, itens, etapa, total } = useSelector((state: RootReducer) => state.carrinho)

  const carrinhoVazio = itens.length === 0

  function fechaModalCarrinho() {
    dispatch(close())
  }

  function removerPedido(id: number) {
    dispatch(remover(id))
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={fechaModalCarrinho} />
      <Sidebar>
        {etapa === 'carrinho' ? (
          carrinhoVazio ? (
            <p className="empty-text">
              O carrinho está vazio, adicione pelo menos um produto para continuar com a compra.
            </p>
          ) : (
            <>
              <div>
                {itens.map((item) => (
                  <CardCar key={item.id}>
                    <img className="productImage" src={item.foto} alt="imagem do produto" />
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
                <h4>Valor Total</h4>
                <h4>R$ {total.toFixed(2)}</h4>
              </Precos>
              <CartButton as="button" onClick={() => dispatch(setEtapa('entrega'))}>
                Continuar com a entrega
              </CartButton>
            </>
          )
        ) : (
          <Checkout />
        )}
      </Sidebar>
    </CartContainer>
  )
}

export default Cart
