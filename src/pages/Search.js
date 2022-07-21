import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/module/post";
import Header from "../components/share/Header";
import FilterButton from "../components/filter/FilterButton";
import SearchPost from "../components/search/SearchPost";
import SearchWrite from "../components/search/SearchWrite";
import "../css/search.css";

const size = 5;

const Search = () => {
  const dispatch = useDispatch();

  const keyword = useParams().keyword;
  console.log(keyword);

  const posts = useSelector((state) => state.post.contents);
  const isLoading = useSelector((state) => state.post.isLoading);
  const nextPage = useSelector((state) => state.post.paging?.next);
  const lastPage = useSelector((state) => state.post.paging?.last);

  const checkHasIncode = (value) => {
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (value.match(check_kor)) {
      const encodeKeyword = encodeURI(value);
      return encodeKeyword;
    } else {
      return value;
    }
  };

  const loadKeywordPost = () => {
    const keyword_ = checkHasIncode(keyword);
    dispatch(userAction.keywordGetDB(keyword_, nextPage, size));
  };

  useEffect(() => {
    loadKeywordPost();

    return () => {
      dispatch(userAction.initPagingDB());
      dispatch(userAction.clearDB());
    };
  }, [keyword]);

  return (
    <>
      <Header />
      <SearchWrite />
      <FilterButton list={keyword} />
      <div className="search-container">
        <div className="search-content">
          <div className="search-post">
            <SearchPost
              posts={posts}
              isLoading={isLoading}
              size={size}
              nextPage={nextPage}
              lastPage={lastPage}
              keyword={checkHasIncode(keyword)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
