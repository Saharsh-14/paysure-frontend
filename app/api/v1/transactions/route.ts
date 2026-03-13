import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/proxy";
import { readDb } from "@/lib/db";

export async function GET(req: Request) {
    const authHeader = req.headers.get("authorization") || "";

    // Try real backend → GET /transactions/
    const result = await proxyToBackend({
        path: "/transactions/",
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data);
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        return NextResponse.json(db.transactions);
    } catch {
        return NextResponse.json([]);
    }
}
