"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SyncUser() {
    const router = useRouter();

    useEffect(() => {
        const syncRole = async () => {
            const role = localStorage.getItem("paysure_role") || "freelancer";
            try {
                await fetch("/api/auth/set-role", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role })
                });
                localStorage.removeItem("paysure_role"); // Cleanup
            } catch (e) {
                console.error("Failed to sync role", e);
            } finally {
                // Force router refresh so the new metadata is reflected correctly in Clerk's session
                router.refresh();
                router.push("/dashboard");
            }
        };
        syncRole();
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center bg-[#020617] text-white">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm font-medium">Setting up your account profile...</p>
            </div>
        </div>
    );
}
