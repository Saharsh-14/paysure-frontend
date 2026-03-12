"use client";

import {
  Milestone,
  Shield,
  LayoutDashboard,
  Activity,
  Gavel,
  Settings,
} from "lucide-react";
import PageLayout from "@/components/landing/page-layout";

export default function FeaturesPage() {
  return (
    <PageLayout>
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">Platform Features</h1>
            <p className="text-gray-500 text-[16px] max-w-xl mx-auto">Everything you need to manage secure payments between freelancers and clients.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Milestone className="w-6 h-6" />, title: "Milestone-Based Payments", desc: "Break projects into milestones and release payments only after approval. Each milestone has a defined scope and amount.", color: "from-blue-500 to-blue-600" },
              { icon: <Shield className="w-6 h-6" />, title: "Secure Escrow Wallet", desc: "Funds remain safely locked until the work is verified and approved. No unauthorized withdrawals.", color: "from-cyan-500 to-teal-500" },
              { icon: <LayoutDashboard className="w-6 h-6" />, title: "Role-Based Dashboards", desc: "Separate dashboards for clients, freelancers, and admins. Each role sees exactly what they need.", color: "from-violet-500 to-purple-500" },
              { icon: <Activity className="w-6 h-6" />, title: "Real-Time Transaction Tracking", desc: "Track every payment movement with full transparency. See deposits, releases, and refunds in real-time.", color: "from-emerald-500 to-green-500" },
              { icon: <Gavel className="w-6 h-6" />, title: "Dispute Resolution System", desc: "Raise disputes when issues arise and let admins mediate fairly. All evidence is documented and tracked.", color: "from-rose-500 to-pink-500" },
              { icon: <Settings className="w-6 h-6" />, title: "Project Management", desc: "Manage projects, milestones, approvals, and payments in one place. Streamlined workflow for everyone.", color: "from-amber-500 to-orange-500" },
            ].map((feature) => (
              <div key={feature.title} className="group bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-md mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-[18px] font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
