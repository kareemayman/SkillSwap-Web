import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LandingFooter() {
  const { t } = useTranslation();

  return (
    <div className="py-10 px-5 flex flex-col gap-[24px] text-base text-[#737373]">
      <div className="flex flex-wrap justify-center gap-8">
        <Link to="#" className="text-base min-w-[160px] text-[#737373]">
          {t("Footer.about")}
        </Link>
        <Link to="#" className="text-base min-w-[160px] text-[#737373]">
          {t("Footer.contact")}
        </Link>
        <Link to="#" className="text-base min-w-[160px] text-[#737373]">
          {t("Footer.terms")}
        </Link>
        <Link to="#" className="text-base min-w-[160px] text-[#737373]">
          {t("Footer.privacy")}
        </Link>
      </div>
      <p className="text-center">{t("Footer.copyright")}</p>
    </div>
  );
}
