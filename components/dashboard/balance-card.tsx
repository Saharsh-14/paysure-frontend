"use client";

import { Button } from "@/components/ui/button";
import { Wallet, Gift } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function BalanceCard() {
    const balance = 0.92;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 p-8 text-white shadow-xl shadow-blue-500/20">
            {/* Glow effect */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <p className="text-blue-100 mb-1 text-sm font-medium">Total Balance</p>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
                        {formatCurrency(balance)}
                    </h2>
                    <div className="mt-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md border border-white/20">
                        $0 Total Earnings
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-auto">
                    <Button variant="glass" className="w-full justify-start md:justify-center">
                        <Wallet className="w-4 h-4 mr-2" /> Deposit Funds
                    </Button>
                </div>
            </div>
        </div>
    );
}
