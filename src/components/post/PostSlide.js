import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "../../css/postSlide.css";

const CategorySlide = ({ image, title }) => {
  SwiperCore.use([Navigation]);

  return (
    <Swiper
      styele={{
        width: "335px",
        height: "221px",
      }}
      className="categoryslide-imagecontainer"
      spaceBetween={10}
      navigation
      slidesPerView={1}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
      }}
    >
      {image.map((list, i) => (
        <SwiperSlide
          styele={{
            width: "335px",
            height: "221px",
          }}
          className="categoryslide-imagecontent"
          key={i}
        >
          <img src={list} alt="image" key={i} />
          <div className="title-shadow">{title}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorySlide;
