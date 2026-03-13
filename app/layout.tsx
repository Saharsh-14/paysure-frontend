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
                <body className="antialiased bg-background text-foreground">
                    <Providers>
                        <div className="min-h-screen flex flex-col">
                            <div className="flex-1 w-full">
                                {children}
                            </div>
                        </div>
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
