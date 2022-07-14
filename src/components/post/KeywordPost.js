import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { userAction } from "../../redux/module/post";
import CategorySlide from "../category/CategorySlide";
import "swiper/css";
import  "../../css/keywordPost.css";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const size = 5;

const KeywordPost = (props) => {

    const dispatch = useDispatch();

    const { keyword } = props;
    console.log(keyword)

    const posts = useSelector((state) => state.post.contents);

    const [bookmark, setBookmark] = useState(false);
    const [page, setPage] = useState(1);
    const [keywordChange, setKeyword] = useState(keyword);

    const checkHasIncode = keyword => {
        if(keyword === undefined) {
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

    const loadLatestPost = () => {
        const keyword_ = checkHasIncode(keyword)

        dispatch(userAction.allGetDB(
            page, size, keyword_
        ))
    };

/*     const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop +1 >  
             e.target.documentElement.scrollHeight
        ) {
            setPage(page + 1)
        }
    }  */
 
    useEffect(() => {
        setKeyword(keyword);
        loadLatestPost();
/*         window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchmove', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
        } */
    },[page])

    useEffect(() => {
        return () => {
            dispatch(userAction.clearDB());
            setPage(0);
        }
    },[keyword])
    
    return (
      <div className="keywordpost-container">   
      {posts.length !== 0 && posts.map((list, index) => {
         return (
        <div className="keywordpost-content" key={index}>
            <div className="keywordpost-title">
                <div className="keywordpost-user">
                    <img src={list.userImgUrl} alt="profile" />
                    <p>{list.title}</p>
                </div>    
                <div className="keywordpost-click">
                    <img src={share} alt="share" className="share-icon"/>
                    {bookmark ? <img onClick={onClickBookmark} src={bookmarkBlue} alt="bookmarkBlue" className="bookmark-icon" /> : <img onClick={onClickBookmark} src={bookmarkEmpty} alt="bookmarkEmpty" className="bookmark-icon" />}
                </div>
            </div>
            <CategorySlide image={list.imgUrl} />
            <div className="keywordpost-category">
                <Swiper className="keywordpost-categorybutton"
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
                <div className="keywordpost-heart">
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

export default KeywordPost;