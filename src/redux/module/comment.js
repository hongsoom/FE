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
      await instance
      .get(`api/post/${postId}`)
      .then((response) => {
        console.log(response);
        const commentList = response.data.body.comments;
        dispatch(getComment(commentList));
      }) 
      .catch((err) => {
        console.log(err);
      })
    }
  }

  //리뷰등록
export const addCommentDB = (postId, comment) => {
  console.log(postId, comment)
  return async function (dispatch) {
    try {
      const response = await instance.post(
        `api/comment/${postId}`,  
        {
        comment : comment  
        },
        {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const commentList = response.data.body.comments;
      dispatch(addComment(commentList));
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
        dispatch(deleteComment(commentId));
      } catch (err) {
        console.log(err);
      }
    };
  };  

  const initialComment = {
    comments: [],
  };
  
  // Reducer
  export default handleActions(
    {

      [GET_COMMENT]: (state, action) => 
      produce(state, (draft) => {
      draft.comments =  [...action.payload.commentList]
      }),

      [ADD_COMMENT] : (state, action) =>
      produce(state, (draft) => {
      draft.comments = [ ...state.comments, action.payload.commentList] 
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
  