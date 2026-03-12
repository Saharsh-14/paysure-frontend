"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowUpRight } from "lucide-react";

export function ActiveDisputesCard() {
    return (
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl h-full flex flex-col justify-between">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Active Disputes</h3>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-2 h-full flex flex-col justify-end">
                <p className="text-sm text-white/60">
                    You currently have no active disputes. An admin will step in if a milestone delivery escalates.
                </p>

                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80">0 Pending</span>
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80">0 Resolved</span>
                </div>

                <Button variant="glass" className="w-full mt-4 bg-white/5 hover:bg-white/10 border-white/10">
                    Dispute Center <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
            </CardContent>
        </Card>
    );
}
