import React from "react";
import Cart from "./components/Cart";
import icon1 from "../../assets/images/icon-1.svg";
import icon2 from "../../assets/images/icon-2.svg";
import icon3 from "../../assets/images/icon-3.svg";
import { useTranslation } from "react-i18next";
export default function HowWorkSection() {
  const { t } = useTranslation();

  return (
    <section className="text-[var(--color-text-primary)] flex flex-col gap-10 px-4 py-20">
      <div className="container max-w-[1300px] mx-auto">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-extrabold text-[var(--main-color)]">
            {t("HowWorkSection.title")}
          </h2>

          <p className="text-[var(--color-text-secondary)] max-w-[720px]">
            {t("HowWorkSection.description")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-5">
          <div className="w-full md:w-1/3">
            <Cart
              imgSrc={icon1}
              imgAlt="icon 1"
              title={t("HowWorksCards.card1.title")}
              desc={t("HowWorksCards.card1.description")}
              isIcon
            />
          </div>
          <div className="w-full md:w-1/3">
            <Cart
              imgSrc={icon2}
              imgAlt="icon 2"
              title={t("HowWorksCards.card2.title")}
              desc={t("HowWorksCards.card2.description")}
              isIcon
            />
          </div>
          <div className="w-full md:w-1/3">
            <Cart
              imgSrc={icon3}
              imgAlt="icon 3"
              title={t("HowWorksCards.card3.title")}
              desc={t("HowWorksCards.card3.description")}
              isIcon
            />
          </div>
        </div>
      </div>
    </section>
  );
}
