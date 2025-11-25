import type { operations } from '@/types/api';
import { baseApi } from './base';

export const generationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // useGenerateStreamMockMutation
    generateStreamMock: builder.mutation<
      void,
      { data: any }
    >({
      query: ({ data }) => ({
        url: '/episode-orchestrator/generate-stream-mock',
        method: 'POST',
        body: data,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Video'],
    }),
  }),
});

export const { useGenerateStreamMockMutation } = generationApi;
