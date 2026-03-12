"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { useMemo } from "react";

export function useApi() {
    const { getToken } = useAuth();

    const authenticatedApi = useMemo(() => {
        const instance = api;
        instance.interceptors.request.use(async (config) => {
            const token = await getToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        return instance;
    }, [getToken]);

    return authenticatedApi;
}

// Example Data Hooks
export function useProjects() {
    const api = useApi();
    return useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const res = await api.get("/projects");
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
