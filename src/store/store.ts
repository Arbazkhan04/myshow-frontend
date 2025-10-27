import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/api/base';
import authReducer from './auth-slice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// 👇 Add these exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;