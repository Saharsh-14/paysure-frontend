"use client";

import { useTransactions } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { ArrowDownToLine, ArrowUpFromLine, RefreshCw, Wallet, Lock } from "lucide-react";

const typeConfig: Record<string, { icon: any; label: string; color: string }> = {
    deposit: { icon: ArrowDownToLine, label: "Deposit", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    release: { icon: Wallet, label: "Release", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    refund: { icon: RefreshCw, label: "Refund", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    withdrawal: { icon: ArrowUpFromLine, label: "Withdrawal", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    escrow_lock: { icon: Lock, label: "Escrow Lock", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
};

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

interface TransactionListProps {
    limit?: number;
}

export function TransactionList({ limit }: TransactionListProps) {
    const { data: transactions, isLoading } = useTransactions();

    if (isLoading) {
        return (
            <div className="space-y-2 w-full">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
                ))}
            </div>
        );
    }

    const items = limit ? (transactions || []).slice(0, limit) : (transactions || []);

    return (
        <div className="space-y-2 w-full">
            {items.map((tx: any) => {
                const config = typeConfig[tx.type] || typeConfig.deposit;
                const Icon = config.icon;
                return (
                    <div
                        key={tx.id}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-3.5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}>
                                <Icon className="w-[18px] h-[18px]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tx.description}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                                    {tx.projectName && (
                                        <>
                                            <span className="text-muted-foreground/40">·</span>
                                            <p className="text-xs text-muted-foreground">{tx.projectName}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex items-center gap-3">
                            <div>
                                <p className={`text-sm font-bold ${tx.type === "withdrawal" || tx.type === "refund" ? "text-red-500" : "text-foreground"}`}>
                                    {tx.type === "withdrawal" || tx.type === "refund" ? "-" : "+"}{formatCurrency(tx.amount)}
                                </p>
                            </div>
                            <Badge variant={tx.status === "completed" ? "success" : tx.status === "pending" ? "warning" : "danger"} dot>
                                {tx.status}
                            </Badge>
                        </div>
                    </div>
                );
            })}
            {items.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
            )}
        </div>
    );
}
