"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    variant?: "default" | "success" | "warning" | "danger" | "gradient";
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
}

const variantStyles = {
    default: "bg-primary",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    gradient: "bg-gradient-to-r from-primary to-secondary",
};

const sizeStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
};

export function Progress({
    value,
    max = 100,
    variant = "default",
    size = "md",
    showLabel = false,
    className,
    ...props
}: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className={cn("w-full", className)} {...props}>
            {showLabel && (
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Progress</span>
                    <span className="text-xs font-bold text-foreground">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={cn("w-full rounded-full bg-muted overflow-hidden", sizeStyles[size])}>
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-500 ease-out",
                        variantStyles[variant]
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
