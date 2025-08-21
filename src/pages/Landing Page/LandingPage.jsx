import HeroSection from "./Hero";
import HowWorkSection from "./HowWork";
import SuccessStories from "./SuccessStories";
import LandingFooter from "./Footer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/context";
export default function LandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
    const { user } = useContext(AuthContext); 
  
    function handleGetStarted() {
      if (user) {
        navigate("/explore"); 
      } else {
        navigate("/login"); 
      }
    }
  

  return (
    <div className="relative">
      <div className="w-full">
        {/* Your buttons and other content */}

        <HeroSection />
        <div className="container max-w-[1300px] mx-auto">
          <HowWorkSection />
          <SuccessStories />

          <section className="flex flex-col justify-center items-center gap-8 px-10 py-20">
            <h2 className="text-4xl font-extrabold text-center text-[var(--main-color)]">
              {t("LandingSection.title")}
            </h2>
            <div className="text-center">
            <button 
              className="relative overflow-hidden px-6 py-3 font-semibold rounded-lg shadow-lg group dark:text-[var(--color-text-light)] text-white/100"
              style={{
                backgroundColor: 'var(--color-btn-submit-bg)'
              }}
              onClick={handleGetStarted}
            >
              <span className="relative z-10 transition duration-1000 group-hover:text-[var(--color-text-dark)]">
                {t("HeroSection.button")}
              </span>
              <span 
                className="absolute left-0 top-0 h-full w-0 transition-all duration-[800ms] ease-in-out group-hover:w-full"
                style={{ backgroundColor: 'var(--color-btn-submit-hover)' }}
              ></span>
            </button>
            </div>
          </section>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
