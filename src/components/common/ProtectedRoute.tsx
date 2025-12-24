import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/use-auth';
import { AuthDialog } from '@/components/app/AuthDialog';

/**
 * ProtectedRoute component that requires user authentication
 * If user is not authenticated, shows auth dialog
 * If user closes dialog without signing in, redirects to previous path or home
 */
export function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const [attemptedPath, setAttemptedPath] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            setAttemptedPath(location.pathname);
            setShowAuthDialog(true);
        }
    }, [isAuthenticated, location.pathname]);

    const handleAuthSuccess = () => {
        setShowAuthDialog(false);
        // User is now authenticated via the AuthForm's internal login dispatch
        // The page will reload and user will be authenticated
    };

    const handleDialogClose = (open: boolean) => {
        if (!open && !isAuthenticated) {
            // User closed dialog without signing in
            // Redirect to previous path or home
            const redirectPath = attemptedPath || '/';
            navigate(redirectPath === location.pathname ? '/' : redirectPath, { replace: true });
        }
        setShowAuthDialog(open);
    };

    // If authenticated, render the protected content
    if (isAuthenticated) {
        return <Outlet />;
    }

    // Show auth dialog
    return (
        <AuthDialog
            open={showAuthDialog}
            onOpenChange={handleDialogClose}
            onAuthSuccess={handleAuthSuccess}
        />
    );
}
