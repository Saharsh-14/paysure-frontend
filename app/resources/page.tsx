"use client";

import { BookOpen, Code2, HelpCircle, Users } from "lucide-react";
import PageLayout from "@/components/landing/page-layout";

export default function ResourcesPage() {
  return (
    <PageLayout>
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">Resources</h1>
            <p className="text-gray-500 text-[16px] max-w-xl mx-auto">Everything you need to get started and make the most of PaySure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BookOpen className="w-7 h-7" />, title: "Documentation", desc: "Learn how PaySure works with step-by-step guides. Covers setup, workflows, and best practices.", color: "from-blue-500 to-blue-600" },
              { icon: <Code2 className="w-7 h-7" />, title: "API Access", desc: "Integrate PaySure escrow payments into your applications. RESTful API with comprehensive documentation.", color: "from-violet-500 to-purple-500" },
              { icon: <HelpCircle className="w-7 h-7" />, title: "Help Center", desc: "Get answers to common questions and troubleshooting. Searchable knowledge base with quick solutions.", color: "from-emerald-500 to-green-500" },
              { icon: <Users className="w-7 h-7" />, title: "Community", desc: "Join discussions with freelancers and businesses using PaySure. Share tips and connect with peers.", color: "from-amber-500 to-orange-500" },
            ].map((item) => (
              <div key={item.title} className="group bg-white rounded-2xl border border-gray-100 p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md mb-5`}>
                  {item.icon}
                </div>
                <h3 className="text-[17px] font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
