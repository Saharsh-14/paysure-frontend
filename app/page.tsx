"use client";

import { useEffect, useState } from "react";
import {
    ArrowRight,
    Shield,
    Wallet,
    CheckCircle2,
    ChevronDown,
    Check,
    FolderKanban,
    Milestone,
    Scale,
    Zap,
    Lock,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, Briefcase } from "lucide-react";

/* ─── Main Landing Page ──────────────────────────────────────── */
export default function LandingPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const handleRoleSignup = (role: "Client" | "Freelancer") => {
        localStorage.setItem("paysure_role", role);
        router.push("/signup");
    };

    return (
        <div className="min-h-screen bg-white text-slate-900">

            {/* ━━━ Navigation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/60">
                <div className="container mx-auto flex h-16 items-center px-6 lg:px-12 justify-between max-w-7xl">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9">
                            <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <defs>
                                    <linearGradient id="heroShield" x1="6" y1="4" x2="38" y2="42" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#3b82f6" /><stop offset="0.45" stopColor="#2563eb" /><stop offset="1" stopColor="#1d4ed8" />
                                    </linearGradient>
                                </defs>
                                <path d="M22 3 L39 11 L39 24 C39 33 31 39 22 42 C13 39 5 33 5 24 L5 11 Z" fill="url(#heroShield)" />
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
                                <Button variant="ghost" className="text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-transparent px-4 h-9">
                                    Sign In
                                </Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full bg-primary hover:bg-primary/90 text-white border-0 shadow-md shadow-primary/25 px-5 font-semibold h-9 text-sm gap-1.5 transition-all duration-300">
                                        Get Started <ChevronDown className="w-3.5 h-3.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[180px] p-2 rounded-xl border-gray-100 shadow-xl">
                                    <DropdownMenuItem onClick={() => handleRoleSignup("Client")} className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg">
                                        <Briefcase className="w-4 h-4 text-gray-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-bold">I want to Hire</span>
                                            <span className="text-[10px] text-gray-400 font-medium">Post projects</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRoleSignup("Freelancer")} className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg mt-1">
                                        <UserPlus className="w-4 h-4 text-gray-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-bold">I want to Work</span>
                                            <span className="text-[10px] text-gray-400 font-medium">Earn money</span>
                                        </div>
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

            {/* ━━━ Hero Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                            <Shield className="w-4 h-4" /> Milestone-Based Escrow Platform
                        </div>

                        <h1 className="text-[42px] md:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] tracking-tight mb-6">
                            Secure Payments
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                                Built on Trust
                            </span>
                        </h1>

                        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-8">
                            PaySure holds payments in escrow until milestones are completed and approved.
                            Freelancers get paid fairly. Clients get quality work. Everyone wins.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                onClick={() => handleRoleSignup("Client")}
                                className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/30 h-[52px] px-8 text-[15px] font-bold gap-2.5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Hire Top Talent <Briefcase className="w-5 h-5 opacity-90" />
                            </Button>
                            <Button
                                onClick={() => handleRoleSignup("Freelancer")}
                                className="w-full sm:w-auto rounded-full bg-white text-gray-900 border-2 border-gray-200 hover:border-primary hover:bg-gray-50 shadow-sm h-[52px] px-8 text-[15px] font-bold gap-2.5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                            >
                                Work & Get Paid <UserPlus className="w-5 h-5 text-primary" />
                            </Button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400"
                        >
                            {["No hidden fees", "Instant releases", "Dispute protection"].map((item) => (
                                <span key={item} className="flex items-center gap-1.5">
                                    <Check className="w-4 h-4 text-emerald-500" /> {item}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ━━━ How It Works ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-[32px] md:text-[40px] font-extrabold tracking-tight mb-4">How PaySure Works</h2>
                        <p className="text-gray-500 text-base max-w-xl mx-auto">A secure 4-step workflow that protects both parties</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-[40px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 z-0" />

                        {[
                            { icon: FolderKanban, title: "Create Project", desc: "Define project scope and payment milestones", color: "from-blue-500 to-indigo-600", step: 1 },
                            { icon: Lock, title: "Deposit Escrow", desc: "Client securely deposits funds into escrow", color: "from-amber-500 to-orange-500", step: 2 },
                            { icon: CheckCircle2, title: "Complete Work", desc: "Freelancer completes milestones and submits", color: "from-emerald-500 to-green-600", step: 3 },
                            { icon: Wallet, title: "Release Payment", desc: "Approved work triggers instant payment release", color: "from-violet-500 to-purple-600", step: 4 },
                        ].map((item) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: item.step * 0.1 }}
                                className="relative z-10 flex flex-col items-center text-center"
                            >
                                <div className={`w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg mb-5 relative`}>
                                    <item.icon className="w-7 h-7" />
                                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-700 shadow-sm">{item.step}</div>
                                </div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-[220px]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ Features Grid ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-[32px] md:text-[40px] font-extrabold tracking-tight mb-4">Why Choose PaySure?</h2>
                        <p className="text-gray-500 text-base max-w-xl mx-auto">Built specifically for the freelance economy</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Shield, title: "Secure Escrow", desc: "Funds are locked until both parties agree. No unauthorized access.", color: "bg-blue-500/10 text-blue-600" },
                            { icon: Milestone, title: "Milestone Tracking", desc: "Break projects into milestones. Pay only for completed work.", color: "bg-emerald-500/10 text-emerald-600" },
                            { icon: Scale, title: "Fair Disputes", desc: "Admin-mediated dispute resolution with evidence tracking.", color: "bg-amber-500/10 text-amber-600" },
                            { icon: Eye, title: "Full Transparency", desc: "Both parties see every payment movement in real time.", color: "bg-violet-500/10 text-violet-600" },
                            { icon: Zap, title: "Instant Releases", desc: "Approved milestones trigger payments instantly. No delays.", color: "bg-cyan-500/10 text-cyan-600" },
                            { icon: Lock, title: "Bank-Grade Security", desc: "Encrypted transactions with enterprise-level protection.", color: "bg-rose-500/10 text-rose-600" },
                        ].map((feature) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ Trust Stats ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { stat: "$2.4M+", label: "Total Escrowed" },
                            { stat: "1,200+", label: "Projects Secured" },
                            { stat: "99.8%", label: "Dispute Resolution" },
                            { stat: "24/7", label: "Platform Monitoring" },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="text-[36px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{item.stat}</div>
                                <p className="text-gray-500 text-sm font-medium mt-1">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ CTA Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="py-24 bg-gradient-to-br from-gray-900 to-slate-800 text-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
                <div className="relative max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-[32px] md:text-[42px] font-extrabold tracking-tight mb-4">Start Secure Payments Today</h2>
                    <p className="text-gray-400 text-base mb-10 max-w-md mx-auto">Join freelancers and businesses already using PaySure for trusted milestone-based payments.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            onClick={() => handleRoleSignup("Client")}
                            className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/30 h-[52px] px-8 text-[15px] font-bold gap-2.5 transition-all"
                        >
                            Hire Top Talent <Briefcase className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={() => handleRoleSignup("Freelancer")}
                            className="w-full sm:w-auto rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 h-[52px] px-8 text-[15px] font-bold gap-2.5 transition-all"
                        >
                            Work & Get Paid <UserPlus className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* ━━━ Footer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
        </div>
    );
}
