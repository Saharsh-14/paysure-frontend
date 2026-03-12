"use client";

import { AlertCircle } from "lucide-react";

export function TransactionList() {
    const transactions = [
        { id: 1, type: "Escrow Deposit - E-commerce", amount: 1500, status: "completed", date: "Oct 24, 2026", token: "USD" },
        { id: 2, type: "Milestone Paid - App MVP", amount: 500, status: "completed", date: "Oct 22, 2026", token: "USD" },
        { id: 3, type: "Withdrawal", amount: 200, status: "pending", date: "Oct 20, 2026", token: "USD" },
    ];

    return (
        <div className="space-y-4 w-full">
            {transactions.map((tx) => (
                <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{tx.type}</p>
                            <p className="text-xs text-white/50">{tx.date}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-white">
                            {tx.amount} {tx.token}
                        </p>
                        <p className={`text-xs capitalize ${tx.status === "completed" ? "text-emerald-400" : "text-amber-400"}`}>
                            {tx.status}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
