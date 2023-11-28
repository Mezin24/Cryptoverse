import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CoinHistory, ExchangeData, ExchangesData } from '../types';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPIDAPI_KEY,
  'X-RapidAPI-Host': import.meta.env.VITE_APP_CRYPTO_RAPIDAPI_HOST,
};
const baseUrl = import.meta.env.VITE_APP_CRYPTO_API_URL;

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<ExchangesData, string>({
      query: () => createRequest('/coins'),
    }),
    getExchanges: builder.query<ExchangeData, string>({
      query: () => createRequest(`/exchanges`),
    }),
    getCryptoDetails: builder.query<ExchangeData, string>({
      query: (coinId: string) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<
      CoinHistory,
      { coinId: string; timeperiod: string }
    >({
      query: ({ coinId, timeperiod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
