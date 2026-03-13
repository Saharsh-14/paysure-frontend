import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor will be configured in a client component or provider
// but we define the exportable instance here.
export default api;
