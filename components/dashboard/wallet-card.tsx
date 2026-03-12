"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownToLine, ArrowUpFromLine, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActiveEscrowCard() {
    return (
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-semibold text-white">Escrow Wallet</h3>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                    <ShieldCheck className="w-3 h-3" /> Secured
                </div>
            </div>
            <CardContent className="space-y-4 pt-6">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-white/60">Locked in Escrow</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-3xl font-bold text-white w-full outline-none">$2,000.00</span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">Across 2 active projects</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-white/60">Available for Withdrawal</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold text-emerald-400 w-full outline-none">$500.00</span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">From approved milestones</p>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button variant="gradient" className="flex-1 shadow-blue-500/20">
                        <ArrowDownToLine className="w-4 h-4 mr-2" /> Deposit
                    </Button>
                    <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                        <ArrowUpFromLine className="w-4 h-4 mr-2" /> Withdraw
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
