import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import swal from "sweetalert";
import InfinityScroll from "../share/InfinityScroll";
import PostItem from "../post/PostItem";
import "../../css/postItem.scss";

const FilterPost = (props) => {
  const dispatch = useDispatch();

  const { nextPage, lastPage, size, posts, isLoading, isFilter } = props;

  const region = useSelector((state) => state.post.category?.region);
  const price = useSelector((state) => state.post.category?.price);
  const theme = useSelector((state) => state.post.category?.theme);

  /*   const filterEmpty = () => {
    if (posts.length === 0 || isFilter === true) {
      swal({
        title: "해당 게시물이 없습니다!",
        icon: "error",
        closeOnClickOutside: false,
      });
      return;
    } else {
      return;
    }
  };

  useEffect(() => {
    if (isFilter) {
      filterEmpty();
    }
  }, []); */

  return (
    <>
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
    </>
  );
};

export default FilterPost;
