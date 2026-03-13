"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { StatCard } from "@/components/ui/stat-card";
import { useTransactions } from "@/lib/hooks";
import { ArrowLeftRight, ArrowDownToLine, ArrowUpFromLine, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function TransactionsPage() {
    const { data: transactions } = useTransactions();

    const totalDeposits = (transactions || []).filter((t: any) => t.type === "deposit" || t.type === "escrow_lock").reduce((sum: number, t: any) => sum + t.amount, 0);
    const totalReleased = (transactions || []).filter((t: any) => t.type === "release").reduce((sum: number, t: any) => sum + t.amount, 0);
    const totalWithdrawals = (transactions || []).filter((t: any) => t.type === "withdrawal").reduce((sum: number, t: any) => sum + t.amount, 0);

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Transactions</h1>
                <p className="text-sm text-muted-foreground mt-1">Complete history of all payment activity</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <StatCard title="Total Deposits" value={formatCurrency(totalDeposits)} icon={ArrowDownToLine} iconBg="bg-emerald-500/10" iconColor="text-emerald-600 dark:text-emerald-400" />
                <StatCard title="Total Released" value={formatCurrency(totalReleased)} icon={ArrowLeftRight} iconBg="bg-blue-500/10" iconColor="text-blue-600 dark:text-blue-400" />
                <StatCard title="Total Withdrawals" value={formatCurrency(totalWithdrawals)} icon={ArrowUpFromLine} iconBg="bg-purple-500/10" iconColor="text-purple-600 dark:text-purple-400" />
            </div>

            <TransactionList />
        </DashboardLayout>
    );
}
