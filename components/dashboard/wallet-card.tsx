"use client";

import { ArrowDownToLine, ArrowUpFromLine, ShieldCheck, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWalletBalance, useDeposit, useWithdraw } from "@/lib/hooks";
import { useState } from "react";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function ActiveEscrowCard() {
    const { data: wallet, isLoading } = useWalletBalance();
    const depositMutation = useDeposit();
    const withdrawMutation = useWithdraw();
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [amount, setAmount] = useState("");

    const handleDeposit = async () => {
        const val = parseFloat(amount);
        if (val > 0) {
            await depositMutation.mutateAsync(val);
            setAmount("");
            setShowDeposit(false);
        }
    };

    const handleWithdraw = async () => {
        const val = parseFloat(amount);
        if (val > 0) {
            await withdrawMutation.mutateAsync(val);
            setAmount("");
            setShowWithdraw(false);
        }
    };

    if (isLoading || !wallet) {
        return (
            <div className="rounded-2xl border border-border bg-card p-5 animate-pulse">
                <div className="h-5 w-32 bg-muted rounded mb-4" />
                <div className="h-20 bg-muted rounded-xl mb-3" />
                <div className="h-20 bg-muted rounded-xl mb-3" />
                <div className="flex gap-3"><div className="h-10 flex-1 bg-muted rounded-xl" /><div className="h-10 flex-1 bg-muted rounded-xl" /></div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border flex justify-between items-center">
                <h3 className="font-semibold text-foreground text-sm">Escrow Wallet</h3>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Secured
                </div>
            </div>
            <div className="p-5 space-y-4">
                <div className="rounded-xl bg-muted p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Lock className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs text-muted-foreground font-medium">Locked in Escrow</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground">{formatCurrency(wallet.escrowLocked)}</span>
                    <p className="text-xs text-muted-foreground mt-1">Across active projects</p>
                </div>

                <div className="rounded-xl bg-muted p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs text-muted-foreground font-medium">Available for Withdrawal</span>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(wallet.availableBalance)}</span>
                    <p className="text-xs text-muted-foreground mt-1">From approved milestones</p>
                </div>

                {/* Deposit/Withdraw inline forms */}
                {(showDeposit || showWithdraw) && (
                    <div className="rounded-xl border border-border bg-muted/50 p-4 space-y-3">
                        <p className="text-sm font-semibold text-foreground">{showDeposit ? "Deposit Funds" : "Withdraw Funds"}</p>
                        <input
                            type="number"
                            placeholder="Enter amount ($)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-xl bg-card border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <div className="flex gap-2">
                            <Button
                                className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold h-9 text-sm"
                                onClick={showDeposit ? handleDeposit : handleWithdraw}
                                disabled={depositMutation.isPending || withdrawMutation.isPending}
                            >
                                {(depositMutation.isPending || withdrawMutation.isPending) ? "Processing..." : "Confirm"}
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-xl border-border text-foreground h-9 text-sm"
                                onClick={() => { setShowDeposit(false); setShowWithdraw(false); setAmount(""); }}
                            >
                                Cancel
                            </Button>
                        </div>
                        {withdrawMutation.isError && (
                            <p className="text-xs text-red-500">Insufficient available balance</p>
                        )}
                    </div>
                )}

                {!showDeposit && !showWithdraw && (
                    <div className="flex gap-3 pt-1">
                        <Button
                            className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold h-10 text-sm"
                            onClick={() => { setShowDeposit(true); setShowWithdraw(false); }}
                        >
                            <ArrowDownToLine className="w-4 h-4 mr-2" /> Deposit
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 rounded-xl border-border text-foreground hover:bg-muted font-semibold h-10 text-sm"
                            onClick={() => { setShowWithdraw(true); setShowDeposit(false); }}
                        >
                            <ArrowUpFromLine className="w-4 h-4 mr-2" /> Withdraw
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
