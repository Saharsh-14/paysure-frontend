import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-[#020617]">
            <SignUp path="/signup" routing="path" fallbackRedirectUrl="/sync-user" signInUrl="/login" />
        </div>
    );
}
