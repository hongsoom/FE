import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySlide from "../category/CategorySlide";
import  "../../css/mainPost.css";
import profile from "../../assets/profile.png";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartBlue from "../../assets/heart-blue.png";
import test1 from "../../assets/test1.png";
import test2 from "../../assets/test2.png";
import test3 from "../../assets/test3.png";
import test4 from "../../assets/test4.png";
import test5 from "../../assets/test5.png";

const MainPost = () => {
    
    const image = [test1, test2, test3, test4, test5];
    const [bookmark, setBookmark] = useState(false);
    const [heart, setHeart] = useState(false);

    const onClickBookmark = () => {
      setBookmark(!bookmark);
    }

    const onClickHeart = () => {
      setHeart(!heart);
    }

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
                {bookmark ? <img onClick={onClickBookmark} src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img onClick={onClickBookmark} src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" />}
              </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
              <div className="mainpost-button">
                <button className="area-button">서울</button>
                <button className="theme-button">먹방</button>
              </div>    
              <div className="mainpost-heart">
                {heart ? <img onClick={onClickHeart} src={heartBlue} alt="heartBlue" /> : <img onClick={onClickHeart} src={heartEmpty} alt="heartEmpty" /> }
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
                {bookmark ? <img onClick={onClickBookmark} src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img onClick={onClickBookmark} src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" />}
              </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
              <div className="mainpost-button">
                <button className="area-button">서울</button>
                <button className="theme-button">먹방</button>
              </div>    
              <div className="mainpost-heart">
                {heart ? <img onClick={onClickHeart} src={heartBlue} alt="heartBlue" /> : <img onClick={onClickHeart} src={heartEmpty} alt="heartEmpty" /> }
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
                {bookmark ? <img onClick={onClickBookmark} src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img onClick={onClickBookmark} src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" />}
              </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
              <div className="mainpost-button">
                <button className="area-button">서울</button>
                <button className="theme-button">먹방</button>
              </div>    
              <div className="mainpost-heart">
                {heart ? <img onClick={onClickHeart} src={heartBlue} alt="heartBlue" /> : <img onClick={onClickHeart} src={heartEmpty} alt="heartEmpty" /> }
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
                {bookmark ? <img onClick={onClickBookmark} src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img onClick={onClickBookmark} src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" />}
              </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
              <div className="mainpost-button">
                <button className="area-button">서울</button>
                <button className="theme-button">먹방</button>
              </div>    
              <div className="mainpost-heart">
                {heart ? <img onClick={onClickHeart} src={heartBlue} alt="heartBlue" /> : <img onClick={onClickHeart} src={heartEmpty} alt="heartEmpty" /> }
                <p>777</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    )
}

export default MainPost;