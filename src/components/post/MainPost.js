import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    const postId = useSelector((state) => state.post.postId);
    const loveckecked = useSelector((state) => state.post.loveckecked);
    const bookmarkckecked = useSelector((state) => state.post.bookmarkckecked);
  
    const [love, setLove] = useState(loveckecked)
    const [bookmark, setBookmark] =  useState(bookmarkckecked)
  
    console.log(bookmarkckecked)
    console.log(posts)
    
    useEffect(() => {
      setLove(loveckecked)
      setBookmark(bookmarkckecked)
   },[loveckecked, bookmarkckecked]) 

    return (
      <Swiper className="mainpost-container"
      style={{
            width : "335px",
            height: "300px" 
        }}
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
                    <Link to ={`detail/${list.postId}`}><p>{list.title}</p></Link>
                  </div>    
                  <div className="mainpost-click">
                    <img src={share} alt="share" className="mainpost-shareicon"/>
                    <button onClick={() => dispatch(userAction.clickBookmarkDB(list.postId))}>
                      {list.postId === postId  ? ( list.bookmarkStatus === true ? <img src={bookmarkBlue} alt="bookmarkBlue" className="mainpost-bookmarkicon" /> : <img src={bookmarkEmpty} alt="bookmarkEmpty" className="mainpost-bookmarkicon" />) :
                       ( list.bookmarkStatus === true ? <img src={bookmarkBlue} alt="bookmarkBlue" className="mainpost-bookmarkicon" /> : <img src={bookmarkEmpty} alt="bookmarkEmpty" className="mainpost-bookmarkicon" />)}
                    </button> 
                  </div>
                </div>
                <Link to ={`detail/${list.postId}`}>
                  <CategorySlide image={list.imgUrl} />
                </Link>
                <div className="mainpost-category">
                  <Swiper className="mainpost-categorybutton"
                      slidesPerView={1}
                      breakpoints={{
                      300: {
                          slidesPerView: 1
                      }}}>
                          <SwiperSlide className="mainpost-area-button-content">
                              <button className="mainpost-area-button">{list.regionCategory}</button>
                          </SwiperSlide>
                          {list.themeCategory.map((value, index) => {
                          return (
                              <SwiperSlide className="mainpost-theme-button-content" key={index}>
                                  <button className="mainpost-theme-button">{value.themeCategory}</button>
                              </SwiperSlide> 
                          )})}   
                  </Swiper>
                  <div className="mainpost-heart">
                    <button onClick={() => dispatch(userAction.clickLoveDB(list.postId))}>
                        {list.postId === postId ? ( love === true ? <img src={heartFull} alt="heartFull" /> : <img src={heartEmpty} alt="heartEmpty" /> ) :
                          <img src={heartEmpty} alt="heartEmpty" /> }
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