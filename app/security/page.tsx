"use client";

import { ShieldCheck, Lock, Shield, Eye } from "lucide-react";
import PageLayout from "@/components/landing/page-layout";
import { motion } from "framer-motion";

export default function SecurityPage() {
    return (
        <PageLayout>
            <section className="py-24 bg-gradient-to-b from-gray-900 to-slate-800 text-white overflow-hidden relative">
                <div className="absolute top-[-20%] left-[10%] w-[40%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[10%] w-[40%] h-[60%] rounded-full bg-cyan-500/10 blur-[120px]" />

                <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">Enterprise-Level Security</h1>
                        <p className="text-gray-400 text-base max-w-xl mx-auto">Your funds and data are protected with industry-leading security measures.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: ShieldCheck, title: "Secure Escrow Protection", desc: "Payments are held safely until project milestones are completed." },
                            { icon: Lock, title: "Encrypted Transactions", desc: "All financial transactions are encrypted with bank-grade security." },
                            { icon: Shield, title: "Fraud Prevention", desc: "Built-in safeguards protect both freelancers and clients." },
                            { icon: Eye, title: "Transparent Payment Flow", desc: "Every transaction is recorded with a complete audit trail." },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-7 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-tight mb-6">Trusted by Thousands</h2>
                    <p className="text-gray-500 text-[15px] leading-relaxed max-w-2xl mx-auto mb-12">
                        PaySure&apos;s escrow system is built on the principle that both parties deserve protection.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { stat: "100%", label: "Encrypted Transactions" },
                            { stat: "24/7", label: "System Monitoring" },
                            { stat: "99.9%", label: "Uptime Guarantee" },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="text-[40px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{item.stat}</div>
                                <p className="text-gray-500 text-sm font-medium mt-1">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
