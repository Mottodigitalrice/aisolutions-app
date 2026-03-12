import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Stats } from "@/components/marketing/stats";
import { Problem } from "@/components/marketing/problem";
import { DemoShowcase } from "@/components/marketing/demo-showcase";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Features } from "@/components/marketing/features";
import { Pricing } from "@/components/marketing/pricing";
import { Trust } from "@/components/marketing/trust";
import { RequestSection } from "@/components/marketing/request-section";
import { FAQ } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Problem />
      <DemoShowcase />
      <HowItWorks />
      <Features />
      <Pricing />
      <Trust />
      <FAQ />
      <RequestSection />
      <Footer />
    </div>
  );
}
