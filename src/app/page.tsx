import AboutUsSection from "@/components/aboutsection/about-us-section";
import HeroBanner from "@/components/banner/hero-banner";
import FloatingChatbot from "@/components/chatbot/floating-chatbot";
import ContactHeader from "@/components/contactHeader/contact-header";
import WhyChooseUs from "@/components/CoreFeatures/why-choose-us";
import PopularProducts from "@/components/popularproduct/popular-products";
import ServiceSection from "@/components/service/ServiceSection";
import MeetOurTeam from "@/components/team/meet-our-team";
import TestimonialsSection from "@/components/testimonials/testimonials-section";

export default function Home() {
  return (
    <div className="">
      <HeroBanner/>
      <AboutUsSection/>
      <ServiceSection/>
      <ContactHeader/>
      <PopularProducts/>
      <MeetOurTeam/>
      <WhyChooseUs/>
      <TestimonialsSection/>
      <FloatingChatbot/>
    </div>
  );
}
