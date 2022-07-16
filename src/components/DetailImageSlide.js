import React, { useState, useRef, useEffect } from "react";
import "../css/detailImageSlide.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// 아이콘
// import rightArrow from '../assets/rightArrow.png'
// import leftArrow from '../assets/leftArrow.png'

const DetailImageSlide = (props) => {
  const { data } = props;
  SwiperCore.use([Navigation]);

  const [place, setPlace] = useState("");

  useEffect(() => {
    setPlace(data && data.place[0].place_name);
  }, [data]);

  return (
    <div className="detailContainer">
      {/* 선택 장소 이름들 */}
      <div className="detailPlaceNames">
        {data &&
          data.place.map((v, i) => {
            return (
              <div
                className="detailPlaceName"
                key={i}
                onClick={() => {
                  setPlace(v.place_name);
                }}
                style={
                  place === v.place_name
                    ? { background: "skyblue" }
                    : { background: "#fff" }
                }
              >
                {v.place_name}
              </div>
            );
          })}
      </div>

      <div className="detailImgWrap">
        <div className="detailImageContainerPerPlaceWrap">
          {data &&
            data.place.map((l, j) => {
              return (
                <Swiper
                  className="detailImageContainerPerPlace"
                  key={j}
                  style={
                    place === l.place_name
                      ? { display: "flex", width: "333px", height: "250px" }
                      : { display: "none" }
                  }
                  spaceBetween={10}
                  navigation
                  slidesPerView={1}
                  breakpoints={{
                    300: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {l.imgUrl &&
                    l.imgUrl.map((v, i) => (
                      <SwiperSlide
                        className="categoryslide-imagecontent"
                        key={i}
                      >
                        <div
                          className="_detailImg"
                          key={i}
                          style={{
                            height: "250px",
                            width: "333px",
                            backgroundImage: `url(${v})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <img className="_detailImg" src={v} alt="" />
                      </SwiperSlide>
                    ))}
                </Swiper>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailImageSlide;
