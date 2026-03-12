"use client";

import { ShieldCheck, Lock, Shield, Eye } from "lucide-react";
import PageLayout from "@/components/landing/page-layout";

export default function SecurityPage() {
  return (
    <PageLayout>
      <section className="py-24 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white overflow-hidden relative">
        {/* Background glows */}
        <div className="absolute top-[-20%] left-[10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[40%] h-[60%] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">Enterprise-Level Security</h1>
            <p className="text-gray-400 text-[16px] max-w-xl mx-auto">Your funds and data are protected with industry-leading security measures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Secure Escrow Protection", desc: "Payments are held safely until project milestones are completed. Funds only move when both parties agree." },
              { icon: <Lock className="w-8 h-8" />, title: "Encrypted Transactions", desc: "All financial transactions are encrypted and securely processed with bank-grade security protocols." },
              { icon: <Shield className="w-8 h-8" />, title: "Fraud Prevention", desc: "Built-in safeguards protect both freelancers and clients from fraudulent activity and unauthorized access." },
              { icon: <Eye className="w-8 h-8" />, title: "Transparent Payment Flow", desc: "Every transaction is recorded and visible for both parties. Complete audit trail for all movements." },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/20 flex items-center justify-center text-blue-400 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-[18px] font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-[14px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-tight mb-6">Trusted by Thousands</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-2xl mx-auto mb-12">
            PaySure&apos;s escrow system is built on the principle that both parties deserve protection. Our platform ensures fair transactions with complete transparency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "100%", label: "Encrypted Transactions" },
              { stat: "24/7", label: "System Monitoring" },
              { stat: "99.9%", label: "Uptime Guarantee" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-[40px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">{item.stat}</div>
                <p className="text-gray-500 text-[14px] font-medium mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
