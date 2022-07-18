import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/module/post";
import InfinityScroll from "../share/InfinityScroll";
import PostItem from "../post/PostItem";
import "../../css/postItem.css";

const SearchPost = (props) => {
  const dispatch = useDispatch();

  const contentDivRef = useRef();

  const { page, size, keyword, posts, last, isLoading } = props;

  return (
    <div className="postItem-container" ref={contentDivRef}>
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
