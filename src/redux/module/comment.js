import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

export const getComment = createAction(GET_COMMENT, (commentList) => ({
    commentList,
}));
export const addComment = createAction(ADD_COMMENT, (commentList) => ({
    commentList,
}));
export const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
    commentId,
}));

  //리뷰조회
  export const getCommentDB = (postId) => {
    console.log(postId)
    return async function (dispatch) {
      try {
        const response = await instance.get(
          `api/post/${postId}`
        );
        console.log(response);
        if (response.status === 200) {
          dispatch(getComment(response.data.comments));
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

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
    commentLoading: false,
    comments: [
      {
        commentId: 1,
        comment: "", 
        nickmame: "",
        userImgUrl : "",
      },
    ],
  };
  
  // Reducer
  export default handleActions(
    {
      [GET_COMMENT]: (state, action) =>
        produce(state, (draft) => {
          draft.comments = action.payload.comments;
          draft.commentLoading = false;
        }),

      [ADD_COMMENT]: (state, action) =>
        produce(state, (draft) => {
          const data = {
            commentId: action.payload.comments.commentId,
            comment: action.payload.comments.comment,
            nickmame: action.payload.comments.nickmame,
            userImgUrl: action.payload.comments.userImgUrl,
          };
          draft.comments.unshift(data);
          draft.commentLoading = true;
        }),

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
  