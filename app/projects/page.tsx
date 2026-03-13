"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useProjects, useCreateProject } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

export default function ProjectsPage() {
    const { data: projects, isLoading } = useProjects();
    const createProject = useCreateProject();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", client: "", freelancer: "", totalEscrow: "", milestones: "" });
    const [search, setSearch] = useState("");

    const handleCreate = async () => {
        if (!form.name) return;
        await createProject.mutateAsync({
            name: form.name,
            client: form.client,
            freelancer: form.freelancer,
            totalEscrow: parseFloat(form.totalEscrow) || 0,
            milestones: parseInt(form.milestones) || 1,
        });
        setForm({ name: "", client: "", freelancer: "", totalEscrow: "", milestones: "" });
        setShowForm(false);
    };

    const filtered = (projects || []).filter((p: any) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.client.toLowerCase().includes(search.toLowerCase()) ||
        p.freelancer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Projects</h1>
                    <p className="text-sm text-muted-foreground mt-1">{(projects || []).length} total projects</p>
                </div>
                <Button
                    className="rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold h-10 px-5 text-sm shadow-md shadow-primary/20"
                    onClick={() => setShowForm(!showForm)}
                >
                    <Plus className="w-4 h-4 mr-2" /> New Project
                </Button>
            </div>

            {/* Create Project Form */}
            {showForm && (
                <div className="rounded-2xl border border-border bg-card p-6 mb-6 space-y-4">
                    <h3 className="text-base font-semibold text-foreground">Create New Project</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input placeholder="Project Name *" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                        <input placeholder="Client Name" value={form.client} onChange={(e) => setForm({...form, client: e.target.value})} className="rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                        <input placeholder="Freelancer Name" value={form.freelancer} onChange={(e) => setForm({...form, freelancer: e.target.value})} className="rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                        <input type="number" placeholder="Escrow Amount ($)" value={form.totalEscrow} onChange={(e) => setForm({...form, totalEscrow: e.target.value})} className="rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                        <input type="number" placeholder="Number of Milestones" value={form.milestones} onChange={(e) => setForm({...form, milestones: e.target.value})} className="rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="flex gap-3">
                        <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold h-10 px-6 text-sm" onClick={handleCreate} disabled={createProject.isPending}>
                            {createProject.isPending ? "Creating..." : "Create Project"}
                        </Button>
                        <Button variant="outline" className="rounded-xl border-border text-foreground h-10 px-4 text-sm" onClick={() => setShowForm(false)}>Cancel</Button>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-muted rounded-xl px-3.5 py-2 flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((project: any) => {
                        const progress = project.milestones > 0 ? (project.completedMilestones / project.milestones) * 100 : 0;
                        const config = statusConfig[project.status] || statusConfig.active;
                        return (
                            <div key={project.id} className="rounded-2xl border border-border bg-card p-5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                                            project.status === "active" ? "bg-gradient-to-br from-blue-500 to-indigo-600" :
                                            project.status === "completed" ? "bg-gradient-to-br from-emerald-500 to-green-600" :
                                            project.status === "disputed" ? "bg-gradient-to-br from-red-500 to-rose-600" :
                                            "bg-gradient-to-br from-gray-400 to-gray-500"
                                        }`}>{project.name.charAt(0)}</div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</p>
                                            <p className="text-xs text-muted-foreground">{project.client}</p>
                                        </div>
                                    </div>
                                    <Badge variant={config.variant} dot>{config.label}</Badge>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Freelancer</span><span className="font-medium text-foreground">{project.freelancer}</span></div>
                                    <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Escrow Amount</span><span className="font-bold text-foreground">{formatCurrency(project.totalEscrow)}</span></div>
                                    <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Released</span><span className="font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(project.releasedAmount)}</span></div>
                                    <div className="pt-2 border-t border-border">
                                        <div className="flex items-center justify-between text-xs mb-1.5"><span className="text-muted-foreground">Milestones</span><span className="font-semibold text-foreground">{project.completedMilestones}/{project.milestones}</span></div>
                                        <Progress value={progress} variant={project.status === "completed" ? "success" : project.status === "disputed" ? "danger" : "gradient"} size="sm" />
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
