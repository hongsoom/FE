import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import  "../../css/categorySlide.css";

const CategorySlide = ({image}) => {

  SwiperCore.use([Navigation]);

  return (
    <Swiper 
      styele={{
        width : "335px",
        height: "221px" 
      }}
      className="categoryslide-imagecontainer"
      spaceBetween= {10}
      navigation
      slidesPerView={1}
      breakpoints={{
        300: {
            slidesPerView: 1
        }}}>
      {image.map((list, i) => 

      <SwiperSlide 
        styele={{
          width : "335px",
          height: "221px" 
        }}
      className="categoryslide-imagecontent" key={i}>
            <img src={list} alt="image" key={i} />
      </SwiperSlide>
    )}
   </Swiper>
  )
}

export default CategorySlide;