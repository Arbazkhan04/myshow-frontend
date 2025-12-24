import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/use-auth';

/**
 * AdminRoute component that requires admin role
 * Redirects to home if user is not authenticated or not an admin
 */
export function AdminRoute() {
    const { isAuthenticated, isAdmin } = useAuth();

    // If not authenticated or not admin, redirect to home
    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    // If authenticated and is admin, render the protected admin content
    return <Outlet />;
}
