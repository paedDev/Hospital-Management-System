import React from "react";
import Navbar from "../../components/Navbar";
import HomeSection from "./HomeSection";
import Features from "./Features";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <HomeSection />
        <Features />
      </main>
    </>
  );
};

export default LandingPage;
