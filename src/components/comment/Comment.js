import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentDB,
  addCommentDB,
  deleteCommentDB,
} from "../../redux/module/comment";
import user from "../../assets/user.png";
import "../../css/comment.scss";

const Comment = ({ param }) => {
  const dispatch = useDispatch();
  const postId = parseInt(param);

  const list = useSelector((state) => state.comment.comments);

  const [comment, setComment] = useState("");

  const loadCommnet = () => {
    dispatch(getCommentDB(postId));
  };

  const addcomment = () => {
    dispatch(addCommentDB(postId, comment));
    setComment("");
  };

  useEffect(() => {
    loadCommnet();
  }, []);

  return (
    <div className="comment-container">
      <div className="comment-content">
        <div className="comment-add">
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button onClick={addcomment}>등록</button>
        </div>
        {list.map((list, index) => {
          return (
            <div className="comment-list" key={index}>
              <>
                <div className="comment-user">
                  {list.userImgUrl ? (
                    <img src={list.userImgUrl} alt="profile" />
                  ) : (
                    <img src={user} alt="default-profile" />
                  )}
                  <p>{list.nickname}</p>
                </div>
                <div className="comment-content">
                  <p>{list.comment}</p>
                </div>
                <div className="comment-info">
                  <span>{list.createdAt}</span>
                  <span
                    className="comment-delete"
                    onClick={() => dispatch(deleteCommentDB(list.commentId))}
                  >
                    삭제
                  </span>
                </div>
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
