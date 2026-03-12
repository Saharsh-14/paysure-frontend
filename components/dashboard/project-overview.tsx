"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
    { id: 1, name: "E-commerce Redesign", action: "In Progress", iconBg: "bg-indigo-500" },
    { id: 2, name: "Mobile App MVP", action: "Pending Approval", iconBg: "bg-blue-500" },
    { id: 3, name: "Brand Guidelines", action: "Completed", iconBg: "bg-emerald-500" },
    { id: 4, name: "API Integration", action: "In Progress", iconBg: "bg-teal-500" },
];

export function ProjectOverview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((project) => (
                <div
                    key={project.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full ${project.iconBg} flex items-center justify-center text-white font-bold text-xs`}>
                            {project.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{project.name}</p>
                            <p className="text-xs text-white/50">{project.action}</p>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
            ))}
        </div>
    );
}
