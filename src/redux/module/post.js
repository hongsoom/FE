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
const GETMYPOST = "post/GETMYPOST"
const GETMYBOOKMARK = "post/GETMYBOOKMARK"

// Action creator
const allGet = createAction(ALLGET, (newList) => ({newList}));
const arrayGet = createAction(ARRAYGET, (newList) => ({newList}));
const bookmarkGet = createAction(BOOKMARKGET, (bookmarkList) => ({bookmarkList}));
const filterGET = createAction(FILTERGET, (newList) => ({newList}));
const clickLove = createAction(LOVE, (loveckecked) => ({loveckecked}));
const clickBookmark = createAction(BOOKMARK, (bookmarkckecked) => ({bookmarkckecked}));
const lastGet = createAction(LASTPAGE, (last) => ({last}));
const getPostList = createAction(GET, (postList) => ({postList}));
const getPost = createAction(GET, (post) => ({post}));
const addPost = createAction(ADD, (post) => ({post}));
const modifyPost = createAction(MODIFY, (post) => ({post}));
const deletePost = createAction(DELETE, (id) => ({id}));
const clearPost = createAction(CLEAR);
const getmypost = createAction(GETMYPOST, (myposts)=> ({myposts}));
const getmybookmark = createAction(GETMYBOOKMARK, (mybookmarks) => ({mybookmarks}));

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


export const getMypostDB = (size, page, id, desc) => {
  return async function (dispatch) {
  try {
    const data = await instance.get(`api/user/mypost?size=${size}&page=${page}&sort=${id},${desc}`,
    {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token") 
      },
    }
    );
    const myposts = data.data.content;
    dispatch(getmypost(myposts));
    console.log(myposts);
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
    
    [GET]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload;
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


    [GETMYPOST]:(state, action) => 
       produce(state, (draft) => {
        draft.myposts = action.payload
      }),


    [GETMYBOOKMARK]:(state, action) => 
      produce(state, (draft) => {
      draft.mybookmarks = action.payload
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
  modifyPostDB,
  deletePostDB,
  getMypostDB,
  getMybookmarkDB
}
export {userAction}