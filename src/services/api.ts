import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { restaurantes } from '../types/restaurantes'

type Product = {
  id: number
  price: number
}

type PurchasePayload = {
  products: Product[]
  delivery: {
    receiver: string
    address: {
      description?: string
      city: string
      zipCode: number
      number: number
      complement: string
    }
  }
  payment: {
    card: {
      name: string
      number: number
      code: number
      expires: {
        month: number
        year: number
      }
    }
  }
}

type PurchaseResponse = {
  orderId: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-ebac.vercel.app/api/efood/' }),
  endpoints: (builder) => ({
    getEfood: builder.query<restaurantes[], void>({
      query: () => 'restaurantes'
    }),
    getCardapio: builder.query<restaurantes, string>({
      query: (id) => `restaurantes/${id}`
    }),

    purchase: builder.mutation<PurchaseResponse, PurchasePayload>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export default api
export const { useGetEfoodQuery, useGetCardapioQuery, usePurchaseMutation } = api
