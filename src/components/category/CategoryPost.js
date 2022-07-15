import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySlide from "./CategorySlide";
import "swiper/css";
import  "../../css/categoryPost.css";
import profile from "../../assets/profile.png";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const size = 5;

const CategoryPost = (props) => {
    const dispatch = useDispatch();

    const { region, price, theme } = props;

    const posts = useSelector((state) => state.post.contents);
    const last = useSelector((state) => state.post.last);
    const loveckecked = useSelector((state) => state.post.loveckecked);
    const bookmarkckecked = useSelector((state) => state.post.bookmarkckecked);

    console.log(loveckecked)
    console.log(bookmarkckecked)

    const [page, setPage] = useState(0);

    const checkHasIncode = keyword => {
  
        const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      
        if (keyword.match(check_kor)) {
          const encodeKeyword = encodeURI(keyword); 
          return encodeKeyword;
        } else {
          return keyword;
        }
      };
 
    const loadLatestPost = () => {
        dispatch(userAction.filterGETDB(
            checkHasIncode(region), checkHasIncode(price), checkHasIncode(theme), size, page
        ))
    }; 
    
   const handleScroll = (e) => {
    if (window.innerHeight + e.target.documentElement.scrollTop +1 >  
        e.target.documentElement.scrollHeight
        ) {
            if(last === false) {
                setPage(page + 1)
            } else {
                alert("마지막 페이지입니다!")
            }
        }
    }   

    useEffect(() => {
        loadLatestPost();
         window.addEventListener('scroll', handleScroll);
         
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }   
    },[page, price, theme])

    useEffect(() => {
        return () => {
            setPage(0);
        }
    },[price, theme])

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
                    <button onClick={() => dispatch(userAction.clickBookmarkDB(list.postId))}>
                        {bookmarkckecked ? <img src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" /> }
                    </button>
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
                    <button onClick={() => dispatch(userAction.clickLoveDB(list.postId))}>
                        {loveckecked ? <img src={heartFull} alt="heartFull" /> : <img src={heartEmpty} alt="heartEmpty" /> }
                    </button>
                    <p>{list.loveCount}</p>
                </div>
            </div>
        </div>
    )})}
      </div>
    )
}

export default CategoryPost;