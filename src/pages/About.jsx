import React from "react";
import Cart from "./Landing Page/components/Cart";
import img1 from "../assets/images/kareem.jpg";
import img2 from "../assets/images/dodo.jpg";
import img3 from "../assets/images/abdelrahman.jpg";
import img4 from "../assets/images/seif.jpg";
import img5 from "../assets/images/Screenshot 2025-07-31 141010.png";
import img6 from "../assets/images/kareem.jpg";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const imges = [
    {
      imgSrc: img1,
      title: t("about.card1.title"),
    },
    {
      imgSrc: img2,
      title: t("about.card2.title"),
    },
    {
      imgSrc: img3,
      title: t("about.card3.title"),
    },
    {
      imgSrc: img4,
      title: t("about.card4.title"),
    },
    {
      imgSrc: img5,
      title: t("about.card5.title"),
    },
    {
      imgSrc: img6,
      title: t("about.card6.title"),
    },
  ];

  return (
    <>
      <section className=" container max-w-[1300px] mx-auto px-4 py-6 pt-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold text-[var(--main-color)]">
            {t("about.title")}
          </h1>
          <p className="text-[var(--color-text-secondary)]  font-bold">
            {t("about.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10">
          {imges.map((item, index) => (
            <div
              key={index}
              className="rounded-[18px] border border-[var(--color-card-border)] shadow-lg glass-card backdrop-blur-md p-4 flex flex-col items-center"
              style={{ backgroundColor: "var(--color-card-content-bg)" }}
            >
              <img
                src={item.imgSrc}
                alt={`img ${index + 1}`}
                className="w-full h-[370px] object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] text-center">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
