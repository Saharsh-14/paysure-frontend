"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function ProjectsPage() {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight">Projects</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all">
                    Create Project
                </button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-md p-8 text-center text-white/50">
                Active projects will appear here.
            </div>
        </DashboardLayout>
    );
}
