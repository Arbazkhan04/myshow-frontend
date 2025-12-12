import type { operations } from '@/types/api';
import { baseApi } from './base';

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** GET /api/v1/episode/:episodeId/comments */
    getEpisodeComments: builder.query<
      operations['CommentController_getEpisodeComments']['responses']['200']['content'],
      operations['CommentController_getEpisodeComments']['parameters']['path']
    >({
      query: ({ episodeId, sortBy, page, limit }) => ({
        url: `/episode/${episodeId}/comments`,
        method: "GET",
        params: { sortBy, page, limit },
      }),
      providesTags: ['Comment']
    }),

    /** POST /api/v1/episode/:episodeId/comments */
    createComment: builder.mutation<
      operations['CommentController_createComment']['responses']['200']['content'],
      operations['CommentController_createComment']['parameters']['path']
    >({
      query: ({ episodeId, ...body }) => ({
        url: `/episode/${episodeId}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment']
    }),

    /** GET /api/v1/comment/:commentId/replies */
    getCommentReplies: builder.query<
      operations['CommentController_getCommentReplies']['responses']['200']['content'],
      operations['CommentController_getCommentReplies']['parameters']['path']
    >({
      query: ({ commentId }) => ({
        url: `/comment/${commentId}/replies`,
        method: 'GET',
      }),
      providesTags: ['Comment']
    }),

    /** DELETE /api/v1/comment/:commentId */
    deleteComment: builder.mutation<
      operations['CommentController_deleteComment']['responses']['200']['content'],
      operations['CommentController_deleteComment']['parameters']['path']
    >({
      query: ({ commentId }) => ({
        url: `/comment/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment']
    }),

    /** PATCH /api/v1/comment/:commentId */
    updateComment: builder.mutation<
      operations['CommentController_updateComment']['responses']['200']['content'],
      operations['CommentController_updateComment']['parameters']['path'] & { body: any } // add body for update
    >({
      query: ({ commentId, body }) => ({
        url: `/comment/${commentId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Comment']
    }),
  }),
});

export const {
  useGetEpisodeCommentsQuery,
  useCreateCommentMutation,
  useGetCommentRepliesQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
