import React from "react";
import HeroSection from "./Hero";
import HowWorkSection from "./HowWork";
import SuccessStories from "./SuccessStories";
import LandingFooter from "./Footer";

export default function LandingPage() {
  return (
    <>
      <div className="w-full bg-white">
        <HeroSection />
        <div className="container max-w-[1000px] mx-auto">
          <HowWorkSection />
          <SuccessStories />

          <section className="flex flex-col justify-content:center align-center gap-8 px-10 py-20">
            <h2 className="text-4xl font-extrabold text-center">
              Ready to Start Your Skill Sharing Journey?
            </h2>
            <div className="text-center">
              <button className="relative overflow-hidden px-4 py-2 font-semibold text-white bg-black rounded-md shadow group">
                <span className="relative z-10 transition duration-1000 group-hover:text-black">
                  Get Started
                </span>
                <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-[800ms] ease-in-out group-hover:w-full"></span>
              </button>
            </div>
          </section>
        </div>
      </div>
      <div className="w-full bg-[#F7FAFC]">
        <div className="container max-w-[1000px] mx-auto">
          <LandingFooter />
        </div>
      </div>
    </>
  );
}
