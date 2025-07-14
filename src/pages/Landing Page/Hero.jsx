import React from "react";
// import heroVideo from "../../assets/videos/8199326-hd_1920_1080_25fps.mp4"; // Make sure this path is correct
import img from "../../assets/images/hero.png";
function HeroSection() {
  return (
    <section className="relative w-full h-[480px] overflow-hidden rounded-[8px]">
      {/* Background Video */}
      {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      /> */}

      {/* Overlay */}
      <div
        className="w-full h-[450px] bg-cover bg-center "
        style={{ backgroundImage: `url(${img})` }}
      >
        {" "}
        <div className="relative z-10 w-full h-full flex items-center justify-center text-white text-center px-4 bg-black/40">
          <div>
            <h1 className="text-[36px] md:text-[48px] leading-[60px] tracking-[-2px] mb-4">
              Unlock Your Potential Through Skill Sharing
            </h1>
            <p className="text-[16px] leading-[24px] mb-6 max-w-xl mx-auto">
              Connect with a vibrant community of learners and experts. Share
              your skills, learn new ones, and grow together.
            </p>
            <button className="relative overflow-hidden px-4 py-2 font-semibold text-black bg-white rounded-md shadow group">
              <span className="relative z-10 transition duration-1000 group-hover:text-white">
                Get Started
              </span>
              <span className="absolute left-0 top-0 h-full w-0 bg-black transition-all duration-[800ms] ease-in-out group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
