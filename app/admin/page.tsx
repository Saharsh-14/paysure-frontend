"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AdminPage() {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight">Platform Administration</h1>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-md p-8 text-center text-white/50">
                Admin overview and controls. Only accessible to platform administrators.
            </div>
        </DashboardLayout>
    );
}
