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

  const handleRoleSignup = (role: 'client' | 'freelancer') => {
    localStorage.setItem("paysure_role", role);
    router.push("/signup");
  };

  return (
    <nav className="relative z-50 w-full py-3 flex-shrink-0 bg-white/70 backdrop-blur-md border-b border-gray-100/50">
      <div className="container mx-auto flex h-12 items-center px-6 lg:px-12 justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="navShield" x1="6" y1="4" x2="38" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" /><stop offset="0.45" stopColor="#0ea5e9" /><stop offset="1" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id="navHighlight" x1="12" y1="8" x2="32" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.35" /><stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M22 3 L39 11 L39 24 C39 33 31 39 22 42 C13 39 5 33 5 24 L5 11 Z" fill="url(#navShield)" />
              <path d="M22 5 L37 12.5 L37 18 C30 16 22 15 14 17 L7 13 Z" fill="url(#navHighlight)" />
              <text x="12" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="16" fill="white">P</text>
              <path d="M24 18 L28 22 L34 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <span className="text-[22px] font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#0891b2]">Pay</span>
            <span className="text-[#1e293b]">Sure</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {[{ name: "Product", href: "/product" }, { name: "Features", href: "/features" }, { name: "Security", href: "/security" }, { name: "Pricing", href: "/pricing" }].map((item) => (
            <Link key={item.name} href={item.href} className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">{item.name}</Link>
          ))}
          <Link href="/resources" className="flex items-center gap-1 text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Resources <ChevronDown className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <SignedOut>
            <Link href="/login">
              <Button variant="ghost" className="text-[14px] font-semibold text-gray-600 hover:text-gray-900 hover:bg-transparent px-4 h-9">
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
              <Button className="rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] hover:from-[#0c93cf] hover:to-[#05a3bf] text-white border-0 shadow-[0_4px_14px_0_rgba(14,165,233,0.35)] px-5 font-semibold h-9 text-[13px] gap-1.5 transition-all duration-300">
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
    <footer className="bg-[#0a0f1c] text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M22 3 L39 11 L39 24 C39 33 31 39 22 42 C13 39 5 33 5 24 L5 11 Z" fill="url(#footShield)" />
                <text x="12" y="28" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="16" fill="white">P</text>
                <path d="M24 18 L28 22 L34 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <defs><linearGradient id="footShield" x1="6" y1="4" x2="38" y2="42" gradientUnits="userSpaceOnUse"><stop stopColor="#38bdf8" /><stop offset="1" stopColor="#0891b2" /></linearGradient></defs>
              </svg>
            </div>
            <span className="text-[18px] font-bold text-white">PaySure</span>
          </div>
          <div className="flex flex-wrap gap-6 text-[13px]">
            {["Product", "Features", "Security", "Pricing", "Resources"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</Link>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px]">© PaySure 2026. All rights reserved.</p>
          <div className="flex gap-6 text-[12px]">
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

  const handleRoleSignup = (role: 'client' | 'freelancer') => {
    localStorage.setItem("paysure_role", role);
    router.push("/signup");
  };

  return (
    <section className="py-24 bg-gradient-to-r from-[#0f172a] to-[#1e3a5f] text-white overflow-hidden relative">
      <div className="absolute top-[-30%] left-[30%] w-[40%] h-[80%] rounded-full bg-blue-500/15 blur-[100px]" />
      <div className="absolute bottom-[-30%] right-[20%] w-[30%] h-[60%] rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-[32px] md:text-[42px] font-extrabold tracking-tight mb-4">Start Secure Payments Today</h2>
        <p className="text-gray-300 text-[16px] mb-10 max-w-md mx-auto">Join freelancers and businesses already using PaySure.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => handleRoleSignup('client')}
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 shadow-lg h-[52px] px-8 text-[15px] font-bold gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
          >
            Hire Top Talent <Briefcase className="w-5 h-5 opacity-80" />
          </Button>
          <Button 
            onClick={() => handleRoleSignup('freelancer')}
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white border-0 shadow-lg h-[52px] px-8 text-[15px] font-bold gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
          >
            Work & Get Paid <UserPlus className="w-5 h-5 opacity-80" />
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
