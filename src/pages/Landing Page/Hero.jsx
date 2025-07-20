import React from "react";
import img from "../../assets/images/hero.png";
import heroVideo from "../../assets/videos/3249902-uhd_3840_2160_25fps.mp4";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <section className="relative w-full h-[550px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div 
          className="relative z-10 w-full h-full flex items-center justify-center text-center px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 
              className="text-[36px] md:text-[48px] leading-[60px] tracking-[-2px] mb-4"
              style={{ color: 'var(--color-text-light)' }}
            >
              {t("HeroSection.title")}
            </h1>
            <p 
              className="text-[16px] leading-[24px] mb-6 mx-auto"
              style={{ color: 'var(--color-text-light)' }}
            >
              {t("HeroSection.description")}
            </p>
            <button 
              className="relative overflow-hidden px-6 py-3 font-semibold rounded-lg shadow-lg group"
              style={{
                color: 'var(--color-text-dark)',
                backgroundColor: 'var(--color-skill-teach-bg)'
              }}
              onClick={() => navigate('login')}
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
        </div>
      </div>
    </section>
  );
}

export default HeroSection;