import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySlide from "../category/CategorySlide";
import  "../../css/mainPost.css";
import profile from "../../assets/profile.png";
import bookmark from "../../assets/bookmark.png";
import share from "../../assets/share.png";
import heart from "../../assets/heart.png";
import test1 from "../../assets/test1.png";
import test2 from "../../assets/test2.png";
import test3 from "../../assets/test3.png";
import test4 from "../../assets/test4.png";
import test5 from "../../assets/test5.png";

const MainPost = () => {
    
    const image = [test1, test2, test3, test4, test5];

    return (
    <Swiper className="swiper-container"
      spaceBetween={50}
      slidesPerView={1}
      breakpoints={{
        300: {
              slidesPerView: 1,
              spaceBetween: 50,
              centeredSlides: false,
          }}}>
      <SwiperSlide>   
        <div className="mainpost-content">
            <div className="mainpost-title">
              <div className="mainpost-user">
                <img src={profile} alt="profile" />
                <p>제목을 입력해주세요</p>
              </div>    
              <div className="mainpost-click">
                <img src={share} alt="share" className="share-icon"/>
                <img src={bookmark} alt="bookmark" className="bookmark-icon" />
              </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
              <div className="mainpost-button">
                <button className="area-button">서울</button>
                <button className="theme-button">먹방</button>
              </div>    
              <div className="mainpost-heart">
                <img src={heart} alt="heart" />
                <p>777</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>   
        <div className="mainpost-content">
            <div className="mainpost-title">
              <div className="mainpost-user">
                <img src={profile} alt="profile" />
                <p>제목을 입력해주세요</p>
              </div>    
              <div className="mainpost-click">
                <img src={share} alt="share" className="share-icon"/>
                <img src={bookmark} alt="bookmark" className="bookmark-icon" />
              </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
              <div className="mainpost-button">
                <button className="area-button">서울</button>
                <button className="theme-button">먹방</button>
              </div>    
              <div className="mainpost-heart">
                <img src={heart} alt="heart" />
                <p>777</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>   
        <div className="mainpost-content">
            <div className="mainpost-title">
              <div className="mainpost-user">
                <img src={profile} alt="profile" />
                <p>제목을 입력해주세요</p>
              </div>    
              <div className="mainpost-click">
                <img src={share} alt="share" className="share-icon"/>
                <img src={bookmark} alt="bookmark" className="bookmark-icon" />
              </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
              <div className="mainpost-button">
                <button className="area-button">서울</button>
                <button className="theme-button">먹방</button>
              </div>    
              <div className="mainpost-heart">
                <img src={heart} alt="heart" />
                <p>777</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>   
        <div className="mainpost-content">
            <div className="mainpost-title">
              <div className="mainpost-user">
                <img src={profile} alt="profile" />
                <p>제목을 입력해주세요</p>
              </div>    
              <div className="mainpost-click">
                <img src={share} alt="share" className="share-icon"/>
                <img src={bookmark} alt="bookmark" className="bookmark-icon" />
              </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
              <div className="mainpost-button">
                <button className="area-button">서울</button>
                <button className="theme-button">먹방</button>
              </div>    
              <div className="mainpost-heart">
                <img src={heart} alt="heart" />
                <p>777</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>   
        <div className="mainpost-content">
            <div className="mainpost-title">
              <div className="mainpost-user">
                <img src={profile} alt="profile" />
                <p>제목을 입력해주세요</p>
              </div>    
              <div className="mainpost-click">
                <img src={share} alt="share" className="share-icon"/>
                <img src={bookmark} alt="bookmark" className="bookmark-icon" />
              </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
              <div className="mainpost-button">
                <button className="area-button">서울</button>
                <button className="theme-button">먹방</button>
              </div>    
              <div className="mainpost-heart">
                <img src={heart} alt="heart" />
                <p>777</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    )
}

export default MainPost;