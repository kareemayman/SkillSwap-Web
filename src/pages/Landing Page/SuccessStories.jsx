import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

import Cart from "./components/Cart";
import img1 from "../../assets/images/card-1.png";
import img2 from "../../assets/images/card-2.png";
import img3 from "../../assets/images/card-3.png";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img6.jpg";
import img6 from "../../assets/images/img5.jpg";

import { useTranslation } from "react-i18next";

export default function SuccessStories() {
  const { t, i18n } = useTranslation();

  const stories = [
    {
      imgSrc: img1,
      title: t("SuccessStoriesCards.card1.title"),
      desc: t("SuccessStoriesCards.card1.description"),
    },
    {
      imgSrc: img2,
      title: t("SuccessStoriesCards.card2.title"),
      desc: t("SuccessStoriesCards.card2.description"),
    },
    {
      imgSrc: img3,
      title: t("SuccessStoriesCards.card3.title"),
      desc: t("SuccessStoriesCards.card3.description"),
    },
    {
      imgSrc: img4,
      title: t("SuccessStoriesCards.card4.title"),
      desc: t("SuccessStoriesCards.card4.description"),
    },
    {
      imgSrc: img5,
      title: t("SuccessStoriesCards.card5.title"),
      desc: t("SuccessStoriesCards.card5.description"),
    },
    {
      imgSrc: img6,
      title: t("SuccessStoriesCards.card6.title"),
      desc: t("SuccessStoriesCards.card6.description"),
    },
  ];

  return (
    <section className="text-[var(--main-color)] flex flex-col gap-10 px-4 py-10" style={{ paddingTop: "7rem" }}>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-extrabold">
          {t("SuccessStoriesSection.title")}
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-[720px]">
          {t("SuccessStoriesSection.description")}
        </p>
      </div>

      <div className="w-full">
        <Swiper
          key={i18n.language} // 💡 forces remount on language change
          className="!h-auto custom-swiper-nav"
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={20}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
        >
          {stories.map((story, index) => (
            <SwiperSlide key={index} className="h-auto">
              <Cart
                imgSrc={story.imgSrc}
                imgAlt={`img ${index + 1}`}
                title={story.title}
                desc={story.desc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
