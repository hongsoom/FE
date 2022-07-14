import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySlide from "../category/CategorySlide";
import  "../../css/mainPost.css";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const MainPost = () => {
    const dispatch = useDispatch();
    
    const posts = useSelector((state) => state.post.bookmarkcontents);
    const loveckecked = useSelector((state) => state.post.loveckecked);
    const bookmarkckecked = useSelector((state) => state.post.bookmarkckecked);

    console.log(posts)
    console.log(loveckecked)
    console.log(bookmarkckecked)

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
        {posts && posts.map((list, i) => {
          return (
          <SwiperSlide key={i}>   
            <div className="mainpost-content">
                <div className="mainpost-title">
                  <div className="mainpost-user">
                    <img src={list.userImgUrl} alt="profile" />
                    <p>{list.title}</p>
                  </div>    
                  <div className="mainpost-click">
                    <img src={share} alt="share" className="share-icon"/>
                    <button onClick={() => dispatch(userAction.clickBookmarkDB(list.postId))}>
                        {bookmarkckecked ? <img src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" /> }
                    </button> 
                  </div>
                </div>
                <CategorySlide image={list.imgUrl} />
                <div className="mainpost-category">
                <Swiper className="mainpost-categorybutton"
                    slidesPerView={1}
                    breakpoints={{
                    300: {
                        slidesPerView: 1
                    }}}>
                        <SwiperSlide className="area-button-content">
                            <button className="area-button">{list.regionCategory}</button>
                        </SwiperSlide>
                        {list.themeCategory.map((value, index) => {
                        return (
                            <SwiperSlide className="theme-button-content" key={index}>
                                <button className="theme-button">{value.themeCategory}</button>
                            </SwiperSlide> 
                        )})}   
                </Swiper>
                  <div className="mainpost-heart">
                    <button onClick={() => dispatch(userAction.clickLoveDB(list.postId))}>
                        {loveckecked ? <img src={heartFull} alt="heartFull" /> : <img src={heartEmpty} alt="heartEmpty" /> }
                      </button>
                    <p>{list.loveCount}</p>
                  </div>
                </div>
              </div>
          </SwiperSlide>      
        )})}
        </Swiper>
    )
}

export default MainPost;