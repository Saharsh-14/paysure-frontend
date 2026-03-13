"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useMilestones, useSubmitMilestone, useApproveMilestone } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { Circle, CheckCircle2, Clock, Send, AlertTriangle, DollarSign, ArrowRight, Lock } from "lucide-react";
import type { BadgeVariant } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

const statusConfig: Record<string, { variant: BadgeVariant; label: string; icon: React.ElementType }> = {
    pending: { variant: "pending", label: "Pending", icon: Circle },
    in_progress: { variant: "info", label: "In Progress", icon: Clock },
    submitted: { variant: "warning", label: "Submitted", icon: Send },
    approved: { variant: "success", label: "Approved", icon: CheckCircle2 },
    paid: { variant: "completed", label: "Paid", icon: DollarSign },
    disputed: { variant: "disputed", label: "Disputed", icon: AlertTriangle },
    funded: { variant: "info", label: "Funded", icon: Lock },
};

export default function MilestonesPage() {
    const { user } = useUser();
    const { data: milestones, isLoading } = useMilestones();
    const submitMutation = useSubmitMilestone();
    const approveMutation = useApproveMilestone();
    
    // Default to freelancer if not set, match backend roles
    const role = (user?.publicMetadata?.role as string) || "Freelancer";

    const handleApprove = (id: number) => approveMutation.mutate(id);
    const handleSubmit = (id: number) => submitMutation.mutate(id);

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Milestones</h1>
                <p className="text-sm text-muted-foreground mt-1">Track milestone progress across all projects</p>
            </div>

            {/* Status Flow */}
            <div className="hidden md:flex items-center gap-2 mb-6 p-4 rounded-2xl bg-muted/50 border border-border">
                {["Pending", "Funded", "Submitted", "Approved", "Paid"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                            {step}
                        </div>
                        {i < 4 && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />}
                    </div>
                ))}
            </div>
            
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />)}
                </div>
            ) : (
                <div className="space-y-3">
                    {(milestones || []).map((milestone: any) => {
                        const config = statusConfig[milestone.status] || statusConfig.pending;
                        const StatusIcon = config.icon;
                        
                        // Backend roles are capitalized: "Client", "Freelancer"
                        const canApprove = role === "Client" && milestone.status === "submitted";
                        const canSubmit = role === "Freelancer" && (milestone.status === "funded" || milestone.status === "in_progress");

                        return (
                            <div key={milestone.id} className="rounded-xl border border-border bg-card p-5 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-start gap-3.5">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                            milestone.status === "paid" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                                            milestone.status === "disputed" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
                                            milestone.status === "approved" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                                            milestone.status === "submitted" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                                            milestone.status === "funded" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                                            "bg-slate-500/10 text-slate-600 dark:text-slate-400"
                                        }`}><StatusIcon className="w-[18px] h-[18px]" /></div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{milestone.title}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">{milestone.projectName}</p>
                                            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{milestone.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                                        <div className="flex flex-col items-end gap-1">
                                            <Badge variant={config.variant} dot>{config.label}</Badge>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-foreground">{formatCurrency(milestone.amount)}</p>
                                                <p className="text-[10px] text-muted-foreground">Due: {milestone.dueDate}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            {canApprove && (
                                                <Button size="sm" onClick={() => handleApprove(milestone.id)} disabled={approveMutation.isPending}>
                                                    Approve & Release
                                                </Button>
                                            )}
                                            {canSubmit && (
                                                <Button size="sm" variant="outline" onClick={() => handleSubmit(milestone.id)} disabled={submitMutation.isPending}>
                                                    Mark as Complete
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </DashboardLayout>
    );
}
