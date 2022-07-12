import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import instance from "../../shared/Request";
import apiform  from "../../shared/api"




const initialState ={
  // title : 'title',
  // content : '게시글 내용 입니다',
  // regionCategory : '지역별',
  // themeCategory : ['힐링','맛집'],
  // priceCategory : '10만원대',
  // place: [
  //   {
  //    addressName:'',
  //    categoryGroupCode:'',
  //    categoryGroupName:'',
  //    categoryName: '',
  //    distance:'',
  //    files: [],
  //    id:'',
  //    phone: '',
  //    placeName: '',
  //    placeUrl: '',
  //    roadAddressName: '',
  //    x: '',
  //    y: '',
  //   }
  // ],
  // restroom: '',
  }



const GETLIST = "post/GETLIST"
const GET = "post/GET"
const ADD = "post/ADD"
const MODIFY = "post/MODIFY"
const DELETE = "post/DELETE"


// Action creator
const getPostList = createAction(GET, (postList) => ({postList}))
const getPost = createAction(GET, (post) => ({post}));
const addPost = createAction(ADD, (post) => ({post}));
const modifyPost = createAction(MODIFY, (post) => ({post}));
const deletePost = createAction(DELETE, (id) => ({id}));
  


// middleWare
// export const getPostListDB = () => async (dispatch) => {
//   try {
//     const data = await instance.get('api/posts');
//     dispatch(getPostList(data.data));
//     // console.log(data.data.postslist);
//   } catch (error) {
//     alert("오류가 발생했습니다. 다시 시도해주세요.");
//     console.log(error);
//   }
// };


export const getPostDB = (postId) => {
  return async function (dispatch) {
  try {
    const response = await instance.get(`api/post/${postId}`);
    console.log(response)
    dispatch(getPost(response.data));
    console.log(response.data);
  } catch (error) {
    // alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
    
  }
};
}

export const addPostDB = (data) => {
  console.log(data)
  return async function (dispatch, getState) {
    console.log(data)
    await instance
      .post("api/post", data,
       {
        headers: {
          // "Content-Type": "multipart/form-data",
          authorization: localStorage.getItem("token") 
        },
      })
      .then((res) => {
        console.log(res);
        // window.location.assign(`/`);
        window.alert('작성 성공')
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deletePostDB = (Id) => {
  
  return function (dispatch) {
    instance
      .delete(`api/post/${Id}`,
      {
      }
      )
      .then((res) => {
        dispatch(deletePost(Id));
        window.location.assign("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//reducer
export default handleActions(
  {
    [GETLIST]:(state, action) => {
      return {
        posts: action.payload
      };
    },
    
    [GET]:(state, action) => {
      return {
        post: action.payload
      };
    },

    [ADD]: (state, action) => {
      return {
        ...state,
        posts: action.payload.post
      };
    },

    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        const newPost = draft.posts.filter((post) => post.id !== action.payload.id)
        draft.posts = newPost;
      })
  },
  initialState
);

// export default function reducer(state = initialState, action={}){
//   switch(action.type){

//     case "post/GET":{
//       return {posts: action.post}
//     }
    
//     case "post/ADD":{
//       const new_post_list = [ action.post_list, ...state.posts];
//       return {posts: new_post_list}

//     }
//     case "post/MODIFY": {
      
//       const modify_post = [ ...action.post ];
//       console.log(modify_post)
//       return { posts: modify_post };
//     }

//     case "post/DELETE":{
//       console.log(state.posts)
//       const new_post_list= state.posts.filter((l,i)=>{
//         console.log(action)
//         // window.alert('보자')
//         return action.postID !== l.id
//       })
//       return {posts: new_post_list}

//     }

//     default:
//       return state;
//   }
// }

const userAction = {
  getPostDB,
  addPostDB,
  deletePostDB
}
export {userAction}