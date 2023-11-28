import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsData } from '../types';

const crytoNewsApiHeaders = {
  'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPIDAPI_KEY,
  'X-RapidAPI-Host': import.meta.env.VITE_APP_NEWS_RAPIDAPI_HOST,
};
const baseUrl = import.meta.env.VITE_APP_NEWS_API_URL;

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
