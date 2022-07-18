import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import InfinityScroll from "../share/InfinityScroll";
import PostItem from "../post/PostItem";
import "../../css/keywordPost.css";

const SearchPost = (props) => {
  const dispatch = useDispatch();

  const contentDivRef = useRef();

  const { page, size, keyword, posts, last, isLoading } = props;

  return (
    <div className="keywordpost-container" ref={contentDivRef}>
      <InfinityScroll
        callNext={() => {
          dispatch(userAction.keywordGetDB(page, size, keyword));
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

export default SearchPost;
