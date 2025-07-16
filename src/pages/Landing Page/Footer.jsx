import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import img from "../../assets/images/wave3.svg";

export default function LandingFooter() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full  mt-20">
      <div className="relative z-10 max-w-[1000px] mx-auto px-5 py-12">
        <div className="flex flex-wrap justify-center gap-8 mb-6">
          <Link 
            to="#" 
            className="text-base min-w-[160px] text-center hover:text-[var(--color-text-primary)] transition-colors"
          >
            {t("Footer.about")}
          </Link>
          <Link 
            to="#" 
            className="text-base min-w-[160px] text-center hover:text-[var(--color-text-primary)] transition-colors"
          >
            {t("Footer.contact")}
          </Link>
          <Link 
            to="#" 
            className="text-base min-w-[160px] text-center hover:text-[var(--color-text-primary)] transition-colors"
          >
            {t("Footer.terms")}
          </Link>
          <Link 
            to="#" 
            className="text-base min-w-[160px] text-center hover:text-[var(--color-text-primary)] transition-colors"
          >
            {t("Footer.privacy")}
          </Link>
        </div>
        
        <p className="text-center text-[var(--color-text-secondary)]">
          {t("Footer.copyright")}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-0">
        <img 
          src={img} 
          alt="decorative wave" 
          className="w-full h-auto object-cover" 
          style={{ minHeight: '80px' }}
        />
      </div>
    </div>
  );
}