import React from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/module/post";
import InfinityScroll from "../share/InfinityScroll";
import PostItem from "../post/PostItem";
import "../../css/postItem.css";

const FilterPost = (props) => {
  const dispatch = useDispatch();

  const { nextPage, lastPage, size, region, price, theme, posts, isLoading } =
    props;

  return (
    <div className="postItem-container">
      <InfinityScroll
        callNext={() => {
          dispatch(
            userAction.filterGETDB(region, price, theme, nextPage, size)
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
  );
};

export default FilterPost;
