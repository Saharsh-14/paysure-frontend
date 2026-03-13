import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                border: "var(--border)",
                escrow: {
                    locked: "var(--escrow-locked)",
                    released: "var(--escrow-released)",
                    pending: "var(--escrow-pending)",
                    disputed: "var(--escrow-disputed)",
                    completed: "var(--escrow-completed)",
                },
                sidebar: {
                    bg: "var(--sidebar-bg)",
                    border: "var(--sidebar-border)",
                    text: "var(--sidebar-text)",
                    active: "var(--sidebar-active)",
                    hover: "var(--sidebar-hover)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                "float": "float 4s ease-in-out infinite",
                "float-slow": "float-slow 6s ease-in-out infinite",
                "float-delayed": "float-delayed 5s ease-in-out infinite 0.5s",
                "shimmer": "shimmer 2s linear infinite",
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
export default config;
