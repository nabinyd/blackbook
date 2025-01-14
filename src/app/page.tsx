import Testimonials from "@/shared/components/Testimonials";
import HomePage from "./home/HomePage";
import ShareProjectBanner from "@/shared/components/ShareProjectBanner";
import LatestProject from "./project/_component/LatestProject";
import FAQ from "@/shared/components/Faqs";
import CTA from "@/shared/components/CallToAction";
import PartnersAndCollaboration from "@/shared/components/PartnersAndCollaboration";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HomePage />
      {/* Latest Projects Section */}
      <LatestProject />
      <ShareProjectBanner />
      <Testimonials />
      <FAQ />
      <CTA />
      <PartnersAndCollaboration />
    </div>
  );
}
