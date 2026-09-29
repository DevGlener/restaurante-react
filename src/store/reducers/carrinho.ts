import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type restaurantes } from '../../types/restaurantes';

type CarrinhoState = {
  itens: restaurantes[];
  isOpen: boolean;
};

const initialState: CarrinhoState = {
  itens: [],
  isOpen: false,
};

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<restaurantes>) => {
      const pedido = action.payload;

      if (state.itens.find((restaurante) => restaurante.id === pedido.id)) {
        alert('Item ja adicionado a lista');
      } else {
        state.itens.push(pedido);
      }
    },
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { adicionar, close, open } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
