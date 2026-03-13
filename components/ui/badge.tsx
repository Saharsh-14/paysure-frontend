import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
    default: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-muted text-muted-foreground border-border",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    danger: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    locked: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    released: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    pending: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    disputed: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    completed: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
};

export type BadgeVariant = keyof typeof badgeVariants;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    dot?: boolean;
}

export function Badge({ className, variant = "default", dot = false, children, ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
                badgeVariants[variant],
                className
            )}
            {...props}
        >
            {dot && (
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
            )}
            {children}
        </span>
    );
}
