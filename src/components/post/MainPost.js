import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userAction } from "../../redux/module/post";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySlide from "../category/CategorySlide";
import "../../css/mainPost.css";
import user from "../../assets/user.png";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const MainPost = (props) => {
  const dispatch = useDispatch();

  const { bookmarkCount, keyword, page, size, direction } = props;

  const posts = useSelector((state) => state.post.bookmarkcontents);
  const postId = useSelector((state) => state.post.postId);
  const lovechecked = useSelector((state) => state.post.lovechecked);
  const bookmarkchecked = useSelector((state) => state.post.bookmarkchecked);

  console.log("좋아요", lovechecked);
  console.log("북마크", bookmarkchecked);
  console.log("전체 게시글", posts);

  const loadfirstPost = () => {
    dispatch(
      userAction.bookmarkGetDB(keyword, page, size, direction, bookmarkCount)
    );
  };

  useEffect(() => {
    loadfirstPost();
  }, [lovechecked, bookmarkchecked, postId]);

  return (
    <Swiper
      className="mainpost-container"
      style={{
        width: "335px",
        height: "300px",
      }}
      spaceBetween={50}
      slidesPerView={1}
      breakpoints={{
        300: {
          slidesPerView: 1,
          spaceBetween: 50,
          centeredSlides: false,
        },
      }}
    >
      {posts &&
        posts.map((list, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="mainpost-content">
                <div className="mainpost-title">
                  <div className="mainpost-user">
                    {list.userImgUrl ? (
                      <img src={list.userImgUrl} alt="profile" />
                    ) : (
                      <img src={user} alt="default-profile" />
                    )}
                    <Link to={`detail/${list.postId}`}>
                      <p>{list.title}</p>
                    </Link>
                  </div>
                  <div className="mainpost-click">
                    <img
                      src={share}
                      alt="share"
                      className="mainpost-shareicon"
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
                <div className="mainpost-category">
                  <Swiper
                    className="mainpost-categorybutton"
                    slidesPerView={1}
                    breakpoints={{
                      300: {
                        slidesPerView: 1,
                      },
                    }}
                  >
                    <SwiperSlide className="mainpost-area-button-content">
                      <button className="mainpost-area-button">
                        {list.regionCategory}
                      </button>
                    </SwiperSlide>
                    {list.themeCategory.map((value, index) => {
                      return (
                        <SwiperSlide
                          className="mainpost-theme-button-content"
                          key={index}
                        >
                          <button className="mainpost-theme-button">
                            {value.themeCategory}
                          </button>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className="mainpost-heart">
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
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default MainPost;
