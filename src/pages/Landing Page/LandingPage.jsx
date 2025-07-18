import React from "react";
import HeroSection from "./Hero";
import HowWorkSection from "./HowWork";
import SuccessStories from "./SuccessStories";
import LandingFooter from "./Footer";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import Header from "../../components/Header";

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="relative">
      <div className="w-full">
        {/* Your buttons and other content */}

        <Header>
          <Button
            value={i18n.language === "en" ? "English" : "العربية"}
            onPress={() =>
              i18n.language === "en"
                ? i18n.changeLanguage("ar")
                : i18n.changeLanguage("en")
            }
            variant="secondary"
          />
          <Button
          value={"Next"}
          onPress={() => {}}
          icon={<FaArrowRight size={14} />}
        />
        </Header>
        

        <HeroSection />
        <div className="container max-w-[1300px] mx-auto">
          <HowWorkSection />
          <SuccessStories />

          <section className="flex flex-col justify-center items-center gap-8 px-10 py-20">
            <h2 className="text-4xl font-extrabold text-center">
              {t("LandingSection.title")}
            </h2>
            <div className="text-center">
            <button 
              className="relative overflow-hidden px-6 py-3 font-semibold rounded-lg shadow-lg group"
              style={{
                color: 'var(--color-text-dark)',
                backgroundColor: 'var(--color-skill-teach-bg)'
              }}
            >
              <span className="relative z-10 transition duration-1000 group-hover:text-[var(--color-text-light)]">
                {t("HeroSection.button")}
              </span>
              <span 
                className="absolute left-0 top-0 h-full w-0 transition-all duration-[800ms] ease-in-out group-hover:w-full"
                style={{ backgroundColor: 'var(--color-btn-submit-bg)' }}
              ></span>
            </button>
            </div>
          </section>
        </div>  
      </div>
      
      {/* Remove the container wrapper from around the footer */}
      <LandingFooter />
    </div>
  );
}