import { Navbar } from "./navbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
            {/* Background Gradient Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[150px]" />
            </div>

            <Navbar />
            <main className="container mx-auto p-4 md:p-8 relative z-0">
                {children}
            </main>
        </div>
    );
}
