"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { 
    useConnections, 
    useInvitePartner, 
    useUserLookup, 
    useUserProfile,
    useAcceptInvitation,
    useRejectInvitation
} from "@/lib/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Users, 
    UserPlus, 
    Mail, 
    Loader2, 
    CheckCircle2, 
    ShieldCheck, 
    Briefcase, 
    Clock, 
    XCircle,
    Check
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { useUser } from "@clerk/nextjs";

export default function PartnersPage() {
    const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
    const { data: userProfile } = useUserProfile();
    const { data: connections, isLoading } = useConnections();
    
    const inviteMutation = useInvitePartner();
    const acceptMutation = useAcceptInvitation();
    const rejectMutation = useRejectInvitation();
    
    const [email, setEmail] = useState("");
    const { data: lookedUpUser, isLoading: isLookingUp } = useUserLookup(email);

    // Standardize role detection with Sidebar.tsx
    const rawRole = (clerkUser?.publicMetadata?.role as string) || "Freelancer";
    const roleLabel = rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase();
    const isClient = roleLabel === "Client";

    // Wait for session to avoid logic glitches (like inverted search showing before role is known)
    if (!isUserLoaded) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        try {
            await inviteMutation.mutateAsync(email);
            toast.success("Connection invitation sent!");
            setEmail("");
        } catch (error: any) {
            const detail = error.response?.data?.detail || "Failed to send invitation";
            toast.error(detail);
        }
    };

    const handleAccept = async (id: number) => {
        try {
            await acceptMutation.mutateAsync(id);
            toast.success("Invitation accepted!");
        } catch (error: any) {
            toast.error("Failed to accept invitation");
        }
    };

    const handleReject = async (id: number) => {
        try {
            await rejectMutation.mutateAsync(id);
            toast.success("Invitation removed.");
        } catch (error: any) {
            toast.error("Failed to remove connection");
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8 py-4 px-2 sm:px-0">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <Users className="w-8 h-8 text-primary" />
                            My Partners
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            {isClient 
                                ? "Connect with verified professionals to start collaborating."
                                : "Manage your connections with clients."}
                        </p>
                    </div>

                    {isClient && (
                        <form onSubmit={handleInvite} className="flex gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:w-72">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="partner@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11 rounded-xl border-border bg-card/50 focus:ring-primary/20"
                                    required
                                />
                            </div>
                            <Button 
                                disabled={inviteMutation.isPending || !lookedUpUser}
                                className={`h-11 rounded-xl px-6 font-semibold transition-all shadow-lg ${
                                    !lookedUpUser 
                                        ? "bg-muted text-muted-foreground cursor-not-allowed shadow-none" 
                                        : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                                }`}
                            >
                                {inviteMutation.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Invite
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </div>

                {/* Real-time Feedback for Lookup */}
                <AnimatePresence>
                    {isClient && email.includes("@") && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-card/30 border border-dashed border-border/50 rounded-2xl p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                {isLookingUp ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                ) : lookedUpUser ? (
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {isLookingUp ? "Looking for professional..." : lookedUpUser ? lookedUpUser.full_name : "Enter email to search"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {lookedUpUser ? `${lookedUpUser.role} • Ready to connect` : "Searching verified PaySure users"}
                                    </p>
                                </div>
                            </div>
                            
                            {!isLookingUp && email.includes("@") && !lookedUpUser && (
                                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                                    Not Registered
                                </span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <hr className="border-border/50" />

                {/* Partners List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-32 rounded-2xl bg-muted/30 animate-pulse border border-border/50" />
                        ))
                    ) : connections?.length > 0 ? (
                        connections.map((conn: any) => {
                            // Use clerkUser.id for the most reliable identity check
                            const currentId = clerkUser?.id;
                            const isSender = conn.sender_id === currentId;
                            const partnerName = isSender ? conn.recipient_name : conn.sender_name;
                            const partnerEmail = isSender ? conn.recipient_email : conn.sender_email;
                            const isPending = conn.status === "PENDING";

                            return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    key={conn.id}
                                    className={`group relative bg-card/40 backdrop-blur-md border border-border/60 p-5 rounded-2xl transition-all duration-300 shadow-sm ${
                                        isPending ? "border-amber-500/30 bg-amber-500/5" : "hover:border-primary/40 hover:bg-card/60"
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border font-bold text-xl ${
                                                isPending 
                                                    ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
                                                    : "bg-primary/10 border-primary/20 text-primary"
                                            }`}>
                                                {partnerName?.substring(0, 1) || "?"}
                                            </div>
                                            {!isPending && (
                                                <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-lg">
                                                    <div className="bg-emerald-500 w-3 h-3 rounded-full border-2 border-background" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                                                    {partnerName || "Unknown User"}
                                                </h3>
                                                {!isPending && <ShieldCheck className="w-4 h-4 text-primary shrink-0" />}
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate mb-2">
                                                {partnerEmail}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs font-medium">
                                                {isPending ? (
                                                    <span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-md">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {isSender ? "Waiting for response" : "Invitation Received"}
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        Connected
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex items-center gap-2 pt-4 border-t border-border/30">
                                        {isPending && !isSender ? (
                                            <>
                                                <Button 
                                                    onClick={() => handleAccept(conn.id)}
                                                    disabled={acceptMutation.isPending}
                                                    className="text-xs h-8 px-3 rounded-lg bg-primary hover:bg-primary/90 text-white flex-1"
                                                >
                                                    {acceptMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Check className="w-3 h-3 mr-1" /> Accept</>}
                                                </Button>
                                                <Button 
                                                    onClick={() => handleReject(conn.id)}
                                                    disabled={rejectMutation.isPending}
                                                    variant="outline"
                                                    className="text-xs h-8 px-3 rounded-lg border-red-500/30 text-red-500 hover:bg-red-500/10 flex-1"
                                                >
                                                    {rejectMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <><XCircle className="w-3 h-3 mr-1" /> Reject</>}
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="ghost" className="text-xs h-8 px-3 rounded-lg hover:bg-primary/10 hover:text-primary flex-1">
                                                    View Projects
                                                </Button>
                                                <Button 
                                                    onClick={() => handleReject(conn.id)}
                                                    variant="ghost" 
                                                    className="text-xs h-8 px-3 rounded-lg hover:bg-muted text-muted-foreground flex-1"
                                                >
                                                    {isPending ? "Cancel" : "Remove"}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-16 text-center bg-muted/20 border-2 border-dashed border-border/50 rounded-3xl">
                            <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-foreground">No partners yet</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto mt-1">
                                {isClient 
                                    ? "Enter a professional's email address above to invite them to your network."
                                    : "You don't have any connection requests yet."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
