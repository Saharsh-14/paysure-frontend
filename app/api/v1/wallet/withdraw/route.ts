import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/proxy";
import { readDb, writeDb, generateId } from "@/lib/db";

export async function POST(req: Request) {
    const authHeader = req.headers.get("authorization") || "";
    const body = await req.json();

    // Try real backend → POST /wallet/withdraw
    const result = await proxyToBackend({
        method: "POST",
        path: "/wallet/withdraw",
        body: { amount: body.amount },
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data);
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        const amount = body.amount;
        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }
        if (amount > db.wallet.availableBalance) {
            return NextResponse.json({ error: "Insufficient available balance" }, { status: 400 });
        }
        db.wallet.totalBalance -= amount;
        db.wallet.availableBalance -= amount;
        db.transactions.push({
            id: generateId("t", db.transactions),
            type: "withdrawal",
            description: `Withdrawal to bank account: $${amount}`,
            amount,
            status: "completed",
            date: new Date().toISOString().split("T")[0],
            projectName: null,
        });
        writeDb(db);
        return NextResponse.json({ success: true, wallet: db.wallet });
    } catch {
        return NextResponse.json({ error: "Failed to withdraw" }, { status: 500 });
    }
}
