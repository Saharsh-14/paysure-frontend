"use client";

import { useDisputes } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowUpRight, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { BadgeVariant } from "@/components/ui/badge";

const statusConfig: Record<string, { variant: BadgeVariant; label: string }> = {
    open: { variant: "danger", label: "Open" },
    under_review: { variant: "warning", label: "Under Review" },
    resolved: { variant: "success", label: "Resolved" },
    escalated: { variant: "danger", label: "Escalated" },
};

export function ActiveDisputesCard() {
    const { data: allDisputes, isLoading } = useDisputes();

    if (isLoading) {
        return (
            <div className="rounded-2xl border border-border bg-card p-5 animate-pulse">
                <div className="h-5 w-32 bg-muted rounded mb-4" />
                <div className="space-y-3">{[1, 2].map(i => <div key={i} className="h-20 bg-muted rounded-xl" />)}</div>
            </div>
        );
    }

    const disputes = allDisputes || [];
    const activeDisputes = disputes.filter((d: any) => d.status !== "resolved");
    const resolvedCount = disputes.filter((d: any) => d.status === "resolved").length;

    return (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                        <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground text-sm">Active Disputes</h3>
                        <p className="text-xs text-muted-foreground">{activeDisputes.length} active · {resolvedCount} resolved</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-3">
                {activeDisputes.length > 0 ? (
                    activeDisputes.slice(0, 3).map((dispute: any) => {
                        const config = statusConfig[dispute.status] || statusConfig.open;
                        return (
                            <div key={dispute.id} className="rounded-xl bg-muted p-3.5 group hover:bg-muted/80 transition-colors cursor-pointer">
                                <div className="flex items-start justify-between mb-1.5">
                                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{dispute.projectName}</p>
                                    <Badge variant={config.variant} dot>{config.label}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-1">{dispute.reason}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] text-muted-foreground">{dispute.evidence} evidence files</span>
                                    <span className="text-muted-foreground/40">·</span>
                                    <span className="text-[10px] text-muted-foreground">{dispute.createdAt}</span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-6">
                        <FileWarning className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No active disputes</p>
                    </div>
                )}

                <Link href="/disputes">
                    <Button variant="outline" className="w-full rounded-xl border-border text-foreground hover:bg-muted font-medium h-9 text-sm mt-2">
                        Dispute Center <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
