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
import img4 from "../../assets/images/paint.jpg";
import img5 from "../../assets/images/guitar.jpg";
import img6 from "../../assets/images/swim (1).jpg";

export default function SuccessStories() {
  const stories = [
    {
      imgSrc: img1,
      title: "Photography Enthusiast",
      desc: "Sarah, a passionate photographer, taught her skills to aspiring artists and gained new perspectives in return.",
    },
    {
      imgSrc: img2,
      title: "Coding Mentor",
      desc: "Mark, an experienced software developer, mentored beginners and enhanced his teaching abilities.",
    },
    {
      imgSrc: img3,
      title: "Yoga Instructor",
      desc: "Emily, a certified yoga instructor, expanded her reach and connected with students globally.",
    },
    {
      imgSrc: img4,
      title: "Painting Passion",
      desc: "Layla shared her love for watercolor painting, helping beginners express themselves creatively.",
    },
    {
      imgSrc: img5,
      title: "Guitar Guru",
      desc: "Omar offered beginner guitar lessons to fellow learners and got free singing tips from vocalists on SkillSwap.",
    },
    {
      imgSrc: img6,
      title: "Swimming Coach",
      desc: "Kareem taught swimming techniques online and received nutritional coaching in exchange to improve his fitness routine.",
    },
  ];

  return (
    <section className="text-[#141414] flex flex-col gap-10 px-4 py-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-extrabold">Success Stories</h2>
        <p className="text-base max-w-[720px]">
          See how SkillSwap has transformed lives by enabling skill sharing and personal growth.
        </p>
      </div>

      <div className="w-full ">
        <Swiper
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
            <SwiperSlide key={index} className="h-auto  ">
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
