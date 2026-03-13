"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageLayout from "@/components/landing/page-layout";
import { motion } from "framer-motion";

export default function PricingPage() {
    return (
        <PageLayout>
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h1 className="text-[36px] md:text-[48px] font-extrabold tracking-tight mb-4">Simple Transparent Pricing</h1>
                        <p className="text-gray-500 text-base max-w-xl mx-auto">Choose a plan that fits your needs. No hidden fees.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {[
                            {
                                name: "Starter", audience: "For Freelancers", price: "Free", features: ["Basic escrow transactions", "Project tracking", "Milestone approvals", "Transaction history"],
                                highlighted: false, cta: "Get Started"
                            },
                            {
                                name: "Professional", audience: "For Growing Businesses", price: "5%", priceLabel: "transaction fee", features: ["Unlimited projects", "Escrow protection", "Dispute support", "Priority support"],
                                highlighted: true, cta: "Get Started"
                            },
                            {
                                name: "Enterprise", audience: "For Agencies", price: "Custom", features: ["Dedicated account manager", "Advanced analytics", "Custom integrations", "Priority dispute resolution"],
                                highlighted: false, cta: "Contact Sales"
                            },
                        ].map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className={`rounded-2xl p-8 ${plan.highlighted
                                    ? "border-2 border-primary bg-gradient-to-b from-blue-50/50 to-white shadow-xl shadow-primary/10 relative"
                                    : "border border-gray-200 bg-white hover:shadow-lg transition-all"
                                }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md">RECOMMENDED</div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                    <p className="text-gray-500 text-sm">{plan.audience}</p>
                                </div>
                                <div className="mb-6">
                                    <span className="text-[48px] font-extrabold">{plan.price}</span>
                                    {plan.priceLabel && <span className="text-gray-500 text-sm ml-1">{plan.priceLabel}</span>}
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? "bg-primary/10" : "bg-gray-100"}`}>
                                                <Check className={`w-3 h-3 ${plan.highlighted ? "text-primary" : "text-gray-500"}`} />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/signup">
                                    <Button className={`w-full rounded-full h-12 font-semibold text-[15px] ${plan.highlighted
                                        ? "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20"
                                        : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50"
                                    }`}>
                                        {plan.cta} {plan.highlighted && <ArrowRight className="w-4 h-4 ml-1" />}
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
