"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TransactionList } from "@/components/dashboard/transaction-list";

export default function TransactionsPage() {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight">Transactions</h1>
            </div>
            <div className="bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <TransactionList />
            </div>
        </DashboardLayout>
    );
}
