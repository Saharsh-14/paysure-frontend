import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { role } = body;

        if (role) {
            const client = await clerkClient();
            await client.users.updateUserMetadata(userId, {
                publicMetadata: { role }
            });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update role:", error);
        return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
    }
}
