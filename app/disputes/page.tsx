"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useDisputes, useRaiseDispute, useProjects } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { BadgeVariant } from "@/components/ui/badge";

const statusConfig: Record<string, { variant: BadgeVariant; label: string; icon: React.ElementType }> = {
    open: { variant: "danger", label: "Open", icon: AlertCircle },
    under_review: { variant: "warning", label: "Under Review", icon: Clock },
    resolved: { variant: "success", label: "Resolved", icon: CheckCircle2 },
    escalated: { variant: "danger", label: "Escalated", icon: AlertTriangle },
};

export default function DisputesPage() {
    const { data: disputes, isLoading } = useDisputes();
    const { data: projects } = useProjects();
    const raiseDispute = useRaiseDispute();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ projectId: "", milestoneName: "", raisedBy: "", reason: "" });

    const handleRaise = async () => {
        if (!form.projectId || !form.reason) return;
        const project = (projects || []).find((p: any) => p.id === form.projectId);
        await raiseDispute.mutateAsync({
            projectId: form.projectId,
            projectName: project?.name || "Unknown",
            milestoneName: form.milestoneName,
            raisedBy: form.raisedBy,
            reason: form.reason,
        });
        setForm({ projectId: "", milestoneName: "", raisedBy: "", reason: "" });
        setShowForm(false);
    };

    const allDisputes = disputes || [];
    const openCount = allDisputes.filter((d: any) => d.status === "open" || d.status === "escalated").length;
    const reviewCount = allDisputes.filter((d: any) => d.status === "under_review").length;
    const resolvedCount = allDisputes.filter((d: any) => d.status === "resolved").length;

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Disputes</h1>
                    <p className="text-sm text-muted-foreground mt-1">{allDisputes.length} total disputes</p>
                </div>
                <Button className="rounded-xl bg-destructive hover:bg-destructive/90 text-white font-semibold h-10 px-5 text-sm" onClick={() => setShowForm(!showForm)}>
                    <AlertCircle className="w-4 h-4 mr-2" /> Raise Dispute
                </Button>
            </div>

            {/* Raise Dispute Form */}
            {showForm && (
                <div className="rounded-2xl border border-border bg-card p-6 mb-6 space-y-4">
                    <h3 className="text-base font-semibold text-foreground">Raise a New Dispute</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <select value={form.projectId} onChange={(e) => setForm({...form, projectId: e.target.value})} className="rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20">
                            <option value="">Select Project *</option>
                            {(projects || []).map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <input placeholder="Milestone Name" value={form.milestoneName} onChange={(e) => setForm({...form, milestoneName: e.target.value})} className="rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                        <input placeholder="Raised By" value={form.raisedBy} onChange={(e) => setForm({...form, raisedBy: e.target.value})} className="rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <textarea placeholder="Reason for dispute *" value={form.reason} onChange={(e) => setForm({...form, reason: e.target.value})} rows={3} className="w-full rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                    <div className="flex gap-3">
                        <Button className="rounded-xl bg-destructive hover:bg-destructive/90 text-white font-semibold h-10 px-6 text-sm" onClick={handleRaise} disabled={raiseDispute.isPending}>
                            {raiseDispute.isPending ? "Submitting..." : "Submit Dispute"}
                        </Button>
                        <Button variant="outline" className="rounded-xl border-border text-foreground h-10 px-4 text-sm" onClick={() => setShowForm(false)}>Cancel</Button>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20"><span className="w-2 h-2 rounded-full bg-red-500" /><span className="text-sm font-semibold text-red-600 dark:text-red-400">{openCount} Open</span></div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20"><span className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{reviewCount} Under Review</span></div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{resolvedCount} Resolved</span></div>
            </div>

            {isLoading ? (
                <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />)}</div>
            ) : (
                <div className="space-y-3">
                    {allDisputes.map((dispute: any) => {
                        const config = statusConfig[dispute.status] || statusConfig.open;
                        const StatusIcon = config.icon;
                        return (
                            <div key={dispute.id} className="rounded-xl border border-border bg-card p-5 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                    <div className="flex items-start gap-3.5">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                            dispute.status === "resolved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                                            dispute.status === "under_review" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                                            "bg-red-500/10 text-red-600 dark:text-red-400"
                                        }`}><StatusIcon className="w-[18px] h-[18px]" /></div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{dispute.projectName} — {dispute.milestoneName}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">Raised by: {dispute.raisedBy}</p>
                                            <p className="text-sm text-muted-foreground mt-2">{dispute.reason}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground"><FileText className="w-3 h-3" /> {dispute.evidence} evidence files</span>
                                                <span className="text-muted-foreground/40">·</span>
                                                <span className="text-xs text-muted-foreground">{dispute.createdAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant={config.variant} dot>{config.label}</Badge>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </DashboardLayout>
    );
}
