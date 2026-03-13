import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/projects(.*)",
    "/milestones(.*)",
    "/wallet(.*)",
    "/transactions(.*)",
    "/disputes(.*)",
    "/admin(.*)"
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
    const { userId, sessionClaims } = auth();
    const url = new URL(req.url);
    const role = (sessionClaims?.metadata as any)?.role;

    // If user is logged in, HAS a role, and trying to access landing page, redirect to dashboard
    if (userId && role && url.pathname === "/") {
        return Response.redirect(new URL("/dashboard", req.url));
    }

    if (isAdminRoute(req)) {
        const role = (auth().sessionClaims?.metadata as any)?.role;
        if (role !== "Admin") {
            const redirectUrl = new URL("/", req.url);
            return Response.redirect(redirectUrl);
        }
    }
    if (isProtectedRoute(req)) auth().protect();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
