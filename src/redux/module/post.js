import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const initialState = {
  title: "title",
  content: "게시글 내용 입니다",
  regionCategory: "지역별",
  themeCategory: ["힐링", "맛집"],
  priceCategory: "10만원대",
  place: [
    {
      addressName: "",
      categoryGroupCode: "",
      categoryGroupName: "",
      categoryName: "",
      distance: "",
      files: [],
      id: "",
      phone: "",
      placeName: "",
      placeUrl: "",
      roadAddressName: "",
      x: "",
      y: "",
    },
  ],
  restroom: "",
  contents: [],
  bookmarkcontents: [],
  lovechecked: false,
  bookmarkchecked: false,
  last: false,
  postId: "",
};

const ALLGET = "post/ALLGET";
const ARRAYGET = "post/ARRAYGET";
const BOOKMARKGET = "post/BOOKMARKGET";
const FILTERGET = "post/FILTERGET";
const BOOKMARK = "post/BOOKMARK";
const LOVE = "post/LOVE";
const LASTPAGE = "post/LASTPAGE";
const GETLIST = "post/GETLIST";
const GET = "post/GET";
const ADD = "post/ADD";
const MODIFY = "post/MODIFY";
const DELETE = "post/DELETE";
const CLEAR = "post/CLEAR";
const GETMYPOST = "post/GETMYPOST";
const GETMYBOOKMARK = "post/GETMYBOOKMARK";

const allGet = createAction(ALLGET, (newList) => ({ newList }));
const arrayGet = createAction(ARRAYGET, (newList) => ({ newList }));
const bookmarkGet = createAction(BOOKMARKGET, (bookmarkList) => ({
  bookmarkList,
}));
const filterGET = createAction(FILTERGET, (newList) => ({ newList }));
const clickLove = createAction(LOVE, (lovechecked, Id) => ({
  lovechecked,
  Id,
}));
const clickBookmark = createAction(BOOKMARK, (bookmarkchecked, Id) => ({
  bookmarkchecked,
  Id,
}));
const lastGet = createAction(LASTPAGE, (last) => ({ last }));
const getPostList = createAction(GET, (postList) => ({ postList }));
const getPost = createAction(GET, (postOne) => ({ postOne }));
const addPost = createAction(ADD, (post) => ({ post }));
const modifyPost = createAction(MODIFY, (post) => ({ post }));
const deletePost = createAction(DELETE, (id) => ({ id }));
const clearPost = createAction(CLEAR);
const getmypost = createAction(GETMYPOST, (myposts) => ({ myposts }));
const getmybookmark = createAction(GETMYBOOKMARK, (mybookmarks) => ({
  mybookmarks,
}));

const allGetDB = (page, size, keyword) => {
  return async function (dispatch) {
    try {
      const response = await instance.get(
        `api/posts?keyword=${keyword}&page=${page}&size=${size}`
      );

      const newList = response.data.content;
      const lastInfo = response.data.last;
      console.log("키워드", response);
      dispatch(allGet(newList));
      dispatch(lastGet(lastInfo));
    } catch (error) {
      console.log(error);
    }
  };
};

const filterGETDB = (region, price, theme, size, page) => {
  return async function (dispatch) {
    try {
      const response = await instance.get(
        `api/posts/filter?region=${region}&price=${price}&theme=${theme}&page=${page}&size=${size}`
      );
      console.log("필터", response);
      const newList = response.data.content;
      const lastInfo = response.data.last;

      dispatch(filterGET(newList));
      dispatch(lastGet(lastInfo));
    } catch (error) {
      console.log(error);
    }
  };
};

const bookmarkGetDB = (keyword, page, size, desc, bookmarkCount) => {
  return async function (dispatch) {
    await instance
      .get(
        `api/posts?keyword=${keyword}&page=${page}&size=${size}&sort=${bookmarkCount},${desc}`
      )
      .then((response) => {
        const bookmarkList = response.data.content;
        dispatch(bookmarkGet(bookmarkList));
        console.log("북마크 순 정렬", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const arrayGetDB = (keyword, page, size, sort, desc) => {
  return async function (dispatch) {
    await instance
      .get(
        `api/posts?keyword=${keyword}&page=${page}&size=${size}&sort=${sort},${desc}`
      )
      .then((response) => {
        console.log("최신순, 좋아요 순 정렬", response);
        const newList = response.data.content;
        const lastInfo = response.data.last;

        dispatch(arrayGet(newList));
        dispatch(lastGet(lastInfo));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const clickLoveDB = (postId) => {
  return async function (dispatch) {
    try {
      const response = await instance.post(`api/love/${postId}`);
      console.log("좋아요 api", response);
      const lovechecked = response.data.trueOrFalse;
      const Id = response.data.postId;

      dispatch(clickLove(lovechecked, Id));
    } catch (error) {
      console.log(error);
    }
  };
};

const clickBookmarkDB = (postId) => {
  return async function (dispatch) {
    try {
      const response = await instance.post(`api/bookmark/${postId}`);

      console.log("북마크 api", response);
      const bookmarkchecked = response.data.trueOrFalse;
      const Id = response.data.postId;

      dispatch(clickBookmark(bookmarkchecked, Id));
    } catch (error) {
      console.log(error);
    }
  };
};

const clearDB = () => {
  return function (dispatch) {
    console.log("clear");
    dispatch(clearPost());
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
};

export const addPostDB = (data) => {
  console.log(data);
  return async function (dispatch, getState) {
    console.log(data);
    await instance
      .post("api/post", data, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        window.alert("작성 성공");
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const modifyPostDB = (data, postId) => {
  return async function (dispatch, getState) {
    await instance
      .post(`api/post/${postId}`, data, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        window.alert("수정 완료");
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deletePostDB = (postId) => {
  console.log(postId);
  return function (dispatch) {
    instance
      .delete(`api/post/${postId}`, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(deletePost(postId));
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getMypostDB = (size, page, id, desc) => {
  return async function (dispatch) {
    try {
      const data = await instance.get(
        `api/user/mypost?size=${size}&page=${page}&sort=${id},${desc}`,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
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
};

export const getMybookmarkDB = () => {
  return async function (dispatch) {
    try {
      const data = await instance.get("api/user/mybookmark", {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      const newData = data.data;
      dispatch(getmybookmark(newData));
      console.log(newData);
    } catch (error) {
      // alert("오류가 발생했습니다. 다시 시도해주세요.");
      console.log(error);
    }
  };
};

//reducer

export default handleActions(
  {
    [ALLGET]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = [...state.contents, ...action.payload.newList];
      }),

    [ARRAYGET]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = [...state.contents, ...action.payload.newList];
      }),

    [BOOKMARKGET]: (state, action) =>
      produce(state, (draft) => {
        draft.bookmarkcontents = [...action.payload.bookmarkList];
      }),

    [FILTERGET]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = [...state.contents, ...action.payload.newList];
      }),

    [LASTPAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.last = action.payload.last;
      }),

    [GETLIST]: (state, action) => {
      return {
        posts: action.payload,
      };
    },

    [GET]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload;
      }),

    [ADD]: (state, action) => {
      return {
        ...state,
        posts: action.payload.post,
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

    /* 
    [DELETE]: (state, action) =>
     produce(state, (draft) => {
    draft.newList = draft.newList.filter(
      (p) => p.postId !== action.payload.postId)
    }),

      produce(state, (draft) => {
        draft.contents = draft.contents.filter((p) =>
        p.postId !== action.payload.postId );
      }),
      */

    [GETMYPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.myposts = action.payload;
      }),

    [GETMYBOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.mybookmarks = action.payload;
      }),

    [LOVE]: (state, action) =>
      produce(state, (draft) => {
        draft.lovechecked = action.payload.lovechecked;
        draft.postId = action.payload.Id;
      }),

    [BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.bookmarkchecked = action.payload.bookmarkchecked;
        draft.postId = action.payload.Id;
      }),

    [CLEAR]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = [];
      }),
  },
  initialState
);

const userAction = {
  bookmarkGetDB,
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
  getMybookmarkDB,
};
export { userAction };
