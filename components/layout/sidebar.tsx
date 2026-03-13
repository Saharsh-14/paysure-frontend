"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FolderKanban,
    Milestone,
    Wallet,
    ArrowLeftRight,
    Scale,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    Code2,
    Crown,
    Users,
} from "lucide-react";
import { useState, useEffect } from "react";

type UserRole = "Client" | "Freelancer" | "Admin";

function useRole(): UserRole {
    const { user, isLoaded } = useUser();
    if (!isLoaded) return "Freelancer"; // Fallback during load

    const rawRole = (user?.publicMetadata?.role as string) || "Freelancer";
    // Standardize to Capitalized (Client/Freelancer/Admin)
    const role = (rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase()) as UserRole;
    return role === "Admin" || role === "Client" || role === "Freelancer" ? role : "Freelancer";
}

const roleConfig: Record<UserRole, { label: string; icon: React.ElementType; color: string; bgColor: string }> = {
    Client: { label: "Client", icon: Briefcase, color: "text-blue-400", bgColor: "bg-blue-500/10 border-blue-500/20" },
    Freelancer: { label: "Freelancer", icon: Code2, color: "text-emerald-400", bgColor: "bg-emerald-500/10 border-emerald-500/20" },
    Admin: { label: "Admin", icon: Crown, color: "text-amber-400", bgColor: "bg-amber-500/10 border-amber-500/20" },
};

function getNavGroups(role: UserRole) {
    const groups = [
        {
            label: "Overview",
            items: [
                { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                { name: "My Partners", href: "/partners", icon: Users },
            ],
        },
    ];

    if (role === "Client") {
        // Client: focuses on posting projects and managing escrow
        groups.push({
            label: "Projects",
            items: [
                { name: "My Projects", href: "/projects", icon: FolderKanban },
            ],
        });
    } else {
        // Freelancer: focuses on assigned projects and milestones
        groups.push({
            label: "Projects",
            items: [
                { name: "Projects", href: "/projects", icon: FolderKanban },
                { name: "Milestones", href: "/milestones", icon: Milestone },
            ],
        });
    }

    // Wallet/Transactions for all roles
    groups.push({
        label: "Financials",
        items: [
            { name: "Wallet", href: "/wallet", icon: Wallet },
            { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
        ],
    });

    // Disputes for all, Admin only for admin role
    const supportItems: { name: string; href: string; icon: typeof LayoutDashboard }[] = [
        { name: "Disputes", href: "/disputes", icon: Scale },
    ];
    if (role === "Admin") {
        supportItems.push({ name: "Admin Panel", href: "/admin", icon: ShieldCheck });
    }
    groups.push({ label: "Support", items: supportItems });

    return groups;
}

export function Sidebar({ isOpen, setIsOpen }: { isOpen?: boolean; setIsOpen?: (open: boolean) => void }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const role = useRole();
    const navGroups = getNavGroups(role);
    const config = roleConfig[role];
    const RoleIcon = config.icon;

    // Close mobile sidebar on route change
    useEffect(() => {
        if (setIsOpen) setIsOpen(false);
    }, [pathname, setIsOpen]);

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen?.(false)}
            />

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 lg:sticky lg:flex flex-col border-r border-sidebar-border bg-sidebar-bg transition-all duration-300",
                    collapsed ? "w-[68px]" : "w-[240px]",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-sidebar-border flex-shrink-0">
                <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-9 h-9 flex-shrink-0">
                        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <defs>
                                <linearGradient id="sidebarShield" x1="6" y1="4" x2="38" y2="42" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#3b82f6" /><stop offset="0.45" stopColor="#2563eb" /><stop offset="1" stopColor="#1d4ed8" />
                                </linearGradient>
                            </defs>
                            <path d="M22 3 L39 11 L39 24 C39 33 31 39 22 42 C13 39 5 33 5 24 L5 11 Z" fill="url(#sidebarShield)" />
                            <text x="12" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="16" fill="white">P</text>
                            <path d="M24 18 L28 22 L34 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </div>
                    {!collapsed && (
                        <span className="text-lg font-bold tracking-tight text-foreground whitespace-nowrap">
                            PaySure
                        </span>
                    )}
                </Link>
            </div>

            {/* Role Badge */}
            <div className={cn("mx-3 mt-4 mb-2 flex items-center gap-2 rounded-xl border px-3 py-2", config.bgColor)}>
                <RoleIcon className={cn("w-4 h-4 flex-shrink-0", config.color)} />
                {!collapsed && (
                    <span className={cn("text-xs font-semibold", config.color)}>{config.label}</span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-6">
                {navGroups.map((group) => (
                    <div key={group.label}>
                        {!collapsed && (
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 px-3">
                                {group.label}
                            </p>
                        )}
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                                            isActive
                                                ? "bg-primary/10 text-primary shadow-sm"
                                                : "text-sidebar-text hover:bg-sidebar-hover hover:text-foreground"
                                        )}
                                        title={collapsed ? item.name : undefined}
                                    >
                                        <item.icon className={cn(
                                            "w-[18px] h-[18px] flex-shrink-0 transition-colors",
                                            isActive ? "text-primary" : "text-sidebar-text group-hover:text-foreground"
                                        )} />
                                        {!collapsed && <span>{item.name}</span>}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Collapse button - Hidden on mobile */}
            <div className="border-t border-sidebar-border p-3 flex-shrink-0 hidden lg:block">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-hover hover:text-foreground transition-colors"
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <>
                            <ChevronLeft className="w-4 h-4" />
                            <span>Collapse</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    </>
    );
}
