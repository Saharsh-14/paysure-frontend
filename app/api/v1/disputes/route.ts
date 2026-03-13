import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/proxy";
import { readDb, writeDb, generateId } from "@/lib/db";

export async function GET(req: Request) {
    const authHeader = req.headers.get("authorization") || "";

    // Try real backend → GET /admin/disputes (gets all disputes)
    const result = await proxyToBackend({
        path: "/admin/disputes",
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data);
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        return NextResponse.json(db.disputes);
    } catch {
        return NextResponse.json([]);
    }
}

export async function POST(req: Request) {
    const authHeader = req.headers.get("authorization") || "";
    const body = await req.json();

    // Try real backend → POST /disputes/
    const result = await proxyToBackend({
        method: "POST",
        path: "/disputes/",
        body: { milestone_id: body.milestoneId || 1, reason: body.reason },
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data, { status: 201 });
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        const newDispute = {
            id: generateId("d", db.disputes),
            projectId: body.projectId || "",
            projectName: body.projectName || "Unknown Project",
            milestoneName: body.milestoneName || "",
            raisedBy: body.raisedBy || "Unknown",
            reason: body.reason || "",
            status: "open",
            createdAt: new Date().toISOString().split("T")[0],
            evidence: 0,
        };
        db.disputes.push(newDispute);
        const projectIdx = db.projects.findIndex((p: any) => p.id === body.projectId);
        if (projectIdx !== -1) {
            db.projects[projectIdx].status = "disputed";
        }
        writeDb(db);
        return NextResponse.json(newDispute, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create dispute" }, { status: 500 });
    }
}
