import type { operations } from '@/types/api';
import { baseApi } from './base';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // useRegisterMutation
    register: builder.mutation<
      operations['AuthController_register']['responses']['201']['content'],
      operations['AuthController_register']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body,
      }),
    }),

    // useLoginMutation
    login: builder.mutation<
      operations['AuthController_login']['responses']['200']['content'],
      operations['AuthController_login']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;