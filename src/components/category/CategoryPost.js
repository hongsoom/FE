import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import {Link} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySlide from "./CategorySlide";
import "swiper/css";
import  "../../css/categoryPost.css";
import profile from "../../assets/profile.png";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartBlue from "../../assets/heart-blue.png";

const size = 5;

const CategoryPost = (props) => {

    const dispatch = useDispatch();

    const { region, price, theme } = props;

    const posts = useSelector((state) => state.post.contents);

    const [bookmark, setBookmark] = useState(false);
    const [heart, setHeart] = useState(false);
    const [page, setPage] = useState(0);

    console.log(region, price, theme)

    const checkHasIncode = keyword => {
  
        const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      
        if (keyword.match(check_kor)) {
          const encodeKeyword = encodeURI(keyword); 
          return encodeKeyword;
        } else {
          return keyword;
        }
      };

    const onClickBookmark = () => {
      setBookmark(!bookmark);
    }

    const onClickHeart = () => {
      setHeart(!heart);
    }
 
    const loadLatestPost = () => {
        dispatch(userAction.filterGETDB(
            checkHasIncode(region), checkHasIncode(price), checkHasIncode(theme), size, page
        ))
    }; 

/*     const handleScroll = (e) => {
        if (window.innerHeight +  e.target.documentElement.scrollTop +1 >  
             e.target.documentElement.scrollHeight
        ) {
            setPage(page + 1)
        }
    }  */
 
    useEffect(() => {
        loadLatestPost();
/*         window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchmove', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
        } */
    },[page, price, theme, region])

    useEffect(() => {
        return () => {
            dispatch(userAction.clearDB());
            setPage(0);
        }
    },[region])

    return (
      <div className="categorypost-container">   
      {posts && posts.map((list, index) => {
        return (
        <div className="categorypost-content" key={index}>
            <div className="categorypost-title">
                <div className="categorypost-user">
                    <img src={profile} alt="profile"/>
                    <p>{list.title}</p>
                </div>    
                <div className="categorypost-click">
                    <img src={share} alt="share" className="share-icon"/>
                    {bookmark ? <img onClick={onClickBookmark} src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img onClick={onClickBookmark} src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" />}
                </div>
            </div>
            <CategorySlide image={list.imgUrl} />
            <div className="categorypost-category">
                <Swiper className="categorypost-categorybutton"
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
                <div className="categorypost-heart">
                    {heart ? <img onClick={onClickHeart} src={heartBlue} alt="heartBlue" /> : <img onClick={onClickHeart} src={heartEmpty} alt="heartEmpty" /> }
                    <p>{list.loveCount}</p>
                </div>
            </div>
        </div>
    )})}
      </div>
    )
}

export default CategoryPost;