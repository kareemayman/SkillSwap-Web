import React from "react";
import heroImg from "../../assets/images/hero.png";
import { useTranslation } from "react-i18next";
function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full h-[480px] bg-cover bg-center flex items-center justify-center text-white text-center rounded-[8px]"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* <div className="absolute inset-0 hero-gradient-overlay"></div> */}
      <div className="relative z-10 px-4 md:px-0">
        <h1 className="text-[48px] leading-[60px] tracking-[-2px] text-white mb-4">
          {t("HeroSection.title")}
        </h1>

        <p className="font-normal text-[16px] leading-[24px] tracking-normal text-white mb-8 max-w-2xl mx-auto">
          {t("HeroSection.description")}
        </p>

        <button className="font-manrope bg-black text-white py-3 px-5 rounded-lg shadow-md hover:bg-gray-800 transition duration-300">
          {t("HeroSection.button")}
        </button>
      </div>{" "}
    </section>
  );
}

export default HeroSection;
