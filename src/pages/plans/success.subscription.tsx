"use client";

import { useNavigate, useSearchParams } from "react-router";
import { CenteredFormLayout } from "@/components/common/centered-form.layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function SuccessSubscription() {
    const navigate = useNavigate();
    const searchParams = useSearchParams();
    const sessionId = searchParams[0].get("session_id");

    const handleGoToProfile = () => {
        navigate("/profile");
    };

    return (
        <CenteredFormLayout>
            <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg border border-border backdrop-blur-sm text-center">
                {/* Success Icon */}
                <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-card-foreground">
                        Payment Successful!
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        You have successfully completed the payment.
                    </p>
                </div>

                {/* Action Button */}
                    <Button className="w-full mt-4" onClick={handleGoToProfile}>
                        Go to Profile
                    </Button>
            </div>
        </CenteredFormLayout>
    );
}