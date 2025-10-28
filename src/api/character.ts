import type { operations } from '@/types/api';
import { baseApi } from './base';

export const characterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // useGetCharacterByIdQuery
    getCharacterById: builder.query<
      operations['CharacterController_getCharacterById']['responses']['200']['content']['application/json'],
      operations['CharacterController_getCharacterById']['parameters']['path']
    >({
      query: (params) => ({
        url: `/character/characterById/${params.id}`,
        method: 'GET',
      }),
      providesTags: (result, error, params) => [{ type: 'Character', id: params.id }],
    }),

    // useGetCharactersByUserQuery
    getCharactersByUser: builder.query<
      operations['CharacterController_getCharactersByUser']['responses']['200']['content']['application/json'],
      operations['CharacterController_getCharactersByUser']['parameters']['query']
    >({
      query: (params) => ({
        url: '/character/getUserCharacters',
        method: 'GET',
        params,
      }),
      providesTags: ['Character'],
    }),

    // useDeleteCharacterMutation
    deleteCharacter: builder.mutation<
      operations['CharacterController_deleteCharacter']['responses']['200']['content']['application/json'],
      operations['CharacterController_deleteCharacter']['parameters']['path']
    >({
      query: (params) => ({
        url: `/character/delete/${params.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Character'],
    }),

    // useCreateCharacterMutation
    createCharacter: builder.mutation<
      operations['CharacterWorkflowController_createCharacter']['responses']['201']['content'],
      operations['CharacterWorkflowController_createCharacter']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: '/character-workflow',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Character'],
    }),
  }),
});

export const {
  useGetCharacterByIdQuery,
  useGetCharactersByUserQuery,
  useDeleteCharacterMutation,
  useCreateCharacterMutation,
} = characterApi;