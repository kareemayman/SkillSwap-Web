import React from "react";
import HeroSection from "./Hero";
import HowWorkSection from "./HowWork";
import SuccessStories from "./SuccessStories";
import LandingFooter from "./Footer";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="w-full bg-white">
        <Button
          value={"Next"}
          onPress={() => {}}
          icon={<FaArrowRight size={14} />}
        />
        <Button
          value={i18n.language === "en" ? "English" : "العربية"}
          onPress={() =>
            i18n.language === "en"
              ? i18n.changeLanguage("ar")
              : i18n.changeLanguage("en")
          }
          variant="secondary"
        />

        <HeroSection />
        <div className="container max-w-[1000px] mx-auto">
          <HowWorkSection />
          <SuccessStories />

          <section className="flex flex-col justify-content:center align-center gap-8 px-10 py-20">
            <h2 className="text-4xl font-extrabold text-center">
              {t("LandingSection.title")}
            </h2>
            <div className="text-center">
              <button className="font-manrope bg-black text-white py-3 px-5 rounded-lg shadow-md hover:bg-gray-800 transition duration-300">
                {t("LandingSection.button")}
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
