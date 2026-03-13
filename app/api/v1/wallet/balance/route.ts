import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/proxy";
import { readDb } from "@/lib/db";

export async function GET(req: Request) {
    const authHeader = req.headers.get("authorization") || "";

    // Try real backend → GET /wallet/balance
    const result = await proxyToBackend({
        path: "/wallet/balance",
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data);
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        return NextResponse.json(db.wallet);
    } catch {
        return NextResponse.json({ totalBalance: 0, escrowLocked: 0, availableBalance: 0, totalEarnings: 0, pendingRelease: 0 });
    }
}
