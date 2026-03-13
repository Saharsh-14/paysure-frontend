"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

/* ─── Authenticated API Instance ──────────────────────────── */
export function useApi() {
    return api;
}

/* ─── Query Hooks ─────────────────────────────────────────── */

export function useUserProfile() {
    const api = useApi();
    return useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const res = await api.get("/users/me");
            return res.data;
        },
    });
}

export function useProjects() {
    const api = useApi();
    return useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const res = await api.get("/projects/my");
            return res.data;
        },
        refetchInterval: 5000, 
    });
}

export function useMilestones() {
    const api = useApi();
    return useQuery({
        queryKey: ["milestones"],
        queryFn: async () => {
            const res = await api.get("/milestones");
            return res.data;
        },
        refetchInterval: 5000,
    });
}

export function useTransactions() {
    const api = useApi();
    return useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const res = await api.get("/transactions");
            return res.data;
        },
    });
}

export function useDisputes() {
    const api = useApi();
    return useQuery({
        queryKey: ["disputes"],
        queryFn: async () => {
            const res = await api.get("/disputes");
            return res.data;
        },
    });
}

export function useWalletBalance() {
    const api = useApi();
    return useQuery({
        queryKey: ["wallet-balance"],
        queryFn: async () => {
            const res = await api.get("/wallet/balance");
            return res.data;
        },
    });
}

export function useConnections() {
    const api = useApi();
    return useQuery({
        queryKey: ["connections"],
        queryFn: async () => {
            const res = await api.get("/connections/my");
            return res.data;
        },
    });
}

export function useUserLookup(email: string) {
    const api = useApi();
    return useQuery({
        queryKey: ["user-lookup", email],
        queryFn: async () => {
            if (!email || !email.includes("@")) return null;
            const res = await api.get(`/users/lookup?email=${encodeURIComponent(email)}`);
            return res.data;
        },
        enabled: !!email && email.includes("@"),
        retry: false, // Don't keep retrying if the user is typing and hits a 404
    });
}

/* ─── Mutation Hooks ──────────────────────────────────────── */

export function useCreateProject() {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {
            title: string;
            description?: string;
            other_party_email: string;
        }) => {
            const res = await api.post("/projects", data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
    });
}

export function useDeposit() {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (amount: number) => {
            const res = await api.post("/wallet/deposit", { amount });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
    });
}

export function useWithdraw() {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (amount: number) => {
            const res = await api.post("/wallet/withdraw", { amount });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
    });
}

export function useRaiseDispute() {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {
            projectId: string;
            projectName: string;
            milestoneName: string;
            raisedBy: string;
            reason: string;
        }) => {
            const res = await api.post("/disputes", data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["disputes"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

export function useSubmitMilestone() {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (milestoneId: number) => {
            const res = await api.put(`/milestones/${milestoneId}/complete`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["milestones"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

export function useApproveMilestone() {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (milestoneId: number) => {
            const res = await api.put(`/milestones/${milestoneId}/approve`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["milestones"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
    });
}

export function useInvitePartner() {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (email: string) => {
            const res = await api.post("/connections/invite", { email });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["connections"] });
        },
    });
}
export function useAcceptInvitation() {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (connectionId: number) => {
            const res = await api.post(`/connections/${connectionId}/accept`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["connections"] });
        },
    });
}

export function useRejectInvitation() {
    const api = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (connectionId: number) => {
            const res = await api.post(`/connections/${connectionId}/reject`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["connections"] });
        },
    });
}
