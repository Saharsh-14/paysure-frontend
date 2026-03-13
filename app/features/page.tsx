"use client";

import { Milestone, Shield, LayoutDashboard, Activity, Gavel, Settings } from "lucide-react";
import PageLayout from "@/components/landing/page-layout";
import { motion } from "framer-motion";

export default function FeaturesPage() {
    return (
        <PageLayout>
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">Platform Features</h1>
                        <p className="text-gray-500 text-base max-w-xl mx-auto">Everything you need to manage secure payments between freelancers and clients.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Milestone, title: "Milestone-Based Payments", desc: "Break projects into milestones and release payments only after approval.", color: "bg-blue-500/10 text-blue-600" },
                            { icon: Shield, title: "Secure Escrow Wallet", desc: "Funds remain safely locked until work is verified and approved.", color: "bg-emerald-500/10 text-emerald-600" },
                            { icon: LayoutDashboard, title: "Role-Based Dashboards", desc: "Separate dashboards for clients, freelancers, and admins.", color: "bg-violet-500/10 text-violet-600" },
                            { icon: Activity, title: "Real-Time Tracking", desc: "Track every payment with full transparency in real time.", color: "bg-amber-500/10 text-amber-600" },
                            { icon: Gavel, title: "Dispute Resolution", desc: "Admin-mediated disputes with evidence documentation.", color: "bg-rose-500/10 text-rose-600" },
                            { icon: Settings, title: "Project Management", desc: "Manage projects, milestones, approvals, and payments in one place.", color: "bg-cyan-500/10 text-cyan-600" },
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
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
        </PageLayout>
    );
}
