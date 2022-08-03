import React from "react";
import "../../css/detailImageSlide.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

const DetailImageSlide = (props) => {
  const { data, j } = props;
  SwiperCore.use([Navigation]);
  
  return (
    <>
      {data && data.place[j] && data.place[j].imgUrl&&data.place[j].imgUrl.length === 0 ? (
        <div className="infoNoPicWrap">
          <div
            className="linkToMore"
            onClick={() => {
              window.open(`${data.place[j].place_url}`, "_blank");
            }}
          >
            {data.place[j].place_name} 사진 보러가기 📸
          </div>
        </div>
      ) : (
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
                  <img src={list} alt="장소이미지" style={{ width: "343px" }} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default DetailImageSlide;
