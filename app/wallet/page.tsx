"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BalanceCard } from "@/components/dashboard/balance-card";

export default function WalletPage() {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight">Your Wallet</h1>
            </div>
            <div className="max-w-2xl">
                <BalanceCard />
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-card/50 backdrop-blur-md p-8 text-center text-white/50">
                Wallet ledger and funding history overview.
            </div>
        </DashboardLayout>
    );
}
