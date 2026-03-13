"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useProjects, useDisputes, useTransactions, useWalletBalance, useResolveDispute } from "@/lib/hooks";
import { StatCard } from "@/components/ui/stat-card";
import { Users, FolderKanban, Scale, DollarSign, ShieldCheck, Activity, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function AdminPage() {
    const { data: projects } = useProjects();
    const { data: disputes } = useDisputes();
    const { data: transactions } = useTransactions();
    const { data: wallet } = useWalletBalance();
    const resolveMutation = useResolveDispute();

    const totalEscrow = (projects || []).reduce((sum: number, p: any) => sum + (p.totalEscrow - (p.releasedAmount || 0)), 0);
    const activeDisputes = (disputes || []).filter((d: any) => d.status !== "resolved").length;
    const totalTransactions = (transactions || []).length;

    const handleResolve = (disputeId: number, decision: string) => {
        resolveMutation.mutate({ disputeId, decision });
    };

    return (
        <DashboardLayout>
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Admin Dashboard</h1>
                    <Badge variant="warning" dot>Authorized</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Mediate disputes and monitor platform liquidity</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="Platform Escrow" value={formatCurrency(totalEscrow)} icon={DollarSign} iconBg="bg-blue-500/10" iconColor="text-blue-600 dark:text-blue-400" subtitle="Funds in custody" />
                <StatCard title="Active Disputes" value={String(activeDisputes)} icon={Scale} iconBg="bg-red-500/10" iconColor="text-red-600 dark:text-red-400" subtitle="Needs resolution" />
                <StatCard title="Total Projects" value={String((projects || []).length)} icon={FolderKanban} iconBg="bg-indigo-500/10" iconColor="text-indigo-600 dark:text-indigo-400" />
                <StatCard title="Total Transactions" value={String(totalTransactions)} icon={Activity} iconBg="bg-emerald-500/10" iconColor="text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 mb-6">
                <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-red-500" /> Pending Disputes
                </h2>
                <div className="space-y-4">
                    {activeDisputes === 0 ? (
                        <p className="text-sm text-muted-foreground py-10 text-center">No active disputes requiring mediation.</p>
                    ) : (
                        (disputes || []).filter((d: any) => d.status !== "resolved").map((dispute: any) => (
                            <div key={dispute.id} className="p-4 rounded-xl border border-border bg-muted/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-foreground">{dispute.projectName} — {dispute.milestoneName}</p>
                                    <p className="text-xs text-muted-foreground">Reason: {dispute.reason}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">Raised By: {dispute.raisedBy}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button 
                                        size="sm" 
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                                        onClick={() => handleResolve(dispute.id, "RELEASE_TO_FREELANCER")}
                                        disabled={resolveMutation.isPending}
                                    >
                                        <CheckCircle className="w-3.5 h-3.5" /> Release to Freelancer
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        variant="destructive" 
                                        className="gap-1.5"
                                        onClick={() => handleResolve(dispute.id, "REFUND_TO_CLIENT")}
                                        disabled={resolveMutation.isPending}
                                    >
                                        <XCircle className="w-3.5 h-3.5" /> Refund to Client
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
