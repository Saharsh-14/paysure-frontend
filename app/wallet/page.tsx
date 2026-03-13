"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { StatCard } from "@/components/ui/stat-card";
import { useWalletBalance, useDeposit, useWithdraw } from "@/lib/hooks";
import { Wallet, Lock, TrendingUp, ArrowUpFromLine, ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function WalletPage() {
    const { data: wallet } = useWalletBalance();
    const depositMutation = useDeposit();
    const withdrawMutation = useWithdraw();
    const [showAction, setShowAction] = useState<"deposit" | "withdraw" | null>(null);
    const [amount, setAmount] = useState("");

    const handleAction = async () => {
        const val = parseFloat(amount);
        if (val > 0) {
            if (showAction === "deposit") {
                await depositMutation.mutateAsync(val);
            } else {
                await withdrawMutation.mutateAsync(val);
            }
            setAmount("");
            setShowAction(null);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Wallet</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your escrow funds and balance</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="Total Balance" value={wallet ? formatCurrency(wallet.totalBalance) : "—"} icon={Wallet} iconBg="bg-blue-500/10" iconColor="text-blue-600 dark:text-blue-400" />
                <StatCard title="Escrowed" value={wallet ? formatCurrency(wallet.escrowLocked) : "—"} icon={Lock} iconBg="bg-amber-500/10" iconColor="text-amber-600 dark:text-amber-400" />
                <StatCard title="Available" value={wallet ? formatCurrency(wallet.availableBalance) : "—"} icon={TrendingUp} iconBg="bg-emerald-500/10" iconColor="text-emerald-600 dark:text-emerald-400" />
                <StatCard title="Total Earnings" value={wallet ? formatCurrency(wallet.totalEarnings) : "—"} icon={TrendingUp} iconBg="bg-purple-500/10" iconColor="text-purple-600 dark:text-purple-400" trend={{ value: "24.3%", positive: true }} />
            </div>

            {/* Balance Card + Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2"><BalanceCard /></div>
                <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="font-semibold text-foreground text-sm">Quick Actions</h3>

                    {showAction ? (
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-foreground">{showAction === "deposit" ? "Deposit Funds" : "Withdraw Funds"}</p>
                            <input type="number" placeholder="Enter amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-xl bg-muted border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                            <div className="flex gap-2">
                                <Button className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold h-10 text-sm" onClick={handleAction} disabled={depositMutation.isPending || withdrawMutation.isPending}>
                                    {(depositMutation.isPending || withdrawMutation.isPending) ? "Processing..." : "Confirm"}
                                </Button>
                                <Button variant="outline" className="rounded-xl border-border text-foreground h-10 text-sm" onClick={() => { setShowAction(null); setAmount(""); }}>Cancel</Button>
                            </div>
                            {withdrawMutation.isError && <p className="text-xs text-red-500">Insufficient available balance</p>}
                        </div>
                    ) : (
                        <>
                            <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold h-11 text-sm shadow-md shadow-primary/20" onClick={() => setShowAction("deposit")}>
                                <ArrowDownToLine className="w-4 h-4 mr-2" /> Deposit Funds
                            </Button>
                            <Button variant="outline" className="w-full rounded-xl border-border text-foreground hover:bg-muted font-semibold h-11 text-sm" onClick={() => setShowAction("withdraw")}>
                                <ArrowUpFromLine className="w-4 h-4 mr-2" /> Withdraw Funds
                            </Button>
                            <div className="pt-2 border-t border-border">
                                <p className="text-xs text-muted-foreground">Withdrawals are processed instantly. Minimum withdrawal: $50.00</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Transaction History */}
            <div>
                <h2 className="text-base font-semibold text-foreground mb-3">Transaction History</h2>
                <TransactionList />
            </div>
        </DashboardLayout>
    );
}
