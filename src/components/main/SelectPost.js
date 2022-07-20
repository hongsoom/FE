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
    size,
    sortby,
    direction,
    posts,
    nextPage,
    lastPage,
    isLoading,
  } = props;
  console.log(nextPage);
  return (
    <div className="postItem-box">
      <div className="postItem-container">
        <InfinityScroll
          callNext={() => {
            dispatch(
              userAction.arrayGetDB(keyword, nextPage, size, sortby, direction)
            );
          }}
          is_next={lastPage ? false : true}
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
