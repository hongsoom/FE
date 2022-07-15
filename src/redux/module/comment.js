import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import axios from "axios";

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
    }).catch((error) => {
      console.log(error);
     })
  }
}

export const addCommentDB = (postId, comment) => {
  console.log(postId, comment)
  return async function (dispatch) {
    try {
      const response = await instance.post(
        `api/comment/${postId}`,  
        {
        comment : comment  
        });
      const commentList = response.data.body.comments;
      dispatch(addComment(commentList));
    } catch (err) {
      console.log(err);
    }
  };
};


export const deleteCommentDB = (commentId) => {
  console.log(commentId)
    return async function (dispatch) {
      await instance
      .delete(`api/comment/${commentId}`,
      {
        headers: { Authorization: localStorage.getItem("token")}
      })
      .then((response) => {
        console.log(response)

        dispatch(deleteComment(commentId))
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }  

const initialComment = {
  comments: [
     {
      commentId: "",
      comment: "",
      nickname: "",
      userImgUrl: "",
      createdAt: "",
    },
  ],
}
  
export default handleActions (
  {
    [GET_COMMENT]: (state, action) => 
    produce(state, (draft) => {
    draft.comments =  [...action.payload.commentList]
    }),

    [ADD_COMMENT] : (state, action) =>
    produce(state, (draft) => {
      const data = {
        commentId: action.payload.commentList.commentId,
        comment: action.payload.commentList.comment,
        nickname: action.payload.commentList.nickname,
        userImgUrl: action.payload.commentList.userImgUrl,
        createdAt: action.payload.commentList.createdAt,
      };
      draft.comments.unshift(data); 
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
  