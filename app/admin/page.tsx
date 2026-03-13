"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useProjects, useDisputes, useTransactions, useWalletBalance } from "@/lib/hooks";
import { StatCard } from "@/components/ui/stat-card";
import { Users, FolderKanban, Scale, DollarSign, ShieldCheck, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function AdminPage() {
    const { data: projects } = useProjects();
    const { data: disputes } = useDisputes();
    const { data: transactions } = useTransactions();
    const { data: wallet } = useWalletBalance();

    const totalEscrow = (projects || []).reduce((sum: number, p: any) => sum + (p.totalEscrow - p.releasedAmount), 0);
    const activeDisputes = (disputes || []).filter((d: any) => d.status !== "resolved").length;
    const totalTransactions = (transactions || []).length;

    return (
        <DashboardLayout>
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Admin Panel</h1>
                    <Badge variant="warning" dot>Admin Only</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Platform-wide overview and controls</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="Platform Escrow" value={formatCurrency(totalEscrow)} icon={DollarSign} iconBg="bg-blue-500/10" iconColor="text-blue-600 dark:text-blue-400" subtitle="Currently held in escrow" />
                <StatCard title="Active Disputes" value={String(activeDisputes)} icon={Scale} iconBg="bg-red-500/10" iconColor="text-red-600 dark:text-red-400" subtitle="Needs attention" />
                <StatCard title="Total Projects" value={String((projects || []).length)} icon={FolderKanban} iconBg="bg-indigo-500/10" iconColor="text-indigo-600 dark:text-indigo-400" />
                <StatCard title="Total Transactions" value={String(totalTransactions)} icon={Activity} iconBg="bg-emerald-500/10" iconColor="text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 mb-6">
                <h2 className="text-base font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        { label: "Manage Users", desc: "View and manage platform users", icon: Users, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
                        { label: "Review Disputes", desc: "Mediate active disputes", icon: Scale, color: "bg-red-500/10 text-red-600 dark:text-red-400" },
                        { label: "Escrow Overview", desc: "Monitor all escrow accounts", icon: ShieldCheck, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
                        { label: "Transaction Audit", desc: "Audit payment history", icon: Activity, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
                    ].map((action) => (
                        <div key={action.label} className="rounded-xl border border-border bg-card p-4 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${action.color}`}><action.icon className="w-[18px] h-[18px]" /></div>
                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{action.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
