import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/module/post";
import Header from "../components/share/Header";
import FilterButton from "../components/filter/FilterButton";
import FilterPost from "../components/filter/FilterPost";
import SearchWrite from "../components/search/SearchWrite";
import "../css/filter.css";

const size = 5;

const Filter = () => {
  const dispatch = useDispatch();
  const region = useParams().keyword;

  const posts = useSelector((state) => state.post.contents);
  const isLoading = useSelector((state) => state.post.isLoading);
  const nextPage = useSelector((state) => state.post.paging?.next);
  const lastPage = useSelector((state) => state.post.paging?.last);

  const checkHasIncode = (value) => {
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (value === undefined) {
      return (value = "");
    }

    if (value.match(check_kor)) {
      const encodeKeyword = encodeURI(value);
      return encodeKeyword;
    } else {
      return value;
    }
  };

  useEffect(() => {
    loadLatestPost();

    return () => {
      dispatch(userAction.clearDB());
    };
  }, [region]);

  const loadLatestPost = () => {
    const region_ = checkHasIncode(region);
    /*     const price_ = checkHasIncode(price);
    const theme_ = checkHasIncode(theme); 
    dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size)); */
  };

  return (
    <>
      <Header />
      <SearchWrite />
      <FilterButton region={region} />
      <div className="filter-container">
        <div className="filter-content">
          <div className="filter-category">
            <FilterPost
              posts={posts}
              isLoading={isLoading}
              size={size}
              nextPage={nextPage}
              lastPage={lastPage}
              region={region}
              /*               theme={theme}
              price={price} */
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
