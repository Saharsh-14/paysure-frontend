import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/proxy";
import { readDb, writeDb } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const authHeader = req.headers.get("authorization") || "";
    const body = await req.json();

    // Try real backend → PUT /milestones/{id}
    const result = await proxyToBackend({
        method: "PUT",
        path: `/milestones/${params.id}`,
        body,
        headers: { Authorization: authHeader },
    });

    if (result.ok) {
        return NextResponse.json(result.data);
    }

    // Fallback: local JSON DB
    try {
        const db = readDb();
        const idx = db.milestones.findIndex((m: any) => m.id === params.id);
        if (idx === -1) {
            return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
        }
        const oldStatus = db.milestones[idx].status;
        db.milestones[idx] = { ...db.milestones[idx], ...body };
        const newStatus = db.milestones[idx].status;

        // If milestone is marked as paid, update project and wallet
        if (oldStatus !== "paid" && newStatus === "paid") {
            const milestone = db.milestones[idx];
            const projectIdx = db.projects.findIndex((p: any) => p.id === milestone.projectId);
            if (projectIdx !== -1) {
                db.projects[projectIdx].releasedAmount += milestone.amount;
                db.projects[projectIdx].completedMilestones += 1;

                // Check if all milestones are completed
                if (db.projects[projectIdx].completedMilestones >= db.projects[projectIdx].milestones) {
                    db.projects[projectIdx].status = "completed";
                }
            }

            // Update wallet
            db.wallet.escrowLocked -= milestone.amount;
            db.wallet.availableBalance += milestone.amount;
            db.wallet.totalEarnings += milestone.amount;

            // Add release transaction
            db.transactions.push({
                id: `t${db.transactions.length + 1}`,
                type: "release",
                description: `Milestone payment: ${milestone.title}`,
                amount: milestone.amount,
                status: "completed",
                date: new Date().toISOString().split("T")[0],
                projectName: milestone.projectName,
            });
        }

        writeDb(db);
        return NextResponse.json(db.milestones[idx]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update milestone" }, { status: 500 });
    }
}
