"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Check, UserPlus, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ─── Shared Navigation for Landing Sub-Pages ─── */
function LandingNav() {
    const router = useRouter();

    const handleRoleSignup = (role: "client" | "freelancer") => {
        localStorage.setItem("paysure_role", role);
        router.push("/signup");
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/60">
            <div className="container mx-auto flex h-16 items-center px-6 lg:px-12 justify-between max-w-7xl">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-9 h-9">
                        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <defs>
                                <linearGradient id="navShield" x1="6" y1="4" x2="38" y2="42" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#3b82f6" /><stop offset="0.45" stopColor="#2563eb" /><stop offset="1" stopColor="#1d4ed8" />
                                </linearGradient>
                            </defs>
                            <path d="M22 3 L39 11 L39 24 C39 33 31 39 22 42 C13 39 5 33 5 24 L5 11 Z" fill="url(#navShield)" />
                            <text x="12" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="16" fill="white">P</text>
                            <path d="M24 18 L28 22 L34 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        <span className="text-primary">Pay</span>
                        <span className="text-foreground">Sure</span>
                    </span>
                </Link>

                <div className="hidden lg:flex items-center gap-8">
                    {[{ name: "Product", href: "/product" }, { name: "Features", href: "/features" }, { name: "Security", href: "/security" }, { name: "Pricing", href: "/pricing" }].map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">{item.name}</Link>
                    ))}
                    <Link href="/resources" className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        Resources <ChevronDown className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <SignedOut>
                        <Link href="/login">
                            <Button variant="ghost" className="text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-transparent px-4 h-9">Sign In</Button>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-full bg-primary hover:bg-primary/90 text-white border-0 shadow-md shadow-primary/25 px-5 font-semibold h-9 text-sm gap-1.5">
                                    Get Started <ChevronDown className="w-3.5 h-3.5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px] p-2 rounded-xl border-gray-100 shadow-xl">
                                <DropdownMenuItem onClick={() => handleRoleSignup("client")} className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg">
                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                    <div className="flex flex-col"><span className="text-[13px] font-bold">I want to Hire</span><span className="text-[10px] text-gray-400">Post projects</span></div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleRoleSignup("freelancer")} className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg mt-1">
                                    <UserPlus className="w-4 h-4 text-gray-400" />
                                    <div className="flex flex-col"><span className="text-[13px] font-bold">I want to Work</span><span className="text-[10px] text-gray-400">Earn money</span></div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard">
                            <Button className="rounded-full bg-primary hover:bg-primary/90 text-white border-0 shadow-md shadow-primary/25 px-5 font-semibold h-9 text-sm gap-1.5">
                                Dashboard <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </Link>
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}

/* ─── Shared Footer ─── */
function LandingFooter() {
    return (
        <footer className="bg-gray-950 text-gray-400 py-12">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8">
                            <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path d="M22 3 L39 11 L39 24 C39 33 31 39 22 42 C13 39 5 33 5 24 L5 11 Z" fill="#3b82f6" />
                                <text x="12" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="16" fill="white">P</text>
                                <path d="M24 18 L28 22 L34 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold text-white">PaySure</span>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm">
                        {["Product", "Features", "Security", "Pricing", "Resources"].map((item) => (
                            <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</Link>
                        ))}
                    </div>
                </div>
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs">© PaySure 2026. All rights reserved.</p>
                    <div className="flex gap-6 text-xs">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ─── CTA Section ─── */
function LandingCTA() {
    const router = useRouter();
    const handleRoleSignup = (role: "client" | "freelancer") => {
        localStorage.setItem("paysure_role", role);
        router.push("/signup");
    };

    return (
        <section className="py-24 bg-gradient-to-br from-gray-900 to-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
            <div className="relative max-w-3xl mx-auto px-6 text-center">
                <h2 className="text-[32px] md:text-[42px] font-extrabold tracking-tight mb-4">Start Secure Payments Today</h2>
                <p className="text-gray-400 text-base mb-10 max-w-md mx-auto">Join freelancers and businesses already using PaySure.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button onClick={() => handleRoleSignup("client")} className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-white border-0 shadow-lg h-[52px] px-8 text-[15px] font-bold gap-2.5">
                        Hire Top Talent <Briefcase className="w-5 h-5" />
                    </Button>
                    <Button onClick={() => handleRoleSignup("freelancer")} className="w-full sm:w-auto rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 h-[52px] px-8 text-[15px] font-bold gap-2.5">
                        Work & Get Paid <UserPlus className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

/* ─── Page Wrapper ─── */
export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col">
            <LandingNav />
            <main className="flex-1">{children}</main>
            <LandingCTA />
            <LandingFooter />
        </div>
    );
}
