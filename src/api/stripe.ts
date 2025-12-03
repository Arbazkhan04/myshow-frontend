import type { operations } from '@/types/api';
import { baseApi } from './base';

export const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /** POST /api/v1/stripe/create-subscription-checkout */
    createSubscriptionCheckout: builder.mutation<
      operations['StripeController_createSubscriptionCheckout']['responses']['200']['content']['application/json'],
      operations['StripeController_createSubscriptionCheckout']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: `/stripe/create-subscription-checkout`,
        method: 'POST',
        body,
      }),
    }),

    /** POST /api/v1/stripe/create-token-pack-checkout */
    createTokenPackCheckout: builder.mutation<
      operations['StripeController_createTokenPackCheckout']['responses']['200']['content']['application/json'],
      operations['StripeController_createTokenPackCheckout']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: `/stripe/create-token-pack-checkout`,
        method: 'POST',
        body,
      }),
    }),

  }),
});

export const {
  useCreateSubscriptionCheckoutMutation,
  useCreateTokenPackCheckoutMutation,
} = stripeApi;
