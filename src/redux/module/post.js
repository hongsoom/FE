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
  bookmarkcontents : [],
  loveckecked : false,
  bookmarkckecked : false,
  last : false,
  }


const ALLGET = "post/ALLGET"
const ARRAYGET = "post/ARRAYGET"
const BOOKMARKGET = "post/BOOKMARKGET"
const FILTERGET = "post/FILTERGET"
const BOOKMARK = "post/BOOKMARK"
const LOVE = "post/LOVE"
const LASTPAGE = "post/LASTPAGE"
const GETLIST = "post/GETLIST"
const GET = "post/GET"
const ADD = "post/ADD"
const MODIFY = "post/MODIFY"
const DELETE = "post/DELETE"
const CLEAR = "post/CLEAR"


// Action creator
const allGet = createAction(ALLGET, (newList) => ({newList}));
const arrayGet = createAction(ARRAYGET, (newList) => ({newList}));
const bookmarkGet = createAction(BOOKMARKGET, (bookmarkList) => ({bookmarkList}));
const filterGET = createAction(FILTERGET, (newList) => ({newList}));
const clickLove = createAction(LOVE, (loveckecked) => ({loveckecked}));
const clickBookmark = createAction(BOOKMARK, (bookmarkckecked) => ({bookmarkckecked}));
const lastGet = createAction(LASTPAGE, (last) => ({last}));
const getPostList = createAction(GET, (postList) => ({postList}));
const getPost = createAction(GET, (postOne) => ({postOne}));
const addPost = createAction(ADD, (post) => ({post}));
const modifyPost = createAction(MODIFY, (post) => ({post}));
const deletePost = createAction(DELETE, (id) => ({id}));
const clearPost = createAction(CLEAR);


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

const allGetDB = (page, size, keyword) => {
  console.log(page, size, keyword)
    return async function (dispatch) {
      try {
        const response = await instance.get(`api/posts?keyword=${keyword}&page=${page}&size=${size}`)

        const newList = response.data.content;
        const lastInfo = response.data.last;

        dispatch(allGet(newList));
        dispatch(lastGet(lastInfo));

      } catch (err) {
        console.log(err)
      }
    }
  }

  const filterGETDB = (region, price, theme, size, page) => {
    console.log(region, price, theme, size, page)
      return async function (dispatch) {
        try {
          const response = await instance.get(`api/posts/filter?region=${region}&price=${price}&theme=${theme}&page=${page}&size=${size}`)

          const newList = response.data.content;
          const lastInfo = response.data.last;

          dispatch(filterGET(newList));
          dispatch(lastGet(lastInfo));
        } catch (err) {
          console.log(err)
        }
      }
    }

    const firstGetDB = (keyword, page, size, sort, desc, bookmarkCount) => {
      console.log(page, size, keyword, sort, desc)
        return async function (dispatch) {
          await instance
          .get(`api/posts?keyword=${keyword}&page=${page}&size=${size}&sort=${sort},${desc}`)
          .then((response) => {
            console.log(response);
            
            instance
            .get(`api/posts?keyword=${keyword}&page=${page}&size=${size}&sort=${bookmarkCount},${desc}`)
            .then((response) => {
              console.log(response);
    
              const bookmarkList = response.data.content;
              dispatch(bookmarkGet(bookmarkList));
              })
              .catch((error) => {
                console.error(error)
              }) 
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    
      const arrayGetDB = (keyword, page, size, sort, desc) => {
        console.log(page, size, keyword, sort, desc)
          return async function (dispatch) {
            await instance
            .get(`api/posts?keyword=${keyword}&page=${page}&size=${size}&sort=${sort},${desc}`)
            .then((response) => {
              const newList = response.data.content;
              const lastInfo = response.data.last;
    
              dispatch(arrayGet(newList));
              dispatch(lastGet(lastInfo));

            }).catch((error) => {
              console.log(error)
            })
          }
        }

  const clickLoveDB = (postId) => {
    console.log(postId)
    return async function (dispatch) {
      try {
        const response = await instance.post(`api/love/${postId}`)

        const loveckecked = response.data.trueOrFalse;
        dispatch(clickLove(loveckecked))
      } catch (err) {
        console.log(err)
      }
    }
  }

  const clickBookmarkDB = (postId) => {
    console.log(postId)
    return async function (dispatch) {
      try {
        const response = await instance.post(`api/bookmark/${postId}`)

        const bookmarkckecked = response.data.trueOrFalse;
        dispatch(clickBookmark(bookmarkckecked))
      } catch (err) {
        console.log(err)
      }
    }
  }
  
const clearDB = () => {
  return function (dispatch) {
        dispatch(clearPost());
  }
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

export default handleActions(
  {
    [ALLGET]: (state, action) => 
    produce(state, (draft) => {
      draft.contents = [...state.contents, ...action.payload.newList]
    }),

    [ARRAYGET]: (state, action) => 
    produce(state, (draft) => {
      draft.contents = [...state.contents, ...action.payload.newList]
    }),

    [BOOKMARKGET]: (state, action) => 
    produce(state, (draft) => {
      draft.bookmarkcontents = action.payload.bookmarkList
    }), 

    [FILTERGET]: (state, action) => 
    produce(state, (draft) => {
      draft.contents = [...state.contents, ...action.payload.newList]
    }),
    
    [LASTPAGE]: (state, action) => 
    produce(state, (draft) => {
      draft.last = action.payload.last
    }),
    
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
      draft.newList = draft.newList.filter(
        (p) => p.postId !== action.payload.postId
      );
    }),

    [LOVE]: (state, action) =>
    produce(state, (draft) => {
    draft.loveckecked = action.payload.loveckecked;
    }),

    [BOOKMARK]: (state, action) =>
    produce(state, (draft) => {
    draft.bookmarkckecked = action.payload.bookmarkckecked;
    }),

    [CLEAR]: (state, action) => 
    produce(state, (draft) => {
      draft.contents = []
    }),
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
  firstGetDB,
  arrayGetDB,
  clickLoveDB,
  clickBookmarkDB,
  clearDB,
  filterGETDB,
  allGetDB,
  getPostDB,
  addPostDB,
  deletePostDB
}
export {userAction}