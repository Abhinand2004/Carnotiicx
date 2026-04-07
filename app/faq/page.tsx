import FAQAccordion from "@/components/faq/FAQAccordion";
import FAQCTA from "@/components/faq/FAQCTA";
import FAQFilters from "@/components/faq/FAQFilters";
import FAQHero from "@/components/faq/FAQHero";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function FAQPage() {
    return (
        <>
            <Header />
            <main className="flex-grow flex flex-col items-center min-h-screen bg-background-dark">
                <FAQHero />
                <FAQFilters />
                <FAQAccordion />
                <FAQCTA />
            </main>
            <Footer />
        </>
    );
}
