"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { ActiveEscrowCard } from "@/components/dashboard/wallet-card";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { ProjectOverview } from "@/components/dashboard/project-overview";
import { ActiveDisputesCard } from "@/components/dashboard/disputes-card";
import { StatCard } from "@/components/ui/stat-card";
import { useWalletBalance, useProjects, useMilestones } from "@/lib/hooks";
import { useUser } from "@clerk/nextjs";
import { Lock, Wallet, FolderKanban, Milestone, ArrowRight, Briefcase, Code2, Plus, ArrowDownToLine, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function DashboardPage() {
    const { user } = useUser();
    const role = (user?.publicMetadata?.role as string) || "freelancer";
    const firstName = user?.firstName || "there";

    const { data: wallet } = useWalletBalance();
    const { data: projects } = useProjects();
    const { data: milestones } = useMilestones();

    const activeProjects = (projects || []).filter((p: any) => p.status === "active").length;
    const pendingMilestones = (milestones || []).filter((m: any) =>
        m.status === "pending" || m.status === "in_progress" || m.status === "submitted"
    ).length;

    return (
        <DashboardLayout>
            {/* Welcome */}
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        role === "client" ? "bg-blue-500/10" : "bg-emerald-500/10"
                    }`}>
                        {role === "client" ? (
                            <Briefcase className="w-5 h-5 text-blue-500" />
                        ) : (
                            <Code2 className="w-5 h-5 text-emerald-500" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground tracking-tight">
                            Welcome back, {firstName}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            {role === "client"
                                ? "Manage your projects and escrow payments"
                                : "Track your milestones and earnings"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Role-specific stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {role === "client" ? (
                    // CLIENT stats — focuses on spending, escrow, projects
                    <>
                        <StatCard
                            title="Total Escrowed"
                            value={wallet ? formatCurrency(wallet.escrowLocked) : "—"}
                            icon={Lock}
                            iconBg="bg-amber-500/10"
                            iconColor="text-amber-600 dark:text-amber-400"
                            subtitle="Funds locked in escrow"
                        />
                        <StatCard
                            title="Available Balance"
                            value={wallet ? formatCurrency(wallet.availableBalance) : "—"}
                            icon={Wallet}
                            iconBg="bg-emerald-500/10"
                            iconColor="text-emerald-600 dark:text-emerald-400"
                        />
                        <StatCard
                            title="Active Projects"
                            value={String(activeProjects)}
                            icon={FolderKanban}
                            iconBg="bg-blue-500/10"
                            iconColor="text-blue-600 dark:text-blue-400"
                            trend={{ value: "2 new", positive: true }}
                        />
                        <StatCard
                            title="Pending Milestones"
                            value={String(pendingMilestones)}
                            icon={Milestone}
                            iconBg="bg-indigo-500/10"
                            iconColor="text-indigo-600 dark:text-indigo-400"
                            subtitle="Awaiting your approval"
                        />
                    </>
                ) : (
                    // FREELANCER stats — focuses on earnings, balance, work
                    <>
                        <StatCard
                            title="Total Earnings"
                            value={wallet ? formatCurrency(wallet.totalEarnings) : "—"}
                            icon={Wallet}
                            iconBg="bg-emerald-500/10"
                            iconColor="text-emerald-600 dark:text-emerald-400"
                            trend={{ value: "24.3%", positive: true }}
                        />
                        <StatCard
                            title="Available to Withdraw"
                            value={wallet ? formatCurrency(wallet.availableBalance) : "—"}
                            icon={Wallet}
                            iconBg="bg-blue-500/10"
                            iconColor="text-blue-600 dark:text-blue-400"
                        />
                        <StatCard
                            title="Active Projects"
                            value={String(activeProjects)}
                            icon={FolderKanban}
                            iconBg="bg-indigo-500/10"
                            iconColor="text-indigo-600 dark:text-indigo-400"
                        />
                        <StatCard
                            title="Pending Milestones"
                            value={String(pendingMilestones)}
                            icon={Milestone}
                            iconBg="bg-amber-500/10"
                            iconColor="text-amber-600 dark:text-amber-400"
                            subtitle="Awaiting submission"
                        />
                    </>
                )}
            </div>

            {/* Quick Actions — role-specific */}
            <div className="flex flex-wrap gap-3 mb-6">
                {role === "client" ? (
                    <>
                        <Link href="/projects">
                            <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold h-10 px-5 text-sm shadow-md shadow-primary/20">
                                <Plus className="w-4 h-4 mr-2" /> New Project
                            </Button>
                        </Link>
                        <Link href="/wallet">
                            <Button variant="outline" className="rounded-xl border-border text-foreground hover:bg-muted font-semibold h-10 px-5 text-sm">
                                <ArrowDownToLine className="w-4 h-4 mr-2" /> Fund Escrow
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/milestones">
                            <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-10 px-5 text-sm shadow-md shadow-emerald-500/20">
                                <Milestone className="w-4 h-4 mr-2" /> Submit Milestone
                            </Button>
                        </Link>
                        <Link href="/disputes">
                            <Button variant="outline" className="rounded-xl border-border text-foreground hover:bg-muted font-semibold h-10 px-5 text-sm">
                                <AlertCircle className="w-4 h-4 mr-2" /> Raise Dispute
                            </Button>
                        </Link>
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <BalanceCard />

                    {/* Recent Transactions */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-semibold text-foreground">Recent Transactions</h2>
                            <Link href="/transactions" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                                View All <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <TransactionList limit={5} />
                    </div>

                    {/* Active Projects */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-semibold text-foreground">
                                {role === "client" ? "Your Projects" : "Assigned Projects"}
                            </h2>
                            <Link href="/projects" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                                View All <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <ProjectOverview limit={4} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 lg:sticky lg:top-24 h-max">
                    <ActiveEscrowCard />
                    <ActiveDisputesCard />
                </div>
            </div>
        </DashboardLayout>
    );
}
