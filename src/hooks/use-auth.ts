import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

/**
 * Custom hook to access authentication state
 * @returns Authentication state including user info and helper methods
 */
export function useAuth() {
    const user = useSelector((state: RootState) => state.auth.user);

    return {
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isUser: user?.role === 'user',
    };
}
