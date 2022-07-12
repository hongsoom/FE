import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { userAction } from "../../redux/module/post";
import CategorySlide from "./CategorySlide";
import "swiper/css";
import  "../../css/categoryPost.css";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartBlue from "../../assets/heart-blue.png";

const size = 5;

const OptionPost = () => {
    const dispatch = useDispatch();

 
    const posts = useSelector((state) => state.post.contents);

    const [bookmark, setBookmark] = useState(false);
    const [heart, setHeart] = useState(false);
    const [page, setPage] = useState(0);
    const [keywordChange, setKeyword] = useState("");

    const checkHasIncode = keywordChange => {
        if(keywordChange === undefined) {
            setKeyword("")
            return keywordChange;
        }
        
        const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      
        if (keywordChange.match(check_kor)) {
          const encodeKeyword = encodeURI(keywordChange); 
          return encodeKeyword;
        } else {
          return keywordChange;
        }
      };

    const onClickBookmark = () => {
      setBookmark(!bookmark);
    }

    const onClickHeart = () => {
      setHeart(!heart);
    }

    const loadLatestPost = () => {
        const keyword = checkHasIncode(keywordChange)
        console.log(keyword)

        dispatch(userAction.allGetDB(
            page, size, keyword
        ))
        setPage(page + 1);
    };

    const handleScroll = (e) => {
        if (window.innerHeight +  e.target.documentElement.scrollTop +1 >  
             e.target.documentElement.scrollHeight
        ) {
            loadLatestPost();
        }
    } 
 
    useEffect(() => {
        loadLatestPost();
        window.addEventListener('scroll', handleScroll);
    },[])

    return (
      <div className="categorypost-container">   
      {posts && posts.map((list, index) => {
         return (
        <div className="categorypost-content" key={index}>
            <div className="categorypost-title">
                <div className="categorypost-user">
                    <img src={list.userImgUrl} alt="profile" />
                    <Link to ={`detail/${list.postId}`}><p>{list.title}</p></Link>
                </div>    
                <div className="categorypost-click">
                    <img src={share} alt="share" className="share-icon"/>
                    {bookmark ? <img onClick={onClickBookmark} src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img onClick={onClickBookmark} src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" />}
                </div>
            </div>
            <Link to ={`detail/${list.postId}`}>
                <CategorySlide image={list.imgUrl} />
            </Link>
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

export default OptionPost;