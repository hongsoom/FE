import React, { useEffect, useState } from "react";
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

    const [bookmark, setBookmark] = useState(false);
    const [heart, setHeart] = useState(false);

    const onClickBookmark = () => {
      setBookmark(!bookmark);
    }

    const onClickHeart = () => {
      setHeart(!heart);
    }
    
    const [page, setPage] = useState(0);
    const [data, setDate] = useState(initialState);
    const [image, setImage] = useState([]);

    const loadLatestPost = (page) => {
        console.log(page)
        instance.get(`api/posts/?keyword={keyword}&page=${page}`).then(({response}) => {
             const newList = response.data;
             const image = response.data.imgUrl;
             setDate((prev) => [...prev, ...newList]);
             setImage((prev) => [...prev, ...image]);
         });
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

    return (
      <div className="categorypost-container">   
      {data.map((list, index) => {
        return (
        <div className="categorypost-content" key={index}>
            <div className="categorypost-title">
                <div className="categorypost-user">
                    <img src={profile} alt="profile" />
                    <p>{list.title}</p>
                </div>    
                <div className="categorypost-click">
                    <img src={share} alt="share" className="share-icon"/>
                    {bookmark ? <img onClick={onClickBookmark} src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img onClick={onClickBookmark} src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" />}
                </div>
            </div>
            <CategorySlide image={image} />
            <div className="categorypost-category">
                <Swiper className="categorypost-categorybutton"
                    slidesPerView={3}
                    breakpoints={{
                    300: {
                        slidesPerView: 3
                    }}}>
                        <SwiperSlide className="area-button-content">
                            <button className="area-button">{list.regionCategory}</button>
                        </SwiperSlide>
                        {list.themeCategories.map((value, index) => {
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