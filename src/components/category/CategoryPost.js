import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySlide from "./CategorySlide";
import instance from "../../shared/Request";
import "swiper/css";
import  "../../css/categoryPost.css";
import profile from "../../assets/profile.png";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartBlue from "../../assets/heart-blue.png";

const size = 2;

const CategoryPost = ({region, theme, price}) => {

    console.log(region, theme, price)

    const checkHasIncode = (keyword) => {
        const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      
        if (keyword.match(check_kor)) {
          const encodeKeyword = encodeURI(keyword); 
          return encodeKeyword;
        } else {
          return keyword;
        }
      };

    const [bookmark, setBookmark] = useState(false);
    const [heart, setHeart] = useState(false);

    const onClickBookmark = () => {
      setBookmark(!bookmark);
    }

    const onClickHeart = () => {
      setHeart(!heart);
    }
    
    const [page, setPage] = useState(0);
    const [data, setDate] = useState([]);

    const loadLatestPost = () => {
        instance.get(`api/post/filter?region=${checkHasIncode(region)}&price=${checkHasIncode(price)}&theme=${checkHasIncode(theme)}$page=${page}&size=${size}`)
        .then((response) => {

            const newList = [];
            response.data.content.forEach((p) => newList.push(p))

            console.log(newList)
            
            setDate((prev) => [...prev, ...newList]);
            console.log(data)
         });
    };

    const handleScroll = (e) => {
        if (window.innerHeight +  e.target.documentElement.scrollTop +1 >  
             e.target.documentElement.scrollHeight
        ) {
             setPage(page + 1);
        }
    } 
 
    useEffect(() => {
        loadLatestPost();
        window.addEventListener('scroll', handleScroll);
    },[page])

    return (
      <div className="categorypost-container">   
      {data && data.map((list, index) => {
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