import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { userAction } from "../../redux/module/post";
import CategorySlide from "../category/CategorySlide";
import "swiper/css";
import "../../css/optionPost.css";
import user from "../../assets/user.png";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const OptionPost = (props) => {
  const dispatch = useDispatch();

  const { loveCount, keyword, page, size, id, direction, setPage } = props;
  const is_loveCount = loveCount ? true : false;

  const posts = useSelector((state) => state.post.contents);
  const last = useSelector((state) => state.post.last);
  const lovechecked = useSelector((state) => state.post.lovechecked);
  const bookmarkchecked = useSelector((state) => state.post.bookmarkchecked);
  const postId = useSelector((state) => state.post.postId);

  const loadPost = () => {
    if (is_loveCount) {
      dispatch(
        userAction.arrayGetDB(keyword, page, size, loveCount, direction)
      );
    } else {
      dispatch(userAction.arrayGetDB(keyword, page, size, id, direction));
    }
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + window.scrollY + 1 >
      e.target.documentElement.scrollHeight
    ) {
      if (last === false) {
        setPage(page + 1);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    }
  };

  useEffect(() => {
    console.log("좋아요, 최신순 일 떄");
    loadPost();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, is_loveCount, lovechecked, bookmarkchecked, postId]);

  useEffect(() => {
    console.log("언제?");
    return () => {
      console.log("좋아요, 최신순 cleanup 함수");
      dispatch(userAction.clearDB());
      setPage(0);
    };
  }, [is_loveCount]);

  return (
    <div className="optionpost-container">
      {posts &&
        posts.map((list, index) => {
          return (
            <div className="optionpost-content" key={index}>
              <div className="optionpost-title">
                <div className="optionpost-user">
                  {list.userImgUrl ? (
                    <img src={list.userImgUrl} alt="profile" />
                  ) : (
                    <img src={user} alt="default-profile" />
                  )}
                  <Link to={`detail/${list.postId}`}>
                    <p>{list.title}</p>
                  </Link>
                </div>
                <div className="optionpost-click">
                  <img
                    src={share}
                    alt="share"
                    className="optionpost-shareicon"
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
              <div className="optionpost-category">
                <Swiper
                  className="optionpost-categorybutton"
                  slidesPerView={3}
                  breakpoints={{
                    300: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  <SwiperSlide className="optionpost-area-button-content">
                    <button className="optionpost-area-button">
                      {list.regionCategory}
                    </button>
                  </SwiperSlide>
                  {list.themeCategory.map((value, index) => {
                    return (
                      <SwiperSlide
                        className="optionpost-theme-button-content"
                        key={index}
                      >
                        <button className="optionpost-theme-button">
                          {value.themeCategory}
                        </button>
                      </SwiperSlide>
                    );
                  })}
                  <SwiperSlide className="optionpost-price-button-content">
                    <button className="optionpost-price-button">
                      {list.priceCategory}
                    </button>
                  </SwiperSlide>
                </Swiper>
                <div className="optionpost-heart">
                  <button
                    onClick={() =>
                      dispatch(userAction.clickLoveDB(list.postId))
                    }
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

export default OptionPost;
