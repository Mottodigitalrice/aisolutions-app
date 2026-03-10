import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Problem } from "@/components/marketing/problem";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Features } from "@/components/marketing/features";
import { Pricing } from "@/components/marketing/pricing";
import { RequestSection } from "@/components/marketing/request-section";
import { FAQ } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Pricing />
      <RequestSection />
      <FAQ />
      <Footer />
    </div>
  );
}
