import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExchangesData } from '../types';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': '800d1c77edmsh142906e4c64c9efp1dacc1jsn17c97fdb6965',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};
const baseUrl = 'https://coinranking1.p.rapidapi.com';

// const cryptoParams = {
//   referenceCurrencyUuid: 'yhjMzLPhuIDl',
//   limit: '50',
//   offset: '0',
//   orderBy: '24hVolume',
//   orderDirection: 'desc',
// };

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<ExchangesData, string>({
      query: () => createRequest('/coins'),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
