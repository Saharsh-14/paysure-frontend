"use client";

import {
  FolderPlus,
  Download,
  ClipboardCheck,
  Send,
} from "lucide-react";
import PageLayout from "@/components/landing/page-layout";

export default function ProductPage() {
  return (
    <PageLayout>
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">How PaySure Works</h1>
            <p className="text-gray-500 text-[16px] max-w-xl mx-auto">A secure milestone-based escrow workflow designed for freelancers and businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-200 z-0" />

            {[
              { icon: <FolderPlus className="w-6 h-6" />, title: "Create Project", desc: "Clients create a project and define payment milestones for each stage of work.", step: 1, color: "from-blue-500 to-blue-600" },
              { icon: <Download className="w-6 h-6" />, title: "Deposit Escrow", desc: "The client securely deposits funds into PaySure's escrow wallet.", step: 2, color: "from-cyan-500 to-teal-500" },
              { icon: <ClipboardCheck className="w-6 h-6" />, title: "Complete Milestone", desc: "Freelancers complete milestones and submit work for approval.", step: 3, color: "from-emerald-500 to-green-500" },
              { icon: <Send className="w-6 h-6" />, title: "Release Payment", desc: "Once the client approves the milestone, the payment is released instantly.", step: 4, color: "from-violet-500 to-purple-500" },
            ].map((item) => (
              <div key={item.step} className="relative z-10 flex flex-col items-center text-center px-4">
                <div className={`w-[64px] h-[64px] rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg mb-5`}>
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center text-[12px] font-bold text-blue-600 shadow-sm">{item.step}</div>
                <h3 className="text-[18px] font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-[240px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Breakdown */}
      <section className="py-20 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-tight text-center mb-14">Why Milestone-Based Escrow?</h2>

          <div className="space-y-12">
            {[
              { title: "Protection for Both Parties", desc: "Freelancers know the funds are secured before starting work. Clients know payment is only released when milestones are completed and approved.", color: "from-blue-500 to-blue-600" },
              { title: "Transparent Workflow", desc: "Every step — from project creation to final payment — is visible to both the client and freelancer. No hidden surprises.", color: "from-cyan-500 to-teal-500" },
              { title: "Fair Dispute Resolution", desc: "If disagreements arise, PaySure's admin team mediates the dispute fairly based on the milestone scope and deliverables.", color: "from-violet-500 to-purple-500" },
            ].map((item) => (
              <div key={item.title} className="flex gap-6 items-start">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${item.color} mt-2 flex-shrink-0`} />
                <div>
                  <h3 className="text-[18px] font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
