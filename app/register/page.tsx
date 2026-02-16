import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import RegisterPromo from "@/components/auth/RegisterPromo";
import RegisterForm from "@/components/auth/RegisterForm";
import Footer from "@/components/footer/Footer";

export default function RegisterPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased overflow-x-hidden min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-border-dark/50 bg-background-dark/90 backdrop-blur-md">
                <div className="max-w-[1440px] mx-auto">
                    <Navbar />
                </div>
            </header>

            <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 py-12 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[700px]">
                    <RegisterPromo />
                    <RegisterForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}
