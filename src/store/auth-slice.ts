import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getTokenFromCookie } from '@/lib/get-token';

const token = getTokenFromCookie();
const user = !!token;

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user },
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      document.cookie = `token=${action.payload.token}; path=/; secure; samesite=strict`;
      state.user = true;
    },
    logout(state) {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      state.user = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
