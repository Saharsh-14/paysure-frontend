"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useConnections, useInvitePartner } from "@/lib/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserPlus, Mail, Loader2, CheckCircle2, ShieldCheck, Briefcase, Code2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnersPage() {
    const { data: connections, isLoading } = useConnections();
    const inviteMutation = useInvitePartner();
    const [email, setEmail] = useState("");

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        try {
            await inviteMutation.mutateAsync(email);
            toast.success("Connection invitation sent!");
            setEmail("");
        } catch (error: any) {
            toast.error(error.response?.data?.detail || "Failed to send invitation");
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
                            Connect with verified professionals to start collaborating.
                        </p>
                    </div>

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
                            disabled={inviteMutation.isPending}
                            className="h-11 rounded-xl px-6 bg-primary hover:bg-primary/90 text-white font-semibold transition-all shadow-lg shadow-primary/20"
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
                </div>

                <hr className="border-border/50" />

                {/* Partners List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-32 rounded-2xl bg-muted/30 animate-pulse border border-border/50" />
                        ))
                    ) : connections?.length > 0 ? (
                        connections.map((conn: any) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={conn.id}
                                className="group relative bg-card/40 backdrop-blur-md border border-border/60 p-5 rounded-2xl hover:border-primary/40 hover:bg-card/60 transition-all duration-300 shadow-sm grow-0 shrink-0"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-xl">
                                            {conn.recipient_id.substring(0, 1)}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-lg">
                                            <div className="bg-emerald-500 w-3 h-3 rounded-full border-2 border-background" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                                                Partner ID: {conn.recipient_id.substring(0, 12)}...
                                            </h3>
                                            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                            <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                Verified Role
                                            </span>
                                            <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 flex items-center gap-2 pt-4 border-t border-border/30">
                                    <Button variant="ghost" className="text-xs h-8 px-3 rounded-lg hover:bg-primary/10 hover:text-primary flex-1">
                                        View Projects
                                    </Button>
                                    <Button variant="ghost" className="text-xs h-8 px-3 rounded-lg hover:bg-muted text-muted-foreground flex-1">
                                        Remove
                                    </Button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center bg-muted/20 border-2 border-dashed border-border/50 rounded-3xl">
                            <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-foreground">No partners yet</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto mt-1">
                                Enter a professional's email address above to invite them to your network.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
