import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "PaySure Dashboard",
    description: "Modern Fintech Escrow Platform",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
