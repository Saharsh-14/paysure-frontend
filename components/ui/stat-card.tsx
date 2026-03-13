"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon: LucideIcon;
    trend?: { value: string; positive: boolean };
    iconColor?: string;
    iconBg?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    iconColor = "text-primary",
    iconBg = "bg-primary/10",
    className,
}: StatCardProps) {
    return (
        <div className={cn(
            "rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
            className
        )}>
            <div className="flex items-start justify-between mb-3">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", iconBg)}>
                    <Icon className={cn("w-5 h-5", iconColor)} />
                </div>
                {trend && (
                    <span className={cn(
                        "text-xs font-semibold px-2 py-1 rounded-full",
                        trend.positive
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                    )}>
                        {trend.positive ? "↑" : "↓"} {trend.value}
                    </span>
                )}
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground tracking-tight animate-count-up">{value}</p>
            {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
        </div>
    );
}
