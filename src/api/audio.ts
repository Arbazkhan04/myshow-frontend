import type { operations } from '@/types/api';
import { baseApi } from './base';

export const audioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // useFilterVoicesQuery
    filterVoices: builder.query<
      operations['AudioModelController_filterVoices']['responses']['200']['content']['application/json'],
      operations['AudioModelController_filterVoices']['parameters']['query']
    >({
      query: (params) => ({
        url: '/api/v1/audio-model/filter',
        method: 'GET',
        params,
      }),
      providesTags: ['Audio'],
    }),
  }),
});

export const { useFilterVoicesQuery } = audioApi;