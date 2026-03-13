import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/proxy";
import { readDb, writeDb } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const authHeader = req.headers.get("authorization") || "";

    // Try real backend → GET /projects/{id}
    const result = await proxyToBackend({
        path: `/projects/${params.id}`,
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data);
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        const project = db.projects.find((p: any) => p.id === params.id);
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        const milestones = db.milestones.filter((m: any) => m.projectId === params.id);
        return NextResponse.json({ ...project, milestoneDetails: milestones });
    } catch (error) {
        return NextResponse.json({ error: "Failed to read project" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const authHeader = req.headers.get("authorization") || "";
    const body = await req.json();

    // Try real backend → PUT /projects/{id}
    const result = await proxyToBackend({
        method: "PUT",
        path: `/projects/${params.id}`,
        body,
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data);
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        const idx = db.projects.findIndex((p: any) => p.id === params.id);
        if (idx === -1) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        db.projects[idx] = { ...db.projects[idx], ...body };
        writeDb(db);
        return NextResponse.json(db.projects[idx]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const authHeader = req.headers.get("authorization") || "";

    // Try real backend → DELETE /projects/{id}
    const result = await proxyToBackend({
        method: "DELETE",
        path: `/projects/${params.id}`,
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data);
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        db.projects = db.projects.filter((p: any) => p.id !== params.id);
        writeDb(db);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
