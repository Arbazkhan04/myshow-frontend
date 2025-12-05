import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { decodeJwtPayload } from '@/lib/get-token';

type User = {
  _id: string;
  email: string;
  role: 'user' | 'admin';
};

interface AuthState {
  user: User | null;
}

// ✅ Get token from localStorage instead of cookies
const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const user = token ? decodeJwtPayload(token) : null;

const initialState: AuthState = {
  user,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      // ✅ Save token to localStorage
      localStorage.setItem('token', action.payload.token);

      // ✅ Decode NEW token (not old one)
      state.user = decodeJwtPayload(action.payload.token);
    },

    logout(state) {
      // ✅ Remove token from localStorage
      localStorage.removeItem('token');
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
