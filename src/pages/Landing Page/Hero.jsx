import React, { useContext } from "react";
import heroVideo from "/videos/3249902-uhd_3840_2160_25fps.mp4";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/context";
function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const { user } = useContext(AuthContext); // get user state from AuthProvider

  function handleGetStarted() {
    if (user) {
      navigate("/explore"); 
    } else {
      navigate("/login"); 
    }
  }

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
          className="relative z-10 w-full h-full flex items-center justify-center text-center px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 
              className="text-[36px] md:text-[48px] leading-[60px] tracking-[-2px] mb-4 dark:text-[var(--color-text-primary)] text-white"
            >
              {t("HeroSection.title")}
            </h1>
            <p 
              className="text-[16px] leading-[24px] mb-6 mx-auto dark:text-[var(--color-text-secondary)] text-white/85"
            >
              {t("HeroSection.description")}
            </p>
            <button 
              className="relative overflow-hidden px-6 py-3 font-semibold rounded-lg shadow-lg group  text-white"
              style={{
                backgroundColor: 'var(--color-btn-submit-bg)'
              }}
              onClick={handleGetStarted}
            >
              <span className="relative z-10 transition duration-1000 dark:group-hover:text-[var(--color-text-dark)] group-hover:text-white">
                {t("HeroSection.button")}
              </span>
              <span 
                className="absolute left-0 top-0 h-full w-0 transition-all duration-[800ms] ease-in-out group-hover:w-full"
                style={{ backgroundColor: 'var(--color-btn-submit-hover)' }}
              ></span>
            </button>
          </div>
        </div>
    </section>
  );
}

export default HeroSection;