"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SyncUser() {
    const router = useRouter();
    const { session } = useSession();

    useEffect(() => {
        const syncRole = async () => {
            const role = localStorage.getItem("paysure_role");

            if (role) {
                console.log("Syncing role from localStorage:", role);
                // Standardize to Capitalized (Client/Freelancer)
                const standardizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
                
                // New signup or role change — push role to Clerk metadata
                try {
                    const res = await fetch("/api/auth/set-role", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ role: standardizedRole }),
                    });
                    
                    if (res.ok) {
                        console.log("Role synced successfully:", standardizedRole);
                        localStorage.removeItem("paysure_role");
                    }
                } catch (e) {
                    console.error("Failed to sync role", e);
                }
            }

            // Reload Clerk session so publicMetadata is fresh on the client
            try {
                if (session) {
                    await session.reload();
                }
            } catch (e) {
                console.error("Failed to reload session", e);
            }

            // Small delay to let Clerk propagate the updated metadata
            await new Promise((r) => setTimeout(r, 500));

            router.replace("/dashboard");
        };

        if (session) {
            syncRole();
        }
    }, [session, router]);

    return (
        <div className="flex h-screen items-center justify-center bg-[#020617] text-white">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm font-medium">Setting up your account profile...</p>
            </div>
        </div>
    );
}
