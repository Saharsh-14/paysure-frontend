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
    if (isAdminRoute(req)) {
        const role = (auth().sessionClaims?.metadata as any)?.role;
        if (role !== "Admin") {
            const url = new URL("/", req.url);
            return Response.redirect(url);
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
