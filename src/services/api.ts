import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { restaurantes } from '../types/restaurantes';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-ebac.vercel.app/api/efood/restaurantes' }),
  endpoints: (builder) => ({
    getEfood: builder.query<restaurantes[], void>({
      query: () => '',
    }),
    getCardapio: builder.query<restaurantes, string>({
      query: (id) => `${id}`,
    }),
  }),
});

export default api;
export const { useGetEfoodQuery, useGetCardapioQuery } = api;
