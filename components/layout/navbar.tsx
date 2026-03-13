"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Search, Briefcase, Code2, Crown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type UserRole = "Client" | "Freelancer" | "Admin";

const roleConfig: Record<UserRole, { label: string; icon: typeof Briefcase; color: string; bgColor: string }> = {
    Client: { label: "Client", icon: Briefcase, color: "text-blue-400", bgColor: "bg-blue-500/10 border-blue-500/20" },
    Freelancer: { label: "Freelancer", icon: Code2, color: "text-emerald-400", bgColor: "bg-emerald-500/10 border-emerald-500/20" },
    Admin: { label: "Admin", icon: Crown, color: "text-amber-400", bgColor: "bg-amber-500/10 border-amber-500/20" },
};

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
    const { theme, setTheme } = useTheme();
    const { user } = useUser();
    const rawRole = (user?.publicMetadata?.role as string) || "Freelancer";
    const role = (rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase()) as UserRole;
    const config = roleConfig[role];
    const RoleIcon = config.icon;

    return (
        <nav className="sticky top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-md flex-shrink-0">
            <div className="flex h-full items-center justify-between px-4 md:px-6 lg:px-8 gap-4">
                {/* Mobile Menu Button */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden rounded-xl h-10 w-10 flex-shrink-0"
                    onClick={onMenuClick}
                >
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-muted rounded-xl px-3.5 py-2 w-[320px] transition-colors focus-within:ring-2 focus-within:ring-primary/20">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search projects, transactions..."
                        className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                    />
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3 ml-auto">
                    {/* Role Badge */}
                    <div className={`hidden sm:flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 ${config.bgColor}`}>
                        <RoleIcon className={`w-3.5 h-3.5 ${config.color}`} />
                        <span className={`text-[11px] font-semibold ${config.color}`}>{config.label}</span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted relative transition-colors"
                    >
                        <Bell className="h-[18px] w-[18px]" />
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                    </Button>

                    <div className="w-px h-8 bg-border mx-1" />

                    <div className="flex items-center gap-3">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "h-9 w-9 rounded-xl",
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
