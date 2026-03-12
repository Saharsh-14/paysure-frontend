"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { ActiveEscrowCard } from "@/components/dashboard/wallet-card";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { ProjectOverview } from "@/components/dashboard/project-overview";
import { ActiveDisputesCard } from "@/components/dashboard/disputes-card";

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Wider on LG) */}
                <div className="lg:col-span-2 space-y-6">
                    <BalanceCard />

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white px-1">Recent Transactions</h2>
                        <TransactionList />
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between px-1 mb-2">
                            <h2 className="text-lg font-semibold text-white">Active Projects</h2>
                        </div>
                        <ProjectOverview />
                    </div>
                </div>

                {/* Right Column (Narrower on LG) */}
                <div className="space-y-6 lg:sticky lg:top-24 h-max">
                    <ActiveEscrowCard />
                    <ActiveDisputesCard />
                </div>
            </div>
        </DashboardLayout>
    );
}
