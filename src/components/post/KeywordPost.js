import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { userAction } from "../../redux/module/post";
import CategorySlide from "../category/CategorySlide";
import "swiper/css";
import "../../css/keywordPost.css";
import user from "../../assets/user.png";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const size = 5;

const KeywordPost = (props) => {
  const dispatch = useDispatch();

  const { keyword } = props;

  const posts = useSelector((state) => state.post.contents);
  const last = useSelector((state) => state.post.last);
  const lovechecked = useSelector((state) => state.post.lovechecked);
  const bookmarkchecked = useSelector((state) => state.post.bookmarkchecked);
  const postId = useSelector((state) => state.post.postId);

  const [page, setPage] = useState(0);

  const checkHasIncode = (keyword) => {
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (keyword.match(check_kor)) {
      const encodeKeyword = encodeURI(keyword);
      return encodeKeyword;
    } else {
      return keyword;
    }
  };

  const loadLatestPost = () => {
    const keyword_ = checkHasIncode(keyword);

    dispatch(userAction.allGetDB(page, size, keyword_));
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >
      e.target.documentElement.scrollHeight
    ) {
      if (last === false) {
        setPage(page + 1);
      } else {
        alert("마지막 페이지입니다!");
      }
    }
  };

  useEffect(() => {
    loadLatestPost();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, keyword]);

  useEffect(() => {
    return () => {
      setPage(0);
    };
  }, [keyword]);

  return (
    <div className="keywordpost-container">
      {posts.map((list, index) => {
        return (
          <div className="keywordpost-content" key={index}>
            <div className="keywordpost-title">
              <div className="keywordpost-user">
                <img src={list.userImgUrl} alt="profile" />
                <Link to={`detail/${list.postId}`}>
                  <p>{list.title}</p>
                </Link>
              </div>
              <div className="keywordpost-click">
                <img
                  src={share}
                  alt="share"
                  className="keywordpost-shareicon"
                />
                <button
                  onClick={() =>
                    dispatch(userAction.clickBookmarkDB(list.postId))
                  }
                >
                  {list.postId === postId ? (
                    bookmarkchecked === true ? (
                      <img
                        src={bookmarkBlue}
                        alt="bookmarkBlue"
                        className="mainpost-bookmarkicon"
                      />
                    ) : (
                      <img
                        src={bookmarkEmpty}
                        alt="bookmarkEmpty"
                        className="mainpost-bookmarkicon"
                      />
                    )
                  ) : list.bookmarkStatus === true ? (
                    <img
                      src={bookmarkBlue}
                      alt="bookmarkBlue"
                      className="mainpost-bookmarkicon"
                    />
                  ) : (
                    <img
                      src={bookmarkEmpty}
                      alt="bookmarkEmpty"
                      className="mainpost-bookmarkicon"
                    />
                  )}
                </button>
              </div>
            </div>
            <Link to={`detail/${list.postId}`}>
              <CategorySlide image={list.imgUrl} />
            </Link>
            <div className="keywordpost-category">
              <Swiper
                className="keywordpost-categorybutton"
                slidesPerView={1}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                }}
              >
                <SwiperSlide className="keywordpost-area-button-content">
                  <button className="keywordpost-area-button">
                    {list.regionCategory}
                  </button>
                </SwiperSlide>
                {list.themeCategory.map((value, index) => {
                  return (
                    <SwiperSlide
                      className="keywordpost-theme-button-content"
                      key={index}
                    >
                      <button className="keywordpost-theme-button">
                        {value.themeCategory}
                      </button>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className="keywordpost-heart">
                <button
                  onClick={() => dispatch(userAction.clickLoveDB(list.postId))}
                >
                  {list.postId === postId ? (
                    lovechecked === true ? (
                      <img src={heartFull} alt="heartFull" />
                    ) : (
                      <img src={heartEmpty} alt="heartEmpty" />
                    )
                  ) : list.loveStatus === true ? (
                    <img src={heartFull} alt="heartFull" />
                  ) : (
                    <img src={heartEmpty} alt="heartEmpty" />
                  )}
                </button>
                <p>{list.loveCount}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KeywordPost;
