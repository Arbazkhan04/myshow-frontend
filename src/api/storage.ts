import type { operations } from '@/types/api';
import { baseApi } from './base';

export const storageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /** POST /api/v1/storage/upload */
    uploadFiles: builder.mutation<
      operations['StorageController_uploadFiles']['responses']['200']['content']['application/json'],
      operations['StorageController_uploadFiles']['requestBody']['content']
    >({
      query: (body) => ({
        url: `/storage/upload`,
        method: 'POST',
        body,
      }),
    }),

    /** DELETE /api/v1/storage/{key} */
    deleteFile: builder.mutation<
      operations['StorageController_deleteFile']['responses']['200']['content']['application/json'],
      { key: string } // path parameter
    >({
      query: ({ key }) => ({
        url: `/storage/${key}`,
        method: 'DELETE',
      }),
    }),

  }),
});

export const {
  useUploadFilesMutation,
  useDeleteFileMutation,
} = storageApi;
