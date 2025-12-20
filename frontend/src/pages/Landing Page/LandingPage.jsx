import React from "react";
import Navbar from "../../components/Navbar";
import HomeSection from "./HomeSection";
import Features from "./Features";
import Solution from "./Solution";
import WhyChooseUs from "./WhyChooseUs";
import FAQ from "./Faq";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <HomeSection />
        <Features />
        <Solution />
        <WhyChooseUs />
        <FAQ />
        <Footer />
      </main>
    </>
  );
};

export default LandingPage;
