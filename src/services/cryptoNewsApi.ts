import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsData } from '../types';

const crytoNewsApiHeaders = {
  'X-RapidAPI-Key': '800d1c77edmsh142906e4c64c9efp1dacc1jsn17c97fdb6965',
  'X-RapidAPI-Host': 'news-api14.p.rapidapi.com',
};
const baseUrl = 'https://news-api14.p.rapidapi.com';

// const cryptoParams = {
//   referenceCurrencyUuid: 'yhjMzLPhuIDl',
//   limit: '50',
//   offset: '0',
//   orderBy: '24hVolume',
//   orderDirection: 'desc',
// };

const createRequest = (url: string) => ({ url, headers: crytoNewsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<
      NewsData,
      { newsCategory: string; count: number }
    >({
      query: ({ count, newsCategory }) =>
        createRequest(
          `/search?q=${newsCategory}&country=us&language=en&pageSize=${count}&publisher=cnn.com%2Cbbc.com`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
