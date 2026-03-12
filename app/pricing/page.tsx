"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageLayout from "@/components/landing/page-layout";

export default function PricingPage() {
  return (
    <PageLayout>
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">Simple Transparent Pricing</h1>
            <p className="text-gray-500 text-[16px] max-w-xl mx-auto">Choose a plan that fits your needs. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Starter */}
            <div className="rounded-2xl border border-gray-200 p-8 bg-white hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-[22px] font-bold mb-1">Starter</h3>
                <p className="text-gray-500 text-[13px]">For Freelancers</p>
              </div>
              <div className="mb-6">
                <span className="text-[48px] font-extrabold">Free</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Basic escrow transactions", "Project tracking", "Milestone approvals", "Transaction history"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-gray-500" /></div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full rounded-full h-12 font-semibold text-[15px] border-gray-300 hover:bg-gray-50">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Professional — highlighted */}
            <div className="rounded-2xl border-2 border-blue-500 p-8 bg-gradient-to-b from-blue-50/50 to-white shadow-[0_8px_40px_-8px_rgba(37,99,235,0.2)] relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md">RECOMMENDED</div>
              <div className="mb-6">
                <h3 className="text-[22px] font-bold mb-1">Professional</h3>
                <p className="text-gray-500 text-[13px]">For Growing Businesses</p>
              </div>
              <div className="mb-6">
                <span className="text-[48px] font-extrabold">5%</span>
                <span className="text-gray-500 text-[14px] ml-1">transaction fee</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Unlimited projects", "Escrow protection", "Dispute support", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-blue-600" /></div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button className="w-full rounded-full h-12 font-semibold text-[15px] bg-gradient-to-r from-[#2563eb] to-[#06b6d4] hover:from-[#1d5ad6] hover:to-[#05a3bf] text-white shadow-[0_4px_16px_-2px_rgba(37,99,235,0.4)]">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-gray-200 p-8 bg-white hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-[22px] font-bold mb-1">Enterprise</h3>
                <p className="text-gray-500 text-[13px]">For Agencies</p>
              </div>
              <div className="mb-6">
                <span className="text-[48px] font-extrabold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Dedicated account manager", "Advanced analytics", "Custom integrations", "Priority dispute resolution"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-gray-500" /></div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full rounded-full h-12 font-semibold text-[15px] border-gray-300 hover:bg-gray-50">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
