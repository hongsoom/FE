import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

export const addComment = createAction(ADD_COMMENT, (commentList) => ({
    commentList,
}));
export const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
    commentId,
}));

  //리뷰등록
export const addCommentDB = (postId, comment) => {
  console.log(postId, comment)
  return async function (dispatch) {
    try {
      const response = await instance.post(
        `/api/post/${postId}/comment`,
        comment
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(addComment(comment));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//리뷰삭제
export const deleteCommentDB = (commentId) => {
  console.log(commentId)
    return async function (dispatch) {
      try {
        const response = await instance.delete(
          `api/comment/${commentId}`
        );
        console.log(response);
        if (response.status === 200) {
          dispatch(deleteComment(commentId));
        }
      } catch (err) {
        console.log(err);
      }
    };
  };  

  const initialComment = {
    message: '',
    comments: [
      {
        commentId: 1,
        comment: "1번째 댓글", 
        nickname: "1번",
        userImgUrl : "",
      },
      {
        commentId: 2,
        comment: "2번째 댓글", 
        nickname: "2번",
        userImgUrl : "",
      },
      {
        commentId: 3,
        comment: "3번째 댓글", 
        nickname: "3번",
        userImgUrl : "",
      },
      {
        commentId: 4,
        comment: "4번째 댓글", 
        nickname: "4번",
        userImgUrl : "",
      },
      {
        commentId: 5,
        comment: "5번째 댓글", 
        nickname: "5번",
        userImgUrl : "",
      },
    ],
  };
  
  // Reducer
  export default handleActions(
    {
      [ADD_COMMENT]: (state, action) => {
        return {
          ...state,
          message: action.payload.comment.message,
        };
      },

      [DELETE_COMMENT]: (state, action) =>
        produce(state, (draft) => {
          const newComment = draft.comments.filter(
            (item) => item.commentId !== action.payload.commentId
          );
          draft.comments = newComment;
          draft.commentLoading = true;
        }),
    },
    initialComment
  );
  