import React, { useState } from "react";
import "../../css/detailImageSlide.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// 아이콘
// import rightArrow from '../assets/rightArrow.png'
// import leftArrow from '../assets/leftArrow.png'

const DetailImageSlide = (props) => {
  const { data, focus, l, j } = props;
  SwiperCore.use([Navigation]);

  const [place, setPlace] = useState("");

  return (
    <>
      {focus && focus.length !== 0 ? (
        <>
          <div className="detailImageContainerPerPlaceWrap">
            <Swiper
              style={{
                width: "100%",
                height: "256px",
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
              {data &&
                data.place[j] &&
                data.place[j].imgUrl &&
                data.place[j].imgUrl.map((list, index) => (
                  <SwiperSlide
                    style={{
                      width: "343px",
                      height: "256px",
                    }}
                    className="detail_categoryslide-imagecontent"
                    key={index}
                  >
                    <img
                      src={list}
                      alt="장소이미지"
                      style={{ width: "343px" }}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </>
      ) : (
        <>
          <div className="writeImageContainerPerPlaceWrap">
            <Swiper
              style={{
                width: "100%",
                height: "256px",
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
              {data &&
                data.place[j] &&
                data.place[j].imgUrl &&
                data.place[j].imgUrl.map((list, index) => (
                  <SwiperSlide
                    style={{
                      width: "343px",
                      height: "256px",
                    }}
                    className="write_categoryslide-imagecontent"
                    key={index}
                  >
                    <img
                      src={list}
                      alt="장소이미지"
                      style={{ width: "343px" }}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
};

export default DetailImageSlide;
