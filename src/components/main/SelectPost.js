import React from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/module/post";
import InfinityScroll from "../share/InfinityScroll";
import PostItem from "../post/PostItem";
import "../../css/postItem.css";

const SelectPost = (props) => {
  const dispatch = useDispatch();

  const {
    keyword,
    nextPage,
    size,
    sortby,
    direction,
    posts,
    lastPage,
    isLoading,
  } = props;

  return (
    <div className="postItem-box">
      <div className="postItem-container">
        <InfinityScroll
          callNext={() => {
            dispatch(
              userAction.arrayGetDB(keyword, nextPage, size, sortby, direction)
            );
          }}
          nextPage={nextPage}
          is_next={lastPage}
          loading={isLoading}
        >
          {posts &&
            posts.map((list, index) => {
              return <PostItem key={index} {...list} />;
            })}
        </InfinityScroll>
      </div>
    </div>
  );
};

export default SelectPost;
