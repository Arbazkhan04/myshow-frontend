import { LoginForm } from "@/components/app/LoginForm";
import { CenteredFormLayout } from "@/components/common/centered-form.layout";
import { useNavigate } from "react-router";

export function AdminLoginIndex() {
    const navigate = useNavigate();
    return (
        <CenteredFormLayout>
            <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg border border-border backdrop-blur-sm">
                {/* Header Section */}
                <div className="text-center space-y-3">
                    <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
                        <img src="/logo.png" alt="myshow.ai logo" className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-card-foreground">
                            Admin Login
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Access the administration dashboard
                        </p>
                    </div>
                </div>

                {/* Login Form */}
                <LoginForm onSuccess={() => {
                    navigate("/admin");
                }} />
            </div>
        </CenteredFormLayout>
    )
}