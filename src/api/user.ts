import type { operations } from '@/types/api';
import { baseApi } from './base';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // useGetAllUsersQuery
    getAllUsers: builder.query<
      operations['UserController_getAllUsers']['responses']['200'],
      operations['UserController_getAllUsers']['parameters']['query']
    >({
      query: (params) => ({
        url: '/api/v1/users',
        method: 'GET',
        params,
      }),
      providesTags: ['User'],
    }),

    // useFilterUsersQuery
    filterUsers: builder.query<
      operations['UserController_filterUsers']['responses']['200'],
      operations['UserController_filterUsers']['parameters']['query']
    >({
      query: (params) => ({
        url: '/api/v1/users/filter',
        method: 'GET',
        params,
      }),
      providesTags: ['User'],
    }),

    // useGetUserByIdQuery
    getUserById: builder.query<
      operations['UserController_getUserById']['responses']['200'],
      operations['UserController_getUserById']['parameters']['path']
    >({
      query: (params) => ({
        url: `/api/v1/users/${params.id}`,
        method: 'GET',
      }),
      providesTags: (result, error, params) => [{ type: 'User', id: params.id }],
    }),

    // useUpdateUserMutation
    updateUser: builder.mutation<
      operations['UserController_updateUser']['responses']['200'],
      {
        path: operations['UserController_updateUser']['parameters']['path'];
        body: operations['UserController_updateUser']['requestBody']['content']['application/json'];
      }
    >({
      query: ({ path, body }) => ({
        url: `/api/v1/users/${path.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { path }) => [
        { type: 'User', id: path.id },
        'User',
      ],
    }),

    // useDeleteUserMutation
    deleteUser: builder.mutation<
      operations['UserController_deleteUser']['responses']['200'],
      operations['UserController_deleteUser']['parameters']['path']
    >({
      query: (params) => ({
        url: `/api/v1/users/${params.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useFilterUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;