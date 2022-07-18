import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/module/post";
import InfinityScroll from "../share/InfinityScroll";
import PostItem from "../post/PostItem";

const SelectPost = (props) => {
  const dispatch = useDispatch();

  const contentDivRef = useRef();

  const {
    keyword,
    page,
    size,
    sortby,
    direction,
    posts,
    last,
    isLoading,
    setPage,
  } = props;

  return (
    <div className="optionpost-container" ref={contentDivRef}>
      <InfinityScroll
        callNext={() => {
          dispatch(
            userAction.arrayGetDB(keyword, page, size, sortby, direction)
          );
        }}
        is_next={last ? false : true}
        loading={isLoading}
        ref={contentDivRef}
        page={page}
        setPage={setPage}
      >
        {posts &&
          posts.map((list, index) => {
            return <PostItem key={index} {...list} />;
          })}
      </InfinityScroll>
    </div>
  );
};

export default SelectPost;
