"use client";

import { BookOpen, Code2, HelpCircle, Users } from "lucide-react";
import PageLayout from "@/components/landing/page-layout";
import { motion } from "framer-motion";

export default function ResourcesPage() {
    return (
        <PageLayout>
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">Resources</h1>
                        <p className="text-gray-500 text-base max-w-xl mx-auto">Everything you need to get started and make the most of PaySure.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: BookOpen, title: "Documentation", desc: "Step-by-step guides covering setup, workflows, and best practices.", color: "bg-blue-500/10 text-blue-600" },
                            { icon: Code2, title: "API Access", desc: "RESTful API with comprehensive documentation for integrations.", color: "bg-violet-500/10 text-violet-600" },
                            { icon: HelpCircle, title: "Help Center", desc: "Searchable knowledge base with quick solutions and FAQs.", color: "bg-emerald-500/10 text-emerald-600" },
                            { icon: Users, title: "Community", desc: "Join discussions with freelancers and businesses using PaySure.", color: "bg-amber-500/10 text-amber-600" },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                            >
                                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-5`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
