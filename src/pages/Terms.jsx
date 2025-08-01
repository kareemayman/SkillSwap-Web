import React from "react";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation();

  const listItems = t("terms.section4.list", { returnObjects: true });

  return (
    <section className="container max-w-[1300px] mx-auto px-4 py-6 pt-12">
      <h1 className="text-4xl font-extrabold text-[var(--main-color)] mb-6">
        {t("terms.title")}
      </h1>

      <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("terms.section1.title")}
          </h2>
          <p>{t("terms.section1.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("terms.section2.title")}
          </h2>
          <p>{t("terms.section2.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("terms.section3.title")}
          </h2>
          <p>{t("terms.section3.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("terms.section4.title")}
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("terms.section5.title")}
          </h2>
          <p>{t("terms.section5.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("terms.section6.title")}
          </h2>
          <p>{t("terms.section6.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("terms.section7.title")}
          </h2>
          <p>{t("terms.section7.text")}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
            {t("terms.section8.title")}
          </h2>
          <p>
            {t("terms.section8.text")}
            <br />
            📧{" "}
            <a
              href={`mailto:${t("terms.section8.email")}`}
              className="text-[var(--main-color)] underline"
            >
              {t("terms.section8.email")}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
