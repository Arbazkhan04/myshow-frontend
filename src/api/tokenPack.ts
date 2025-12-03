import type { operations } from '@/types/api';
import { baseApi } from './base';

export const tokenPackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /** GET /api/v1/plans/token-packs */
    getAllTokenPacks: builder.query<
      operations['PlansController_getAllTokenPacks']['responses']['200']['content'],
      void
    >({
      query: () => ({
        url: `/plans/token-packs`,
        method: 'GET',
      }),
      providesTags: ['TokenPack']
    }),

    /** POST /api/v1/plans/token-packs */
    createTokenPack: builder.mutation<
      operations['PlansController_createTokenPack']['responses']['201']['content'],
      operations['PlansController_createTokenPack']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: `/plans/token-packs`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TokenPack']
    }),

    /** PUT /api/v1/plans/token-packs/{id} */
    updateTokenPack: builder.mutation<
      operations['PlansController_updateTokenPack']['responses']['200']['content'],
      {
        id: string;
        body: operations['PlansController_updateTokenPack']['requestBody']['content']['application/json'];
      }
    >({
      query: ({ id, body }) => ({
        url: `/plans/token-packs/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['TokenPack']
    }),

  }),
});

export const {
  useGetAllTokenPacksQuery,
  useCreateTokenPackMutation,
  useUpdateTokenPackMutation,
} = tokenPackApi;
