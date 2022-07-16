import React, { useState } from "react";
import Header from "../components/common/Header";
import Sharing from "../components/common/Sharing";
import MainPost from "../components/post/MainPost";
import OptionPost from "../components/post/OptionPost";
import "../css/main.css";
import downArrow from "../assets/downArrow.png";

const size = 5;

const Main = () => {
  const recommendList = ["서울", "호캉스", "힐링"];

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [direction, setDirection] = useState("desc");
  const [id, setId] = useState("id");
  const [bookmarkCount, setBookmarkCount] = useState("bookmarkCount");
  const [loveCount, setLoveCount] = useState("loveCount");

  const [filterClick, setFilterClick] = useState(false);
  const [themeClick, setThemeClick] = useState([]);
  const [priceClick, setPriceClick] = useState("");

  const onFilterClick = () => {
    setFilterClick(!filterClick);
  };

  return (
    <>
      <Header />
      <Sharing
        recommendList={recommendList}
        setPriceClick={setPriceClick}
        priceClick={priceClick}
        setThemeClick={setThemeClick}
        themeClick={themeClick}
      />
      <div className="main-container">
        <div className="main-content">
          <MainPost
            bookmarkCount={bookmarkCount}
            keyword={keyword}
            direction={direction}
            page={page}
            setPage={setPage}
          />
          <div className="main-latest-love-container">
            <div className="main-latest-love-content">
              <p>다른 회원님의 경로를 확인해보세요</p>
              <button onClick={onFilterClick}>
                {filterClick ? (
                  <p>
                    최신순
                    <img src={downArrow} alt="downArrow" />
                  </p>
                ) : (
                  <p>
                    인기순
                    <img src={downArrow} alt="downArrow" />
                  </p>
                )}
              </button>
            </div>
            <div className="main-latest-love-component">
              {filterClick ? (
                <OptionPost
                  loveCount={loveCount}
                  keyword={keyword}
                  direction={direction}
                  page={page}
                  setPage={setPage}
                />
              ) : (
                <OptionPost
                  id={id}
                  keyword={keyword}
                  direction={direction}
                  page={page}
                  setPage={setPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
