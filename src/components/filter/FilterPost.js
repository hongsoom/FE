import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import InfinityScroll from "../share/InfinityScroll";
import PostItem from "../post/PostItem";
import "../../css/postItem.scss";

const FilterPost = (props) => {
  const dispatch = useDispatch();

  const { nextPage, lastPage, size, posts, isLoading } = props;

  const region = useSelector((state) => state.post.category?.region);
  const price = useSelector((state) => state.post.category?.price);
  const theme = useSelector((state) => state.post.category?.theme);

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
