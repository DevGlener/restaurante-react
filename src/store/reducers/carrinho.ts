import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type itensCardapio } from '../../types/restaurantes';

type CarrinhoState = {
  itens: itensCardapio[];
  isOpen: boolean;
  modalEstaAberto: boolean;
  itemSelecionado?: itensCardapio;
};

const initialState: CarrinhoState = {
  itens: [],
  isOpen: false,
  modalEstaAberto: false,
  itemSelecionado: undefined,
};

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
        state.isOpen = true;
      }
    },
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((item) => item.id !== action.payload);
    },
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
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

export const { adicionar, close, open, abrirModal, fecharModal, remover } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
