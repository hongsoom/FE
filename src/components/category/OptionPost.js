import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { userAction } from "../../redux/module/post";
import CategorySlide from "./CategorySlide";
import "swiper/css";
import  "../../css/optionPost.css";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const size = 5;

const OptionPost = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.contents);

    const [bookmark, setBookmark] = useState(false);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");

    const onClickBookmark = () => {
      setBookmark(!bookmark);
    }

     const loadLatestPost = () => {

        dispatch(userAction.allGetDB(
            page, size, keyword
        ))
    };
/* 
    const handleScroll = (e) => {
        if (window.innerHeight + window.scrollY + 1 >  
             e.target.documentElement.scrollHeight
        ) {
            setPage(page + 1)
        }
    }  
  */
    useEffect(() => {
        loadLatestPost();
/*         window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchmove', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
        }  */
    },[page]) 

    return (
      <div className="optionpost-container">   
      {posts && posts.map((list, index) => {
         return (
        <div className="optionpost-content" key={index}>
            <div className="optionpost-title">
                <div className="optionpost-user">
                    <img src={list.userImgUrl} alt="profile" />
                    <Link to ={`detail/${list.postId}`}><p>{list.title}</p></Link>
                </div>    
                <div className="optionpost-click">
                    <img src={share} alt="share" className="share-icon"/>
                    {bookmark ? <img onClick={onClickBookmark} src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img onClick={onClickBookmark} src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" />}
                </div>
            </div>
            <Link to ={`detail/${list.postId}`}>
                <CategorySlide image={list.imgUrl} />
            </Link>
            <div className="optionpost-category">
                <Swiper className="optionpost-categorybutton"
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
                <div className="optionpost-heart">
                    <button onClick={() => dispatch(userAction.clickLoveDB(list.postId))}>
                        {list.isLove ? <img src={heartFull} alt="heartFull" /> : <img src={heartEmpty} alt="heartEmpty" /> }
                    </button>
                    <p>{list.loveCount}</p>
                </div>
            </div>
        </div>
    )})}
      </div>
    )
}

export default OptionPost;