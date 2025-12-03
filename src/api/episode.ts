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
    }),
  }),
});

export const {
  useGetEpisodeByIdQuery,
  useDeleteEpisodeMutation,
  useFilterEpisodesQuery,
} = episodeApi;
