import React from "react";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <section className="container max-w-[1300px] mx-auto px-4 py-6 pt-12">
      <h1 className="text-4xl font-extrabold text-[var(--main-color)] mb-6">
        {t("privacy.title")}
      </h1>

      <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("privacy.section1.title")}
          </h2>
          <p>{t("privacy.section1.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("privacy.section2.title")}
          </h2>
          <p>{t("privacy.section2.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("privacy.section3.title")}
          </h2>
          <p>{t("privacy.section3.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("privacy.section4.title")}
          </h2>
          <p>{t("privacy.section4.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("privacy.section5.title")}
          </h2>
          <p>{t("privacy.section5.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("privacy.section6.title")}
          </h2>
          <p>{t("privacy.section6.text")}</p>
        </div>
      </div>
    </section>
  );
}
