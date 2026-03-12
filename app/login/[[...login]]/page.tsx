import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-[#020617]">
            <SignIn path="/login" routing="path" fallbackRedirectUrl="/dashboard" signUpUrl="/signup" />
        </div>
    );
}
