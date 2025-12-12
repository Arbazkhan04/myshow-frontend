import type { operations } from '@/types/api';
import { baseApi } from './base';

export const episodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** GET /api/v1/episode/:id */
    getEpisodeById: builder.query<
      operations['EpisodeController_getEpisodeById']['responses']['200']['content'],
      operations['EpisodeController_getEpisodeById']['parameters']['path']
    >({
      query: ({ id }) => ({
        url: `/episode/${id}`,
        method: 'GET',
      }),
      providesTags: ['Episode'],
    }),

    /** PATCH /api/v1/episode/:id */
    updateEpisode: builder.mutation<
      operations['EpisodeController_updateEpisode']['responses']['200']['content'],
      operations['EpisodeController_updateEpisode']['parameters']['path']
    >({
      query: ({ id, data }) => ({
        url: `/episode/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Episode'],
    }),

    /** DELETE /api/v1/episode/:id */
    deleteEpisode: builder.mutation<
      operations['EpisodeController_deleteEpisode']['responses']['200']['content'],
      operations['EpisodeController_deleteEpisode']['parameters']['path']
    >({
      query: ({ id }) => ({
        url: `/episode/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Episode'],
    }),

    /** GET /api/v1/episode?filters... */
    filterEpisodes: builder.query<
      operations['EpisodeController_filterEpisodes']['responses']['200']['content'],
      operations['EpisodeController_filterEpisodes']['parameters']['query']
    >({
      query: (query) => ({
        url: `/episode`,
        method: 'GET',
        params: query,
      }),
      providesTags: ['Episode'],
    }),

    /** POST /api/v1/episode/:id/watch */
    trackWatch: builder.mutation<
      operations['EpisodeController_trackWatch']['responses']['200']['content'],
      operations['EpisodeController_trackWatch']['parameters']['path']
    >({
      query: ({ id }) => ({
        url: `/episode/${id}/watch`,
        method: 'POST',
      })
    }),

    /** POST /api/v1/episode/:id/like */
    toggleLike: builder.mutation<
      operations['EpisodeController_toggleLike']['responses']['200']['content'],
      operations['EpisodeController_toggleLike']['parameters']['path']
    >({
      query: ({ id }) => ({
        url: `/episode/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Episode'],
    }),

    /** POST /api/v1/episode/:id/download */
    trackDownload: builder.mutation<
      operations['EpisodeController_trackDownload']['responses']['200']['content'],
      operations['EpisodeController_trackDownload']['parameters']['path']
    >({
      query: ({ id }) => ({
        url: `/episode/${id}/download`,
        method: 'POST',
      }),
      invalidatesTags: ['Episode'],
    }),

    /** GET /api/v1/episode/:id/engagement */
    getUserEngagement: builder.query<
      operations['EpisodeController_getUserEngagement']['responses']['200']['content'],
      operations['EpisodeController_getUserEngagement']['parameters']['path']
    >({
      query: ({ id }) => ({
        url: `/episode/${id}/engagement`,
        method: 'GET',
      }),
      providesTags: ['Episode'],
    }),
  }),
});

export const {
  useGetEpisodeByIdQuery,
  useUpdateEpisodeMutation,
  useDeleteEpisodeMutation,
  useFilterEpisodesQuery,
  useTrackWatchMutation,
  useToggleLikeMutation,
  useTrackDownloadMutation,
  useGetUserEngagementQuery,
} = episodeApi;
