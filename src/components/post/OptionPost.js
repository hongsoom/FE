import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { userAction } from "../../redux/module/post";
import CategorySlide from "../category/CategorySlide";
import "swiper/css";
import  "../../css/optionPost.css";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const size = 5;

const OptionPost = (props) => {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.post.contents);
    const last = useSelector((state) => state.post.last);
    const loveckecked = useSelector((state) => state.post.loveckecked);
    const bookmarkckecked = useSelector((state) => state.post.bookmarkckecked);
    const postId = useSelector((state) => state.post.postId);

    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [direction, setDirection] = useState("desc");
    const [id, setId] = useState("id");
    const [bookmarkCount, setBookmarkCount] = useState("bookmarkCount");

    const { loveCount } = props;
    const is_loveCount = loveCount ? true : false;

     const loadPost = () => {
        if( is_loveCount ) {
            dispatch(userAction.arrayGetDB(
                keyword, page, size, loveCount, direction, bookmarkCount
            ))
        } else {
            dispatch(userAction.arrayGetDB(
                keyword, page, size, id, direction, bookmarkCount
            ))
        }
    }

    const loadfirstPost = () => {
        dispatch(userAction.firstGetDB(
            keyword, page, size, id, direction, bookmarkCount
        ))
    }

    const handleScroll = (e) => {
        if (window.innerHeight + window.scrollY + 1 >  
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
        loadfirstPost();
     },[]) 

    useEffect(() => {
        loadPost();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }  
    },[page, is_loveCount])

    useEffect(() => {
        return () => {
            dispatch(userAction.clearDB());
            setPage(0);
        }  
    },[is_loveCount])

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
                    <img src={share} alt="share" className="optionpost-shareicon"/>
                    <button onClick={() => dispatch(userAction.clickBookmarkDB(list.postId))}>
                    {list.postId === postId  ? ( bookmarkckecked === true ? <img src={bookmarkBlue} alt="bookmarkBlue" className="mainpost-bookmarkicon" /> : <img src={bookmarkEmpty} alt="bookmarkEmpty" className="mainpost-bookmarkicon" />) :
                        <img src={bookmarkEmpty} alt="bookmarkEmpty" className="mainpost-bookmarkicon" />}
                    </button>
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
                        <SwiperSlide className="optionpost-area-button-content">
                            <button className="optionpost-area-button">{list.regionCategory}</button>
                        </SwiperSlide>
                        {list.themeCategory.map((value, index) => {
                        return (
                            <SwiperSlide className="optionpost-theme-button-content" key={index}>
                                <button className="optionpost-theme-button">{value.themeCategory}</button>
                            </SwiperSlide> 
                        )})}   
                </Swiper>
                <div className="optionpost-heart">
                    <button onClick={() => dispatch(userAction.clickLoveDB(list.postId))}>
                    {list.postId === postId ? ( loveckecked === true ? <img src={heartFull} alt="heartFull" /> : <img src={heartEmpty} alt="heartEmpty" /> ) :
                          <img src={heartEmpty} alt="heartEmpty" /> }
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