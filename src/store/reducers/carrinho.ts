import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type itensCardapio } from '../../types/restaurantes';

type Etapa = 'carrinho' | 'entrega';

type CarrinhoState = {
  itens: itensCardapio[];
  total: number;
  isOpen: boolean;
  etapa: Etapa;
  modalEstaAberto: boolean;
  itemSelecionado?: itensCardapio;
};

const initialState: CarrinhoState = {
  itens: [],
  total: 0,
  isOpen: false,
  etapa: 'carrinho',
  modalEstaAberto: false,
  itemSelecionado: undefined,
};

const calcularTotal = (itens: itensCardapio[]) => itens.reduce((acc, item) => acc + item.preco, 0);

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<itensCardapio>) => {
      const item = action.payload;

      if (state.itens.find((i) => i.id === item.id)) {
        alert('Item já adicionado ao carrinho');
      } else {
        state.itens.push(item);
        state.total = calcularTotal(state.itens);
        state.isOpen = true;
      }
    },
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((item) => item.id !== action.payload);
      state.total = calcularTotal(state.itens);
    },
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
      state.etapa = 'carrinho';
    },
    setEtapa: (state, action: PayloadAction<Etapa>) => {
      state.etapa = action.payload;
    },
    abrirModal: (state, action: PayloadAction<itensCardapio>) => {
      state.itemSelecionado = action.payload;
      state.modalEstaAberto = true;
    },
    fecharModal: (state) => {
      state.modalEstaAberto = false;
      state.itemSelecionado = undefined;
    },
  },
});

export const { adicionar, close, open, setEtapa, abrirModal, fecharModal, remover } =
  carrinhoSlice.actions;
export default carrinhoSlice.reducer;
