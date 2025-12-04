import type { operations } from '@/types/api';
import { baseApi } from './base';

export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /** GET /api/v1/plans */
    getAllPlans: builder.query<
      operations['PlansController_getAllPlans']['responses']['200']['content'],
      operations['PlansController_getAllPlans']['parameters']['query']
    >({
      query: (query) => ({
        url: `/plans/all-plans`,
        method: 'GET',
        params: query,
      }),
      providesTags: ['Plan']
    }),

    /** POST /api/v1/plans */
    createPlan: builder.mutation<
      operations['PlansController_createPlan']['responses']['201']['content'],
      operations['PlansController_createPlan']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: `/plans`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Plan']
    }),

    /** GET /api/v1/plans/active */
    getActivePlans: builder.query<
      operations['PlansController_getActivePlans']['responses']['200']['content'],
      void
    >({
      query: () => ({
        url: `/plans/active`,
        method: 'GET',
      }),
      providesTags: ['Plan']
    }),

    /** GET /api/v1/plans/tier/{tier}/{interval} */
    getPlanByTier: builder.query<
      operations['PlansController_getPlanByTier']['responses']['200']['content'],
      operations['PlansController_getPlanByTier']['parameters']['path']
    >({
      query: ({ tier, interval }) => ({
        url: `/plans/tier/${tier}/${interval}`,
        method: 'GET',
      }),
      providesTags: ['Plan']
    }),

    /** GET /api/v1/plans/{id} */
    getPlanById: builder.query<
      operations['PlansController_getPlanById']['responses']['200']['content'],
      operations['PlansController_getPlanById']['parameters']['path']
    >({
      query: ({ id }) => ({
        url: `/plans/getPlanById/${id}`,
        method: 'GET',
      }),
      providesTags: ['Plan']
    }),

    /** PUT /api/v1/plans/{id} */
    updatePlan: builder.mutation<
      operations['PlansController_updatePlan']['responses']['200']['content'],
      {
        id: string;
        body: operations['PlansController_updatePlan']['requestBody']['content']['application/json'];
      }
    >({
      query: ({ id, body }) => ({
        url: `/plans/updatePlanById/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Plan']
    }),

    /** DELETE /api/v1/plans/{id} */
    deletePlan: builder.mutation<
      operations['PlansController_deletePlan']['responses']['200']['content'],
      operations['PlansController_deletePlan']['parameters']['path']
    >({
      query: ({ id }) => ({
        url: `/plans/deletePlanById/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plan']
    }),

    /** GET /api/v1/plans/calculate-cost */
    calculateCost: builder.query<
      operations['PlansController_calculateCost']['responses']['200']['content'],
      operations['PlansController_calculateCost']['parameters']['query']
    >({
      query: (query) => ({
        url: `/plans/calculate-cost`,
        method: 'GET',
        params: query,
      }),
    }),

    /** GET /api/v1/plans/transactions/my-history */
    getMyTransactions: builder.query<
      operations['PlansController_getMyTransactions']['responses']['200']['content'],
      operations['PlansController_getMyTransactions']['parameters']['query']
    >({
      query: (query) => ({
        url: `/plans/transactions/my-history`,
        method: 'GET',
        params: query,
      }),
      providesTags: ['Plan']
    }),

  }),
});

export const {
  useGetAllPlansQuery,
  useCreatePlanMutation,
  useGetActivePlansQuery,
  useGetPlanByTierQuery,
  useGetPlanByIdQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useCalculateCostQuery,
  useGetMyTransactionsQuery,
} = planApi;
