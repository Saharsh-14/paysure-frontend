import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/proxy";
import { readDb } from "@/lib/db";

export async function GET(req: Request) {
    // Forward auth header to real backend
    const authHeader = req.headers.get("authorization") || "";

    // Try real backend first → GET /projects/my
    const result = await proxyToBackend({
        path: "/projects/my",
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data);
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        return NextResponse.json(db.projects);
    } catch {
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(req: Request) {
    const authHeader = req.headers.get("authorization") || "";
    const body = await req.json();

    // Try real backend first → POST /projects/
    const result = await proxyToBackend({
        method: "POST",
        path: "/projects/",
        body: { title: body.name || body.title, description: body.description || "" },
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data, { status: 201 });
    }

    // Fallback: local JSON DB
    try {
        const { writeDb, generateId } = await import("@/lib/db");
        const db = readDb();
        const newProject = {
            id: generateId("p", db.projects),
            name: body.name || "Untitled Project",
            client: body.client || "Unknown Client",
            freelancer: body.freelancer || "Unassigned",
            totalEscrow: body.totalEscrow || 0,
            releasedAmount: 0,
            status: "pending",
            milestones: body.milestones || 0,
            completedMilestones: 0,
            createdAt: new Date().toISOString().split("T")[0],
        };
        db.projects.push(newProject);
        if (newProject.totalEscrow > 0) {
            db.wallet.escrowLocked += newProject.totalEscrow;
            db.wallet.totalBalance += newProject.totalEscrow;
            db.transactions.push({
                id: generateId("t", db.transactions),
                type: "escrow_lock",
                description: `Escrow deposit for ${newProject.name}`,
                amount: newProject.totalEscrow,
                status: "completed",
                date: newProject.createdAt,
                projectName: newProject.name,
            });
        }
        writeDb(db);
        return NextResponse.json(newProject, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
