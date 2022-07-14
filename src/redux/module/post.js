import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import instance from "../../shared/Request";



const initialState ={
  title : 'title',
  content : '게시글 내용 입니다',
  regionCategory : '지역별',
  themeCategory : ['힐링','맛집'],
  priceCategory : '10만원대',
  place: [
    {
     addressName:'',
     categoryGroupCode:'',
     categoryGroupName:'',
     categoryName: '',
     distance:'',
     files: [],
     id:'',
     phone: '',
     placeName: '',
     placeUrl: '',
     roadAddressName: '',
     x: '',
     y: '',
    }
  ],
  restroom: '',
  contents : [],
  }


const ALLGET = "post/ALLGET"
const FILTERGET = "post/FILTERGET"
const GETLIST = "post/GETLIST"
const GET = "post/GET"
const ADD = "post/ADD"
const MODIFY = "post/MODIFY"
const DELETE = "post/DELETE"
const CLEAR = 'post/CLEAR'


// Action creator
const allGet = createAction(ALLGET, (newList) => ({newList}))
const filterGET = createAction(FILTERGET, (newList) => ({newList}))
const getPostList = createAction(GET, (postList) => ({postList}))
const getPost = createAction(GET, (postOne) => ({postOne}));
const addPost = createAction(ADD, (post) => ({post}));
const modifyPost = createAction(MODIFY, (post) => ({post}));
const deletePost = createAction(DELETE, (id) => ({id}));
const clearPost = createAction(CLEAR);



const allGetDB = (page, size, keyword) => {
  console.log(page, size, keyword)
    return async function (dispatch) {
      try {
        const response = await instance.get(`api/posts?keyword=${keyword}&page=${page}&size=${size}`
        );
        const newList = response.data.content;
        dispatch(allGet(newList));

      } catch (err) {
        console.log(err)
      }
    };
  };

  const filterGETDB = (region, price, theme, size, page) => {
    console.log(region, price, theme, size, page)
      return async function (dispatch) {
        try {
          const response = await instance.get(`http://sparta-hj.site/api/posts/filter?region=${region}&price=${price}&theme=${theme}&size=${size}$page=${page}`)
          const newList = response.data.content;
          dispatch(filterGET(newList));
          console.log(response)
  
        } catch (err) {
          console.log(err)
        }
      };
    };


export const getPostDB = (postId) => {
  return async function (dispatch) {
  try {
    const data = await instance.get(`api/post/${postId}`);
    const newData = data.data.body;
    dispatch(getPost(newData));
    console.log(newData);
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
          Authorization: localStorage.getItem("token") 
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

export const deletePostDB = (postId) => {
  console.log(postId)
  return function (dispatch) {
    instance
      .delete(`api/post/${postId}`,
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token") 
        },
      }
      )
      .then((res) => {
        dispatch(deletePost(postId));
        window.location.assign("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const clearDB = () => {
  return function (dispatch) {
        dispatch(clearPost());
  }
};


//reducer
export default handleActions(
  {
    [ALLGET]: (state, action) => {
      return {
      contents : [...state.contents, ...action.payload.newList]
      };
    },

    [FILTERGET]: (state, action) => {
      return {
      contents : [...state.contents, ...action.payload.newList]
      };
    },
    
    [GETLIST]:(state, action) => {
      return {
        posts: action.payload
      };
    },
    
    [GET]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.postOne = payload.postOne;
      }),
    

    [ADD]: (state, action) => {
      return {
        ...state,
        posts: action.payload.post
      };
    },

    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = draft.contents.filter((p) =>
        p.postId !== action.payload.postId );
      }),


      [CLEAR]: (state, action) => {
        return {
          ...state,
          contents: []
        };
      },

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


const userAction ={
  // getPostListDB,
  clearDB,
  filterGETDB,
  allGetDB,
  getPostDB,
  addPostDB,
  deletePostDB
}
export {userAction}