import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PostItem from "../post/PostItem";

const BookmarkPost = (props) => {
  const { bookmarkcontents } = props;

  return (
    <Swiper
      style={{
        width: "335px",
      }}
      spaceBetween={50}
      slidesPerView={1}
      breakpoints={{
        300: {
          slidesPerView: 1,
          spaceBetween: 50,
          centeredSlides: false,
        },
      }}
    >
      {bookmarkcontents &&
        bookmarkcontents.map((list, i) => {
          return (
            <div className="bookmarkpost-content" key={i}>
              <SwiperSlide key={i}>
                <PostItem key={i} {...list} />
              </SwiperSlide>
            </div>
          );
        })}
    </Swiper>
  );
};

export default BookmarkPost;
