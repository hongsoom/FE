import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySlide from "./CategorySlide";
import  "../../css/categoryPost.css";
import "swiper/css";
import profile from "../../assets/profile.png";
import bookmark from "../../assets/bookmark.png";
import share from "../../assets/share.png";
import heart from "../../assets/heart.png";
import test1 from "../../assets/test1.png";
import test2 from "../../assets/test2.png";

const CategoryPost = () => {

    const initialState = [
        {
        title : '1',
        regionCategory : '서울',
        priceCategory : '10만원대',
        imgUrl: [test1, test2, test1, test2],
        postId : '1',
        userId : '1',
        nickname : '1',
        themeCategories : [
          {
             'themeCategory': '액티비티'
          },
          {
             'themeCategory': '힐링'
           },
            {
            'themeCategory': '애견동반'
          } ,
          
           {
            'themeCategory': '맛집'
          },
                  
          {
            'themeCategory': '호캉스'
          }
        ],
        loveCount : 100,
        isLove : false
        },
    ]
    
    const [page, setPage] = useState(0);
    const [data, setDate] = useState(initialState);

    const loadLatestPost = () => {
        /*  instance.get(`api/posts/?keyword={keyword}&page={page}`).then(({response}) => {
             const newList = response.data;
             const image = response.data.imgUrl;
             setDate((prev) => [...prev, ...newList]);
             setImage((prev) => [...prev, ...image]);
         }); */
        const newList = data;
        setDate((prev) => [...prev, ...newList]);
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

    const areabutton = {
        width : "60px" , 
        height: "28px",
        marginRight: "15px"
    }

    return (
      <div className="categorypost-container">   
      {data.map((list, index) => {
        return (
        <div className="categorypost-content">
            <div className="categorypost-title">
                <div className="categorypost-user">
                    <img src={profile} alt="profile" />
                    <p>{list.title}</p>
                </div>    
                <div className="categorypost-click">
                    <img src={share} alt="share" className="share-icon"/>
                    <img src={bookmark} alt="bookmark" className="bookmark-icon"/>
                </div>
            </div>
            <CategorySlide image={list.imgUrl} />
            <div className="categorypost-category">
                <Swiper
                    className="categorypost-button"
                    slidesPerView={3}
                    breakpoints={{
                    300: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                        centeredSlides: false,
                    }}}>
                    <SwiperSlide style={areabutton }>
                        <button className="area-button">{list.regionCategory}</button>
                    </SwiperSlide>
                    {list.themeCategories.map((value, index) => {
                      return (
                        <SwiperSlide>
                            <button className="theme-button">{value.themeCategory}</button>
                        </SwiperSlide> 
                    )})}
                </Swiper>    
                <div className="categorypost-heart">
                    <img src={heart} alt="heart" />
                    <p>{list.loveCount}</p>
                </div>
            </div>
        </div>
    )})}
      </div>
    )
}

export default CategoryPost;