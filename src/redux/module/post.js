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
const BOOKMARK = "post/BOOKMARK"
const LOVE = "post/LOVE"
const GETLIST = "post/GETLIST"
const GET = "post/GET"
const ADD = "post/ADD"
const MODIFY = "post/MODIFY"
const DELETE = "post/DELETE"
const CLEAR = "post/CLEAR"
const GETMYPOST = "post/GETMYPOST"
const GETMYBOOKMARK = "post/GETMYBOOKMARK"

// Action creator
const allGet = createAction(ALLGET, (newList) => ({newList}));
const filterGET = createAction(FILTERGET, (newList) => ({newList}));
const clickLove = createAction(LOVE);
const clickBookmark = createAction(BOOKMARK);
const getPostList = createAction(GET, (postList) => ({postList}));
const getPost = createAction(GET, (postOne) => ({postOne}));
const addPost = createAction(ADD, (post) => ({post}));
const modifyPost = createAction(MODIFY, (post) => ({post}));
const deletePost = createAction(DELETE, (id) => ({id}));
const clearPost = createAction(CLEAR);
const getmypost = createAction(GETMYPOST, (myposts)=> ({myposts}));
const getmybookmark = createAction(GETMYBOOKMARK, (mybookmarks) => ({mybookmarks}));

const allGetDB = (page, size, keyword, sort, direction) => {
  console.log(page, size, keyword)
    return async function (dispatch) {
      try {
        const response = await instance.get(`api/posts?keyword=${keyword}&page=${page}&size=${size}`
        );
        const newList = response.data.content;
        dispatch(allGet(newList));
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    };
  };

  const filterGETDB = (region, price, theme, page) => {
    console.log(region, price, theme, page)
    const size = 5;
      return async function (dispatch) {
        try {
          const response = await instance.get(`api/posts/filter?region=${region}&price=${price}&theme=${theme}&size=${size}$page=${page}`)
          const newList = response.data.content;
          dispatch(filterGET(newList));
          console.log(response)
  
        } catch (err) {
          console.log("실패")
          console.log(err)
        }
      };
    };

  const clickLoveDB = (postId) => {
    console.log(postId)
    return async function () {
      try {
        const response = await instance.post(`api/love/${postId}`)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    };
  };

  const clickBookmarkDB = (postId) => {
    console.log(postId)
    return async function () {
      try {
        const response = await instance.post(`api/bookmark/${postId}`)
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
        window.alert('작성 성공')
        window.location.assign("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const modifyPostDB = (data, postId) => {
  return async function (dispatch, getState) {
    await instance
      .post(`api/post/${postId}`, data,
       {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token") 
        },
      })
      .then((res) => {
        console.log(res);
        window.alert('수정 완료')
        window.location.assign("/")
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


export const getMypostDB = () => {
  return async function (dispatch) {
  try {
    const data = await instance.get('api/user/mypost',
    {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token") 
      },
    }
    );
    console.log(data)
    const newData = data.data;
    dispatch(getmypost(newData));
    console.log(newData);
  } catch (error) {
    // alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
    
  }
};
}

export const getMybookmarkDB = () => {
  return async function (dispatch) {
  try {
    const data = await instance.get('api/user/mybookmark',
    {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token") 
      },
    }
    );
    const newData = data.data;
    dispatch(getmybookmark(newData));
    console.log(newData);
  } catch (error) {
    // alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
    
  }
};
}


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

    [MODIFY]: (state, action) => {
      produce(state, (draft) => {
        const index = draft.contents.findIndex(
          (p) => p.postId === action.payload.postId
        );
        draft.contents[index] = {
          ...draft.contents[index],
          ...action.payload.post,
        };
      });
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

    [GETMYPOST]:(state, action) => {
      return {
        myposts: action.payload
      };
    },

    [GETMYBOOKMARK]:(state, action) => {
      return {
        mybookmarks: action.payload
      };
    },
  },
  initialState
);




const userAction ={
  // getPostListDB,
  clickLoveDB,
  clickBookmarkDB,
  clearDB,
  filterGETDB,
  allGetDB,
  getPostDB,
  addPostDB,
  modifyPostDB,
  deletePostDB,
  getMypostDB,
  getMybookmarkDB
}
export {userAction}