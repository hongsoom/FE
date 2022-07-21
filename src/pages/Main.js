import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/module/post";
import Header from "../components/share/Header";
import FilterButton from "../components/filter/FilterButton";
import BookmarkPost from "../components/main/BookmarkPost";
import SelectPost from "../components/main/SelectPost";
import SearchWrite from "../components/search/SearchWrite";
import "../css/main.css";
import smaillogo from "../assets/logosky.png";

const size = 5;

const Main = () => {
  const dispatch = useDispatch();

  const recommendList = ["서울", "호캉스", "힐링"];

  const posts = useSelector((state) => state.post.contents);
  const bookmarkcontents = useSelector((state) => state.post.bookmarkcontents);
  const isLoading = useSelector((state) => state.post.isLoading);
  const nextPage = useSelector((state) => state.post.paging?.next);
  const lastPage = useSelector((state) => state.post.paging?.last);

  const [keyword, setKeyword] = useState("");
  const [direction, setDirection] = useState("desc");
  const [bookmarkCount, setBookmarkCount] = useState("bookmarkCount");
  const [sortby, setSortby] = useState("id");

  const onChangeSort = (e) => {
    const clickedSort = e.target.value;
    setSortby(clickedSort);
  };

  const onSortPost = () => {
    dispatch(userAction.arrayGetDB(keyword, nextPage, size, sortby, direction));
  };

  const loadfirstPost = () => {
    dispatch(
      userAction.bookmarkGetDB(
        keyword,
        nextPage,
        size,
        direction,
        bookmarkCount
      )
    );
  };

  useEffect(() => {
    loadfirstPost();
    return () => {
      dispatch(userAction.initPagingDB());
      dispatch(userAction.clearDB());
    };
  }, []);

  useEffect(() => {
    onSortPost();
    return () => {
      dispatch(userAction.initPagingDB());
      dispatch(userAction.clearDB());
    };
  }, [sortby]);

  return (
    <>
      <Header />
      <SearchWrite />
      <FilterButton recommendList={recommendList} keyword={keyword} />
      <div className="main-container">
        <div className="main-content">
          <BookmarkPost
            bookmarkcontents={bookmarkcontents}
            bookmarkCount={bookmarkCount}
          />
          <div className="main-latest-love-container">
            <div className="main-latest-love-content">
              <div className="main-latest-love-title">
                <img src={smaillogo} alt="smaillogo" />
                <p>다른 회원님의 경로를 확인해보세요</p>
              </div>
              <div className="main-latest-love-select">
                <select onChange={(e) => onChangeSort(e)}>
                  <option value="id">최신순</option>
                  <option value="loveCount">인기순</option>
                </select>
              </div>
            </div>
            <div className="main-latest-love-component">
              <SelectPost
                keyword={keyword}
                sortby={sortby}
                direction={direction}
                size={size}
                posts={posts}
                lastPage={lastPage}
                nextPage={nextPage}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
