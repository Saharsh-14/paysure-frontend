"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  FileText,
  Flag,
  Wallet,
  BarChart3,
  Scale,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, Briefcase } from "lucide-react";

/* ─── Ecosystem Node Component ───────────────────────────────── */
interface EcoNodeProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  delay?: number;
  image?: string;
}

function EcoNode({ icon, label, className = "", delay = 0, image }: EcoNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`absolute flex flex-col items-center gap-1 ${className}`}
    >
      <div className="relative bg-white rounded-2xl shadow-[0_6px_24px_-4px_rgba(0,0,0,0.08)] border border-gray-100/80 px-3 py-2.5 flex items-center gap-2 hover:shadow-[0_10px_32px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5">
        {image ? (
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
            <Image src={image} alt={label} width={36} height={36} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div className="flex-shrink-0">{icon}</div>
        )}
        <span className="text-[12px] font-semibold text-gray-700 whitespace-nowrap">{label}</span>
      </div>
    </motion.div>
  );
}

/* ─── Floating Particle ─────────────────────────────────────── */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full bg-gradient-to-r from-blue-300/40 to-cyan-300/40 blur-[1px]"
      style={style}
    />
  );
}

/* ─── Main Landing Page ──────────────────────────────────────── */
export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleRoleSignup = (role: 'client' | 'freelancer') => {
    localStorage.setItem("paysure_role", role);
    router.push("/signup");
  };

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-b from-[#eef5ff] via-[#f0f6ff] to-[#e8f4fd] text-slate-900 flex flex-col">

      {/* ━━━ Background Effects ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[5%] w-[45%] h-[45%] rounded-full bg-[#d4ebff]/60 blur-[120px]" />
        <div className="absolute top-[5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#e0f0ff]/50 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#d8ecfe]/70 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#e6f1fe]/60 blur-[100px]" />

        <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none" viewBox="0 0 1440 900" fill="none">
          <path d="M-200 650 C 200 800, 600 350, 1000 450 C 1400 550, 1600 250, 1700 200" stroke="url(#wave1)" strokeWidth="100" strokeLinecap="round" opacity="0.3" />
          <path d="M-100 750 C 300 550, 700 900, 1100 650 C 1500 400, 1650 100, 1700 100" stroke="url(#wave2)" strokeWidth="70" strokeLinecap="round" opacity="0.25" />
          <defs>
            <linearGradient id="wave1" x1="0" y1="500" x2="1440" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.9" />
              <stop offset="1" stopColor="#e3f0ff" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="wave2" x1="0" y1="600" x2="1440" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.85" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {mounted && (
          <>
            <Particle style={{ top: "15%", left: "10%", width: 6, height: 6, animation: "particle-drift 10s ease-in-out infinite" }} />
            <Particle style={{ top: "25%", left: "80%", width: 5, height: 5, animation: "particle-drift 12s ease-in-out infinite 2s" }} />
            <Particle style={{ top: "60%", left: "15%", width: 4, height: 4, animation: "particle-drift 9s ease-in-out infinite 1s" }} />
            <Particle style={{ top: "70%", left: "75%", width: 7, height: 7, animation: "particle-drift 11s ease-in-out infinite 3s" }} />
            <Particle style={{ top: "40%", left: "50%", width: 5, height: 5, animation: "particle-drift 13s ease-in-out infinite 4s" }} />
            <Particle style={{ top: "10%", left: "60%", width: 6, height: 6, animation: "particle-drift 14s ease-in-out infinite 0.5s" }} />
          </>
        )}
      </div>

      {/* ━━━ Navigation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <nav className="relative z-50 w-full py-3 flex-shrink-0">
        <div className="container mx-auto flex h-12 items-center px-6 lg:px-12 justify-between max-w-7xl">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="logoShieldFill" x1="6" y1="4" x2="38" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="0.45" stopColor="#0ea5e9" />
                    <stop offset="1" stopColor="#0891b2" />
                  </linearGradient>
                  <linearGradient id="logoShieldHighlight" x1="12" y1="8" x2="32" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.35" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <filter id="logoGlow">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0ea5e9" floodOpacity="0.3" />
                  </filter>
                </defs>
                <path d="M22 3 L39 11 L39 24 C39 33 31 39 22 42 C13 39 5 33 5 24 L5 11 Z" fill="url(#logoShieldFill)" filter="url(#logoGlow)" />
                <path d="M22 5 L37 12.5 L37 18 C30 16 22 15 14 17 L7 13 Z" fill="url(#logoShieldHighlight)" />
                <text x="12" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="16" fill="white">P</text>
                <path d="M24 18 L28 22 L34 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="text-[22px] font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#0891b2]">Pay</span>
              <span className="text-[#1e293b]">Sure</span>
            </span>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {[{ name: "Product", href: "/product" }, { name: "Features", href: "/features" }, { name: "Security", href: "/security" }, { name: "Pricing", href: "/pricing" }].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/resources" className="flex items-center gap-1 text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Resources <ChevronDown className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-[14px] font-semibold text-gray-600 hover:text-gray-900 hover:bg-transparent px-4 h-9"
                >
                  Sign In
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] hover:from-[#0c93cf] hover:to-[#05a3bf] text-white border-0 shadow-[0_4px_14px_0_rgba(14,165,233,0.35)] px-5 font-semibold h-9 text-[13px] gap-1.5 transition-all duration-300">
                    Get Started <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px] p-2 rounded-xl border-gray-100 shadow-xl overflow-hidden">
                  <DropdownMenuItem 
                    onClick={() => handleRoleSignup('client')}
                    className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-600 group transition-colors"
                  >
                    <Briefcase className="w-4 h-4 text-gray-400 group-focus:text-blue-500" />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">I want to Hire</span>
                      <span className="text-[10px] text-gray-400 font-medium">Post projects</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleRoleSignup('freelancer')}
                    className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg focus:bg-cyan-50 focus:text-cyan-600 group transition-colors mt-1"
                  >
                    <UserPlus className="w-4 h-4 text-gray-400 group-focus:text-cyan-500" />
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
                <Button className="rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] hover:from-[#0c93cf] hover:to-[#05a3bf] text-white border-0 shadow-[0_4px_14px_0_rgba(14,165,233,0.35)] px-5 font-semibold h-9 text-[13px] gap-1.5">
                  Dashboard <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* ━━━ Hero Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Ecosystem Diagram — 3‑column flex for guaranteed centering ── */}
        <div className="relative w-full mx-auto mb-2">

          {/* SVG Connector Lines — overlay */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
            {/* Left nodes → Center (wider spread) */}
            <path d="M16 50 C 26 49, 38 48, 46 47" stroke="#c8d5e2" strokeWidth="0.15" strokeDasharray="0.8 0.5" opacity="0.7" />
            <path d="M18 12 C 26 18, 38 34, 46 43" stroke="#c8d5e2" strokeWidth="0.15" strokeDasharray="0.8 0.5" opacity="0.7" />
            <path d="M17 84 C 26 80, 38 62, 46 53" stroke="#c8d5e2" strokeWidth="0.15" strokeDasharray="0.8 0.5" opacity="0.7" />
            {/* Right nodes → Center (wider spread) */}
            <path d="M82 12 C 74 20, 62 36, 55 44" stroke="#c8d5e2" strokeWidth="0.15" strokeDasharray="0.8 0.5" opacity="0.7" />
            <path d="M88 36 C 78 38, 64 44, 55 47" stroke="#c8d5e2" strokeWidth="0.15" strokeDasharray="0.8 0.5" opacity="0.7" />
            <path d="M85 62 C 76 58, 64 52, 55 50" stroke="#c8d5e2" strokeWidth="0.15" strokeDasharray="0.8 0.5" opacity="0.7" />
            <path d="M84 88 C 76 80, 64 60, 55 53" stroke="#c8d5e2" strokeWidth="0.15" strokeDasharray="0.8 0.5" opacity="0.7" />
            {/* Junction dots */}
            <circle cx="16" cy="50" r="0.4" fill="#a0b4c8" opacity="0.5" />
            <circle cx="18" cy="12" r="0.4" fill="#a0b4c8" opacity="0.5" />
            <circle cx="17" cy="84" r="0.4" fill="#a0b4c8" opacity="0.5" />
            <circle cx="82" cy="12" r="0.4" fill="#a0b4c8" opacity="0.5" />
            <circle cx="88" cy="36" r="0.4" fill="#a0b4c8" opacity="0.5" />
            <circle cx="85" cy="62" r="0.4" fill="#a0b4c8" opacity="0.5" />
            <circle cx="84" cy="88" r="0.4" fill="#a0b4c8" opacity="0.5" />
          </svg>

          {/* 3-column layout */}
          <div className="relative z-10 flex items-center justify-center w-full h-[340px]">

            {/* ── Left Column — 3 nodes ── */}
            <div className="relative flex-1 h-full">
              <EcoNode
                label="Milestone"
                icon={
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-sm">
                    <Flag className="w-4 h-4 text-white" />
                  </div>
                }
                className="left-[15%] top-[4%] animate-float-delayed"
                delay={0.5}
              />
              <EcoNode
                label="Freelancer"
                image="/images/freelancer.png"
                icon={null}
                className="left-[2%] top-[38%] animate-float"
                delay={0.3}
              />
              <EcoNode
                label="Project"
                icon={
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200/80 shadow-sm">
                    <FileText className="w-4 h-4 text-slate-500" />
                  </div>
                }
                className="left-[8%] bottom-[8%] animate-float"
                delay={0.4}
              />
            </div>

            {/* ── Center Column — Shield Logo ── */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-400/15 to-cyan-400/15 blur-2xl animate-pulse-glow" />

                <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] animate-float-slow">
                  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                    <defs>
                      <linearGradient id="shieldGrad" x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#38bdf8" />
                        <stop offset="0.5" stopColor="#0ea5e9" />
                        <stop offset="1" stopColor="#0891b2" />
                      </linearGradient>
                      <linearGradient id="shieldHighlight" x1="30" y1="15" x2="90" y2="60" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" stopOpacity="0.3" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                      <filter id="shieldShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0ea5e9" floodOpacity="0.25" />
                      </filter>
                    </defs>
                    <path d="M60 8 L105 28 L105 62 C105 85 85 102 60 112 C35 102 15 85 15 62 L15 28 Z" fill="url(#shieldGrad)" filter="url(#shieldShadow)" />
                    <path d="M60 14 L100 32 L100 40 C80 36 60 35 40 38 L20 30 Z" fill="url(#shieldHighlight)" />
                    <text x="30" y="74" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="38" fill="white" opacity="0.95">P</text>
                    <path d="M62 48 L72 58 L86 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>

                <span className="mt-2 text-[13px] font-bold text-gray-600 tracking-wide">Secure Escrow</span>
              </motion.div>
            </div>

            {/* ── Right Column — 4 nodes ── */}
            <div className="relative flex-1 h-full">
              <EcoNode
                label="Escrow Payment"
                icon={
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                }
                className="right-[10%] top-[3%] animate-float-delayed"
                delay={0.6}
              />
              <EcoNode
                label="Dispute"
                icon={
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-sm">
                    <Scale className="w-4 h-4 text-white" />
                  </div>
                }
                className="right-[2%] top-[27%] animate-float"
                delay={0.9}
              />
              <EcoNode
                label="Client"
                image="/images/client.png"
                icon={null}
                className="right-[5%] top-[52%] animate-float-delayed"
                delay={0.7}
              />
              <EcoNode
                label="Transaction"
                icon={
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                }
                className="right-[3%] bottom-[5%] animate-float"
                delay={0.8}
              />
            </div>

          </div>
        </div>

        {/* ── Headline ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-extrabold leading-[1.08] tracking-tight mb-4">
            Secure Payments{" "}
            <br className="hidden sm:block" />
            for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
              Freelancers and Clients
            </span>
          </h1>

          <p className="text-[15px] md:text-[16px] text-gray-500 leading-relaxed max-w-[520px] mx-auto mb-6 font-medium">
            PaySure is a milestone-based escrow platform that protects freelancers and clients
            by holding payments securely until project work is approved.
          </p>

          {/* Role Based CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <Button 
              onClick={() => handleRoleSignup('client')}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:from-[#1d4ed8] hover:to-[#0284c7] text-white border-0 shadow-[0_8px_30px_-4px_rgba(37,99,235,0.4)] h-[52px] px-8 text-[15px] font-bold gap-2.5 transition-all duration-300 hover:shadow-[0_12px_40px_-4px_rgba(37,99,235,0.5)] hover:-translate-y-1"
            >
              Hire Top Talent <Briefcase className="w-5 h-5 opacity-90" />
            </Button>
            <Button 
              onClick={() => handleRoleSignup('freelancer')}
              className="w-full sm:w-auto rounded-full bg-white text-[#1e293b] border-2 border-[#e2e8f0] hover:border-[#0ea5e9] hover:bg-[#f8fafc] shadow-sm h-[52px] px-8 text-[15px] font-bold gap-2.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              Work & Get Paid <UserPlus className="w-5 h-5 text-[#0ea5e9]" />
            </Button>
          </motion.div>

          {/* Trust Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-5 flex items-center justify-center gap-2 text-[13px] text-gray-400 font-medium"
          >
            <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] flex items-center justify-center">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            Trusted by Freelancers &bull; Startups &bull; Agencies
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
