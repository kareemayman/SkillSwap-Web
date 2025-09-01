import React from "react";
import { motion } from "framer-motion";
import img1 from "/images/kareem.jpg";
import img2 from "/images/doa.jpg";
import img3 from "/images/abdelrahman.jpg";
import img4 from "/images/seif.jpg";
import img6 from "/images/kareem.jpg";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const imges = [
    { imgSrc: img1, title: t("about.card1.title"), quote: " Hard work beats talent 🌟" },
    { imgSrc: img3, title: t("about.card3.title"), quote: " Keep pushing forward 🚀" },
    { imgSrc: img2, title: t("about.card2.title"), quote: " Believe in your dream ✨" },
    { imgSrc: img4, title: t("about.card4.title"), quote: " Innovation starts here 💡" },
    { imgSrc: img6, title: t("about.card6.title"), quote: "  Passion drives success 🔥" },
  ];

  const Card = ({ item, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="relative group rounded-[18px] border border-[var(--color-card-border)] glass-card shadow-xl backdrop-blur-md p-4 flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "var(--color-card-content-bg)" }}
    >
      <img
        src={item.imgSrc}
        alt={item.title}
        className="w-full h-[300px] object-cover rounded-lg mb-4"
      />

      <h3 className="text-xl font-bold text-[var(--color-text-primary)] text-center">
        {item.title}
      </h3>

      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px]">
        <p className="text-white text-lg font-semibold">{item.quote}</p>
      </div>
    </motion.div>
  );

  return (
    <section className="container max-w-[1100px] mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[var(--main-color)]">
          {t("about.title")}
        </h1>
        <p className="text-[var(--color-text-secondary)] font-bold mt-2">
          {t("about.description")}
        </p>
      </div>

      <div className="flex flex-col gap-10 items-center">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-3/4">
          {imges.slice(0, 2).map((item, i) => (
            <Card key={i} item={item} delay={i * 0.2} />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative group rounded-[18px] border glass-card shadow-xl backdrop-blur-md p-4 flex flex-col items-center w-full md:w-1/2 overflow-hidden"
          style={{ backgroundColor: "var(--color-card-content-bg)" }}
        >
          <img
            src={imges[2].imgSrc}
            alt={imges[2].title}
            className="w-full h-[360px] object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] text-center">
            {imges[2].title}
          </h3>

          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px]">
            <p className="text-white text-lg font-semibold">{imges[2].quote}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-3/4">
          {imges.slice(3, 5).map((item, i) => (
            <Card key={i} item={item} delay={i * 0.3} />
          ))}
        </div>
      </div>
    </section>
  );
}
