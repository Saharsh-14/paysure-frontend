"use client";

import { useProjects } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { BadgeVariant } from "@/components/ui/badge";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

const statusConfig: Record<string, { variant: BadgeVariant; label: string }> = {
    active: { variant: "info", label: "Active" },
    completed: { variant: "completed", label: "Completed" },
    disputed: { variant: "disputed", label: "Disputed" },
    pending: { variant: "pending", label: "Pending" },
};

interface ProjectOverviewProps {
    limit?: number;
}

export function ProjectOverview({ limit }: ProjectOverviewProps) {
    const { data: allProjects, isLoading } = useProjects();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />)}
            </div>
        );
    }

    const projects = limit ? (allProjects || []).slice(0, limit) : (allProjects || []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((project: any) => {
                const progress = project.milestones > 0 ? (project.completedMilestones / project.milestones) * 100 : 0;
                const config = statusConfig[project.status] || statusConfig.active;
                return (
                    <div
                        key={project.id}
                        className="rounded-xl border border-border bg-card p-4 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${
                                    project.status === "active" ? "bg-gradient-to-br from-blue-500 to-indigo-600" :
                                    project.status === "completed" ? "bg-gradient-to-br from-emerald-500 to-green-600" :
                                    project.status === "disputed" ? "bg-gradient-to-br from-red-500 to-rose-600" :
                                    "bg-gradient-to-br from-gray-400 to-gray-500"
                                }`}>
                                    {project.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{project.name}</p>
                                    <p className="text-xs text-muted-foreground">{project.client}</p>
                                </div>
                            </div>
                            <Badge variant={config.variant} dot>{config.label}</Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Milestones: {project.completedMilestones}/{project.milestones}</span>
                                <span className="font-semibold text-foreground">{formatCurrency(project.totalEscrow)}</span>
                            </div>
                            <Progress
                                value={progress}
                                variant={project.status === "completed" ? "success" : project.status === "disputed" ? "danger" : "gradient"}
                                size="sm"
                            />
                        </div>
                    </div>
                );
            })}
            {projects.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8 col-span-2">No projects yet</p>
            )}
        </div>
    );
}
