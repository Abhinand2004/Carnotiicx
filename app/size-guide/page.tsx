import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ReferencePilots from "@/components/size-guide/ReferencePilots";
import SizeExplainer from "@/components/size-guide/SizeExplainer";
import SizeHero from "@/components/size-guide/SizeHero";
import SizeSpecs from "@/components/size-guide/SizeSpecs";

export default function SizeGuidePage() {
    return (
        <>
            <Header />
            <main className="flex-1 bg-background-light dark:bg-background-dark min-h-screen">
                <SizeHero />
                <SizeExplainer />
                <SizeSpecs />
                <ReferencePilots />
            </main>
            <Footer />
        </>
    );
}
