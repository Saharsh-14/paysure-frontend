/**
 * Proxy helper: forwards API requests to the real Python backend.
 * Falls back to local JSON DB if the backend is unreachable.
 */

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

interface ProxyOptions {
    method?: string;
    path: string;
    body?: any;
    headers?: Record<string, string>;
    timeout?: number;
}

export async function proxyToBackend(options: ProxyOptions): Promise<{ data: any; ok: boolean }> {
    const { method = "GET", path, body, headers = {}, timeout = 5000 } = options;
    const url = `${BACKEND_URL}${path}`;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            // Backend returned an error — let the caller handle it
            const error = await res.json().catch(() => ({ detail: res.statusText }));
            return { data: error, ok: false };
        }

        const data = await res.json();
        return { data, ok: true };
    } catch (error) {
        // Backend unreachable — caller should fall back to local DB
        return { data: null, ok: false };
    }
}
