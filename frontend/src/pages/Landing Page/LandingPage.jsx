import React from "react";
import Navbar from "../../components/Navbar";
import HomeSection from "./HomeSection";
import Features from "./Features";
import Solution from "./Solution";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <HomeSection />
        <Features />
        <Solution />
      </main>
    </>
  );
};

export default LandingPage;
