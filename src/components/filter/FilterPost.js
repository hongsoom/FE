import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/module/post";
import InfinityScroll from "../share/InfinityScroll";
import PostItem from "../post/PostItem";

const FilterPost = (props) => {
  const dispatch = useDispatch();

  const contentDivRef = useRef();

  const { page, size, region, price, theme, posts, last, isLoading } = props;

  return (
    <div className="categorypost-container" ref={contentDivRef}>
      <InfinityScroll
        callNext={() => {
          dispatch(userAction.filterGETDB(region, price, theme, size, page));
        }}
        is_next={last ? false : true}
        loading={isLoading}
        ref={contentDivRef}
      >
        {posts &&
          posts.map((list, index) => {
            return <PostItem key={index} {...list} />;
          })}
      </InfinityScroll>
    </div>
  );
};

export default FilterPost;
