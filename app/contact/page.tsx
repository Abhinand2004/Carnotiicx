import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pb-20">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Red Glow Top Right */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          {/* Dark texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 pt-12 lg:pt-20">
          <ContactHero />
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
