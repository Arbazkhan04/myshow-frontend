import { LandingPage } from "@/features/landing/LandingPage";
import { MainLayout } from "@/components/common/main.layout";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { AdminRoute } from "@/components/common/AdminRoute";
import { AdminLayout } from "@/pages/admin/admin.layout";
import { AdminLoginIndex } from "@/pages/admin/login/admin-login.index";
import { AdminPlansIndex } from "@/pages/admin/plans-management/admin-plan.index";
import { AdminTokenPacksIndex } from "@/pages/admin/token-packs-management/admin-token-packs.index";
import { AdminUsersIndex } from "@/pages/admin/users-management/admin-users.index";
import { CharactersLayout } from "@/pages/characters/character.layout";
import { CreateCharacterIndex } from "@/pages/characters/create/character-create.index";
import { MyCharactersIndex } from "@/pages/characters/my-characters/my-characters.index";
import { CommunityIndex } from "@/pages/community/community.index";
import CreateVideoIndex from "@/pages/create/create-video.index";
import { LibraryIndex } from "@/pages/library/library.index";
import { PlansIndexPage } from "@/pages/plans/plans.index";
import { SuccessSubscription } from "@/pages/plans/success.subscription";
import { TokenPacksIndexPage } from "@/pages/plans/token-packs.index";
import { ProfileIndex } from "@/pages/profile/profile.index";
import { Navigate, Route, Routes } from "react-router";

export function AppRoutes() {
    return (
        <Routes>
      <Route path="/" element={<LandingPage />} />

            <Route path="/payment/success" element={<SuccessSubscription />} />

            {/* Public subscription routes - no authentication required */}
            <Route path="/" element={<MainLayout />}>
                <Route path="subscription/plans" element={<PlansIndexPage />} />
                <Route path="subscription/token-packs" element={<TokenPacksIndexPage />} />
            </Route>

            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />}>
                    <Route path="create" element={<CreateVideoIndex />} />
                    <Route path="characters" element={<CharactersLayout />}>
                        <Route index element={<Navigate to="/characters/create" />} />
                        <Route path="create" element={<CreateCharacterIndex />} />
                        <Route path="my-characters" element={<MyCharactersIndex />} />
                        <Route path="*" element={<Navigate to="/characters/create" />} />
                    </Route>
                    <Route path="library" element={<LibraryIndex />} />
                    <Route path="community" element={<CommunityIndex />} />
                    <Route path="profile" element={<ProfileIndex />} />
                    
                </Route>
            </Route>

            {/* Admin login - public */}
            <Route path="/admin/login" element={<AdminLoginIndex />} />

            {/* Admin routes - require admin role */}
            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" />} />
                    <Route path="users-management" element={<AdminUsersIndex />} />
                    <Route path="plans-management" element={<AdminPlansIndex />} />
                    <Route path="token-packs-management" element={<AdminTokenPacksIndex />} />
                    <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                </Route>
            </Route>
        </Routes>
    )
}
