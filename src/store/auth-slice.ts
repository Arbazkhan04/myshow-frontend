import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getTokenFromCookie, decodeJwtPayload } from '@/lib/get-token';

type User = {
  id: string;
  role: 'user' | 'admin';
};

interface AuthState {
  user: User | null;
}

const token = getTokenFromCookie();
const user = decodeJwtPayload(token);

const initialState: AuthState = {
  user,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string, user: User}>) {
      document.cookie = `token=${action.payload.token}; path=/; secure; samesite=strict`;
      state.user = action.payload.user;
    },
    logout(state) {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
