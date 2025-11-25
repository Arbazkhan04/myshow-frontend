import { SERVER_API_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromCookie } from '@/lib/get-token';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_API_URL,
    prepareHeaders: (headers) => {
      const token = getTokenFromCookie();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Audio', 'Character', 'User', 'Video'],
  endpoints: () => ({}),
});
