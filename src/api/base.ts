import { SERVER_API_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_API_URL,
    prepareHeaders: (headers) => {
      // ✅ Read token from localStorage
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Audio', 'Character', 'User', 'Video', 'Plan', 'TokenPack', 'Episode', 'Comment'],
  endpoints: () => ({}),
});
