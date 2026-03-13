"use client";

import { Wallet, TrendingUp } from "lucide-react";
import { useWalletBalance } from "@/lib/hooks";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function BalanceCard() {
    const { data: wallet, isLoading } = useWalletBalance();

    if (isLoading || !wallet) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-6 lg:p-8 text-white shadow-xl shadow-primary/20 animate-pulse">
                <div className="h-8 w-40 bg-white/20 rounded mb-4" />
                <div className="h-12 w-56 bg-white/20 rounded mb-6" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-white/10 rounded-xl" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-6 lg:p-8 text-white shadow-xl shadow-primary/20">
            {/* Decorative elements */}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-8 -bottom-12 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute right-8 bottom-6 opacity-[0.06]">
                <Wallet className="w-32 h-32" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-blue-100 text-sm font-medium">Total Balance</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/15 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3" /> +12.5%
                    </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                    {formatCurrency(wallet.totalBalance)}
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        { label: "Escrowed", value: wallet.escrowLocked, color: "bg-amber-400/20 text-amber-200" },
                        { label: "Available", value: wallet.availableBalance, color: "bg-emerald-400/20 text-emerald-200" },
                        { label: "Pending Release", value: wallet.pendingRelease, color: "bg-indigo-300/20 text-indigo-200" },
                        { label: "Total Earnings", value: wallet.totalEarnings, color: "bg-white/10 text-blue-100" },
                    ].map((item) => (
                        <div key={item.label} className={`rounded-xl px-3 py-2.5 ${item.color}`}>
                            <p className="text-[10px] font-medium opacity-80 mb-0.5">{item.label}</p>
                            <p className="text-sm font-bold">{formatCurrency(item.value)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
