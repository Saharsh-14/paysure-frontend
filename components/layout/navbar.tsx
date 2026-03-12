"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Wallet", href: "/wallet" },
    { name: "Projects", href: "/projects" },
    { name: "Transactions", href: "/transactions" },
    { name: "Disputes", href: "/disputes" },
];

export function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center flex-wrap px-4 md:px-8">
                <div className="mr-8 flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            PaySure
                        </span>
                    </Link>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-white/80",
                                pathname === item.href
                                    ? "text-white bg-white/10 px-4 py-2 rounded-full"
                                    : "text-white/60"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                        <UserButton afterSignOutUrl="/" appearance={{
                            elements: { userButtonAvatarBox: "h-8 w-8 rounded-full" }
                        }} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
