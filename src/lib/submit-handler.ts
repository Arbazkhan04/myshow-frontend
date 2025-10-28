import { toast } from "sonner";

export async function submitHandler({ data, mutate, onSuccess, onFail }: { data: any, mutate: (data: any) => Promise<any>, onSuccess?: (response: any) => any, onFail?: () => any }) {
    try {
        const response = (await mutate(data)) as any;
        if (response.data) {
            if (onSuccess) {
                onSuccess(response.data);
            }
            toast(response.data.message);
        } else {
            if (onFail) {
                onFail();
            }
            toast(response.error.data.message, {
                description: "Unexpected response from server",
            });
        }
    } catch (error: any) {
        const errorData = error.data;
        if (onFail) {
            onFail();
        }
        if (errorData?.message) {
            toast(errorData.message, {
                description: "Please try again"
            });
        } else {
            toast("Failed to submit !", {
                description: "An unexpected error occurred",
            });
        }
    }
}