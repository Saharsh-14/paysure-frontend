"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AlertCircle } from "lucide-react";

export default function DisputesPage() {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight">Active Disputes</h1>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-medium border border-white/20 transition-all flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Raise Dispute
                </button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-md p-8 text-center text-white/50">
                You do not have any active disputes.
            </div>
        </DashboardLayout>
    );
}
