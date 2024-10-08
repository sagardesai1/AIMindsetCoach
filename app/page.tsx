import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Faqs from "@/components/Faqs";
import Pricing from "@/components/Pricing";
import Cta from "@/components/Cta";
import HowItWorks from "@/components/HowItWorks";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";
import RewiredMindFeatures from "@/components/RewiredFeatures";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <RewiredMindFeatures />
      {/* <Features /> */}
      <HowItWorks />
      <Faqs />
      <Pricing />
      <Cta />
      <NewsLetter />
      {/* <Footer /> */}
    </main>
  );
}
