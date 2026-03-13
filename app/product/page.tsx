"use client";

import { FolderPlus, Download, ClipboardCheck, Send } from "lucide-react";
import PageLayout from "@/components/landing/page-layout";
import { motion } from "framer-motion";

export default function ProductPage() {
    return (
        <PageLayout>
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">How PaySure Works</h1>
                        <p className="text-gray-500 text-base max-w-xl mx-auto">A secure milestone-based escrow workflow designed for freelancers and businesses.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-[40px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 z-0" />
                        {[
                            { icon: FolderPlus, title: "Create Project", desc: "Clients create a project and define payment milestones for each stage of work.", step: 1, color: "from-blue-500 to-indigo-600" },
                            { icon: Download, title: "Deposit Escrow", desc: "The client securely deposits funds into PaySure's escrow wallet.", step: 2, color: "from-amber-500 to-orange-500" },
                            { icon: ClipboardCheck, title: "Complete Milestone", desc: "Freelancers complete milestones and submit work for approval.", step: 3, color: "from-emerald-500 to-green-600" },
                            { icon: Send, title: "Release Payment", desc: "Once the client approves, the payment is released instantly.", step: 4, color: "from-violet-500 to-purple-600" },
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
                                <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50/50">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-tight text-center mb-14">Why Milestone-Based Escrow?</h2>
                    <div className="space-y-8">
                        {[
                            { title: "Protection for Both Parties", desc: "Freelancers know the funds are secured before starting work. Clients know payment is only released when milestones are completed and approved.", color: "bg-blue-500" },
                            { title: "Transparent Workflow", desc: "Every step — from project creation to final payment — is visible to both the client and freelancer. No hidden surprises.", color: "bg-emerald-500" },
                            { title: "Fair Dispute Resolution", desc: "If disagreements arise, PaySure's admin team mediates the dispute fairly based on the milestone scope and deliverables.", color: "bg-violet-500" },
                        ].map((item) => (
                            <div key={item.title} className="flex gap-5 items-start">
                                <div className={`w-3 h-3 rounded-full ${item.color} mt-2 flex-shrink-0`} />
                                <div>
                                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
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
