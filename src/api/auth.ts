import type { operations } from '@/types/api';
import { type ApiResponse } from '@/types/api-response';
import { baseApi } from './base';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // useLoginMutation
    login: builder.mutation<
      ApiResponse<
        operations['AuthController_login']['responses']['200']['content']['application/json']
      >,
      operations['AuthController_login']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: 'auth/login/admin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
