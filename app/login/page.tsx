import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import LoginHeader from "@/components/auth/LoginHeader";
import SocialLogin from "@/components/auth/SocialLogin";

export default function LoginPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary selection:text-white">
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center opacity-60"
                    role="img"
                    aria-label="Abstract dark automotive silhouette with red tail lights in a garage"
                    style={{
                        backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCgbEiq_9VzMJBpSR4RMb1cBCLlKuo2mJjXZBVmWXWfGlYDH5mYkeWtyehBZ_7AhfDe617gJDBdzLbGuxNRLcV1L__8PhQGDWuQFvt8aIM4941da-8XW9WFOXOnzjZv1yQQ4n9Z-MBG0mXPlXWvTm0z9ZexPGmT2A-wOBPH7x8xRCLAB1fnOGdfLoHLzWIKYTKeswjFlHMV92mtRtXf2YOSC6Qgb9e_NGKX2GOKbSr2RR-hQ5lE8GSiTqacM4Ee9FPQrxFItVrZdc")',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/90 to-background-dark"></div>
            </div>

            <LoginHeader />

            <main className="relative z-10 flex-1 flex items-center justify-center p-4">
                <div
                    className="w-full max-w-[480px] border border-input-dark rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                    style={{
                        background: "rgba(34, 17, 18, 0.85)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                    }}
                >
                    <div className="h-1 w-full bg-input-dark">
                        <div className="h-full w-1/3 bg-primary"></div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col gap-8">
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] uppercase italic">
                                Welcome Back
                            </h1>
                            <p className="text-text-muted text-base font-normal">
                                Log in to access your digital garage.
                            </p>
                        </div>
                        <LoginForm />
                        <SocialLogin />
                        <div className="p-6 bg-[#2a1718] border-t border-[#472426] text-center -mx-8 -mb-10 md:-mx-10 md:-mb-10 mt-2">
                            <p className="text-text-muted text-sm">
                                Don't have a garage yet?
                                <Link
                                    href="/register"
                                    className="text-white font-bold hover:text-primary transition-colors ml-1 uppercase tracking-wide"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 py-6 text-center text-xs text-text-muted opacity-50">
                <p>© 2024 Carnottix. All rights reserved.</p>
            </footer>
        </div>
    );
}
