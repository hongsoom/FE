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

export const getCommentDB = (postId) => {
  return async function (dispatch) {
    await instance
      .get(`api/post/${postId}`)
      .then((response) => {
        const commentList = response.data.body.comments;
        dispatch(getComment(commentList));
      })
      .catch((error) => {});
  };
};

export const addCommentDB = (postId, comment) => {
  console.log(postId, comment);
  return async function (dispatch) {
    await instance
      .post(`api/comment/${postId}`, {
        comment: comment,
      })
      .then((response) => {
        instance
          .get(`api/post/${postId}`)
          .then((response) => {
            const commentList = response.data.body.comments;
            dispatch(addComment(commentList));
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };
};

export const deleteCommentDB = (commentId) => {
  console.log(commentId);
  return async function (dispatch) {
    await instance
      .delete(`api/comment/${commentId}`)
      .then((response) => {
        dispatch(deleteComment(commentId));
      })
      .catch((error) => {});
  };
};

const initialComment = {
  comments: [],
};

export default handleActions(
  {
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comments = [...action.payload.commentList];
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comments = [...action.payload.commentList];
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const newComment = draft.comments.filter(
          (item) => item.commentId !== action.payload.commentId
        );
        draft.comments = newComment;
      }),
  },
  initialComment
);
