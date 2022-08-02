import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const initialState = {
  postOne: {
    loveStatus: false,
    bookmarkStatus: false,
    title: "",
    content: "",
    nickname: "",
    grade: "",
    loveCount: "",
    postId: 0,
    userId: 0,
    userImgUrl: "",
    regionCategory: "",
    themeCategory: [],
    priceCategory: "",
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
  },
  restroom: "",
  contents: [],
  postOne: "",
  bookmarkcontents: [],
  filtercontents: [],
  postId: "",
  isLoading: false,
  isFilter: false,
  paging: {
    next: 0,
    last: false,
  },
  category: {
    region: "",
    theme: "",
    price: "",
  },
};

const LOADING = "post/LOADING";
const ISFILTER = "post/ISFILTER";
const KEYWORDGET = "post/KEYWORDGET";
const REGIONGET = "post/REGIONGET";
const ARRAYGET = "post/ARRAYGET";
const BOOKMARKGET = "post/BOOKMARKGET";
const FILTERGET = "post/FILTERGET";
const BOOKMARK = "post/BOOKMARK";
const LOVE = "post/LOVE";
const INITPAGING = "post/INITPAGING";
const GETLIST = "post/GETLIST";
const GET = "post/GET";
const ADD = "post/ADD";
const MODIFY = "post/MODIFY";
const DELETE = "post/DELETE";
const CLEAR = "post/CLEAR";
const POSTCLEAR = "post/POSTCLEAR";
const GETMYPOST = "post/GETMYPOST";
const GETMYBOOKMARK = "post/GETMYBOOKMARK";
const GETUSERPOST = "post/GETUSERPOST";
const GETUSERBOOKMARK = "post/GETUSERBOOKMARK";

const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const isfilter = createAction(ISFILTER, (isfilter) => ({ isfilter }));
const initPaging = createAction(INITPAGING);
const keywordGet = createAction(KEYWORDGET, (newList, paging) => ({
  newList,
  paging,
}));
const arrayGet = createAction(ARRAYGET, (newList, paging) => ({
  newList,
  paging,
}));
const bookmarkGet = createAction(BOOKMARKGET, (bookmarkcontents) => ({
  bookmarkcontents,
}));
const filterGET = createAction(FILTERGET, (newList, paging, category) => ({
  newList,
  paging,
  category,
}));
const regionGET = createAction(REGIONGET, (newList, paging) => ({
  newList,
  paging,
}));
const clickLove = createAction(LOVE, (lovechecked, Id) => ({
  lovechecked,
  Id,
}));
const clickBookmark = createAction(BOOKMARK, (bookmarkchecked, Id) => ({
  bookmarkchecked,
  Id,
}));
const clearPost = createAction(CLEAR);
const clearPostOne = createAction(POSTCLEAR);
const getPostList = createAction(GET, (postList) => ({ postList }));
const getPost = createAction(GET, (postOne) => ({ postOne }));
const addPost = createAction(ADD, (post) => ({ post }));
const modifyPost = createAction(MODIFY, (post) => ({ post }));
const deletePost = createAction(DELETE, (id) => ({ id }));
const getmypost = createAction(GETMYPOST, (posts) => ({ posts }));
const getmybookmark = createAction(GETMYBOOKMARK, (posts) => ({
  posts,
}));
const getuserpost = createAction(GETMYPOST, (posts) => ({ posts }));
const getuserbookmark = createAction(GETMYBOOKMARK, (posts) => ({
  posts,
}));

const bookmarkGetDB = (keyword, nextPage, size, desc, bookmarkCount) => {
  return async function (dispatch) {
    let page;
    if (nextPage === undefined) {
      page = 0;
    }

    await instance
      .get(
        `api/posts?keyword=${keyword}&page=${page}&size=${size}&sort=${bookmarkCount},${desc}`
      )
      .then((response) => {
        const bookmarkcontents = response.data.content;
        dispatch(bookmarkGet(bookmarkcontents));
      })
      .catch((error) => {});
  };
};

const arrayGetDB = (keyword, nextPage, size, sort, desc) => {
  return async function (dispatch) {
    dispatch(loading(true));
    let page;
    if (nextPage === undefined) {
      page = 0;
    } else {
      page = nextPage;
    }
    if (keyword === undefined) {
      keyword = "";
    }
    if (sort === undefined) {
      sort = "id";
    }
    if (desc === undefined) {
      desc = "desc";
    }
    await instance
      .get(
        `api/posts?keyword=${keyword}&page=${page}&size=${size}&sort=${sort},${desc}`
      )
      .then((response) => {
        const newList = response.data.content;
        const lastpage = response.data.last;

        let paging = {};
        if (lastpage) {
          paging = {
            next: 0,
            last: lastpage,
          };
        } else {
          paging = {
            next: page + 1,
            last: lastpage,
          };
        }

        dispatch(arrayGet(newList, paging));
      })
      .catch((error) => {});
  };
};

const keywordGetDB = (keyword, nextPage, size) => {
  return async function (dispatch) {
    dispatch(loading(true));
    let page;
    let sort = "id";
    let desc = "desc";
    if (nextPage === undefined) {
      page = 0;
    } else {
      page = nextPage;
    }

    await instance
      .get(
        `api/posts?keyword=${keyword}&page=${page}&size=${size}&sort=${sort},${desc}`
      )
      .then((response) => {
        const newList = response.data.content;
        const lastpage = response.data.last;

        let paging = {};
        if (lastpage) {
          paging = {
            next: 0,
            last: lastpage,
          };
        } else {
          paging = {
            next: page + 1,
            last: lastpage,
          };
        }

        dispatch(keywordGet(newList, paging));
      })
      .catch((error) => {});
  };
};

const filterGETDB = (region, price, theme, nextPage, size) => {
  return async function (dispatch) {
    dispatch(loading(true));
    let page;
    let sort = "id";
    let desc = "desc";
    if (nextPage === undefined) {
      page = 0;
    } else {
      page = nextPage;
    }
    if (region === undefined) {
      region = "";
    }
    if (price === undefined) {
      price = "";
    }
    if (theme === undefined) {
      theme = "";
    }
    await instance
      .get(
        `api/posts/filter?region=${region}&price=${price}&theme=${theme}&page=${page}&size=${size}&sort=${sort},${desc}`
      )
      .then((response) => {
        const newList = response.data.content;
        const lastpage = response.data.last;
        let paging = {};
        if (lastpage) {
          paging = {
            next: 0,
            last: lastpage,
          };
        } else {
          paging = {
            next: page + 1,
            last: lastpage,
          };
        }

        let category = {};
        category = {
          region: region,
          theme: theme,
          price: price,
        };

        dispatch(filterGET(newList, paging, category));
      })
      .catch((error) => {});
  };
};

const regionGETDB = (region, nextPage, size) => {
  return async function (dispatch) {
    dispatch(loading(true));
    let page;
    let price;
    let theme;
    let sort = "id";
    let desc = "desc";
    if (nextPage === undefined) {
      page = 0;
    } else {
      page = nextPage;
    }
    if (price === undefined) {
      price = "";
    }

    if (theme === undefined) {
      theme = "";
    }

    await instance
      .get(
        `api/posts/filter?region=${region}&price=${price}&theme=${theme}&page=${page}&size=${size}&sort=${sort},${desc}`
      )
      .then((response) => {
        const newList = response.data.content;
        const lastpage = response.data.last;

        let paging = {};
        if (lastpage) {
          paging = {
            next: 0,
            last: lastpage,
          };
        } else {
          paging = {
            next: page + 1,
            last: lastpage,
          };
        }

        dispatch(regionGET(newList, paging));
      })
      .catch((error) => {});
  };
};

export const clickLoveDB = (postId) => {
  return async function (dispatch) {
    await instance
      .post(`api/love/${postId}`)
      .then((response) => {
        const lovechecked = response.data.trueOrFalse;
        const Id = response.data.postId;
        dispatch(clickLove(lovechecked, Id));
      })
      .catch((error) => {});
  };
};

export const clickBookmarkDB = (postId) => {
  return async function (dispatch) {
    await instance
      .post(`api/bookmark/${postId}`)
      .then((response) => {
        const bookmarkchecked = response.data.trueOrFalse;
        const Id = response.data.postId;

        dispatch(clickBookmark(bookmarkchecked, Id));
      })
      .catch((error) => {});
  };
};

const isFilterDB = () => {
  return function (dispatch) {
    dispatch(isfilter());
  };
};

const initPagingDB = () => {
  return function (dispatch) {
    dispatch(initPaging());
  };
};

const clearDB = () => {
  return function (dispatch) {
    dispatch(clearPost());
  };
};

export const clearPostDB = () => {
  return function (dispatch) {
    dispatch(clearPostOne());
  };
};

export const getPostDB = (postId) => {
  return async function (dispatch) {
    try {
      const data = await instance.get(`api/post/${postId}`);
      const newData = data.data.body;
      dispatch(getPost(newData));
    } catch (error) {}
  };
};

export const addPostDB = (data) => {
  return async function (dispatch, getState) {
    await instance
      .post("api/post", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        window.location.assign("/");
      })
      .catch((error) => {});
  };
};

export const modifyPostDB = (data, postId) => {
  return async function (dispatch, getState) {
    await instance
      .put(`api/post/${postId}`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {})
      .catch((error) => {});
  };
};

export const deletePostDB = (postId) => {
  return function (dispatch) {
    instance
      .delete(`api/post/${postId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(deletePost(postId));
      })
      .catch((error) => {});
  };
};

export const getMypostDB = (size, page, id, desc) => {
  return async function (dispatch) {
    try {
      const data = await instance.get(
        `api/user/mypost?size=${size}&page=${page}&sort=${id},${desc}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const posts = data.data.content;
      dispatch(getmypost(posts));
    } catch (error) {}
  };
};

export const getMybookmarkDB = (size, page, id, desc) => {
  return async function (dispatch) {
    try {
      const data = await instance.get(
        `api/user/mybookmark?size=${size}&page=${page}&sort=${id},${desc}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const posts = data.data;
      dispatch(getmybookmark(posts));
    } catch (error) {}
  };
};

export const getUserpostDB = (userId, size, page, id, desc) => {
  return async function (dispatch) {
    try {
      const data = await instance.get(
        `api/user/mypost/${userId}?size=${size}&page=${page}&sort=${id},${desc}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const posts = data.data.content;
      dispatch(getuserpost(posts));
    } catch (error) {}
  };
};

export const getUserbookmarkDB = (userId, size, page, id, desc) => {
  return async function (dispatch) {
    try {
      const data = await instance.get(
        `api/user/mybookmark/${userId}?size=${size}&page=${page}&sort=${id},${desc}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const posts = data.data;
      dispatch(getuserbookmark(posts));
    } catch (error) {}
  };
};

export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),

    [ISFILTER]: (state, action) =>
      produce(state, (draft) => {
        draft.isFilter = false;
      }),

    [KEYWORDGET]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = [...state.contents, ...action.payload.newList];
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),

    [ARRAYGET]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = [...state.contents, ...action.payload.newList];
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),

    [BOOKMARKGET]: (state, action) =>
      produce(state, (draft) => {
        draft.bookmarkcontents = [...action.payload.bookmarkcontents];
      }),

    [FILTERGET]: (state, action) =>
      produce(state, (draft) => {
        draft.filtercontents = [
          ...state.filtercontents,
          ...action.payload.newList,
        ];
        draft.paging = action.payload.paging;
        draft.category = action.payload.category;
        draft.isLoading = false;
        draft.isFilter = true;
      }),

    [REGIONGET]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = [...state.contents, ...action.payload.newList];
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),

    [GETLIST]: (state, action) => {
      return {
        posts: action.payload,
      };
    },

    [GET]: (state, action) =>
      produce(state, (draft) => {
        draft.postOne = action.payload.postOne;
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

    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = draft.contents.filter(
          (p) => p.postId !== action.payload.postId
        );
      }),

    [GETMYPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.myposts = action.payload;
      }),

    [GETMYBOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.mybookmarks = action.payload;
      }),

    [GETUSERPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.myposts = action.payload;
      }),

    [GETUSERBOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.mybookmarks = action.payload;
      }),

    [LOVE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.lovechecked) {
          draft.contents.map((post) => {
            if (post.postId === parseInt(action.payload.Id)) {
              post.loveStatus = true;
              post.loveCount += 1;
            }
          });
          draft.bookmarkcontents.map((post) => {
            if (post.postId === parseInt(action.payload.Id)) {
              post.loveStatus = true;
              post.loveCount += 1;
            }
          });
          if (draft.postOne.postId === parseInt(action.payload.Id)) {
            draft.postOne.loveStatus = true;
            draft.postOne.loveCount += 1;
          }
        } else {
          draft.contents.map((post) => {
            if (post.postId === parseInt(action.payload.Id)) {
              post.loveStatus = false;
              if (post.loveCount < 0) {
                post.loveCount = 0;
              } else {
                post.loveCount -= 1;
              }
            }
          });
          draft.bookmarkcontents.map((post) => {
            if (post.postId === parseInt(action.payload.Id)) {
              post.loveStatus = false;
              if (post.loveCount < 0) {
                post.loveCount = 0;
              } else {
                post.loveCount -= 1;
              }
            }
          });
          if (draft.postOne.postId === parseInt(action.payload.Id)) {
            draft.postOne.loveStatus = false;
            if (draft.postOne.loveCount < 0) {
              draft.postOne.loveCount = 0;
            } else {
              draft.postOne.loveCount -= 1;
            }
          }
        }
        draft.postId = action.payload.Id;
      }),

    [BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.bookmarkchecked) {
          draft.contents.map((post) => {
            if (post.postId === parseInt(action.payload.Id))
              post.bookmarkStatus = true;
          });
          draft.bookmarkcontents.map((post) => {
            if (post.postId === parseInt(action.payload.Id))
              post.bookmarkStatus = true;
          });
          if (draft.postOne.postId === parseInt(action.payload.Id)) {
            draft.postOne.bookmarkStatus = true;
          }
        } else {
          draft.contents.map((post) => {
            if (post.postId === parseInt(action.payload.Id))
              post.bookmarkStatus = false;
          });
          draft.bookmarkcontents.map((post) => {
            if (post.postId === parseInt(action.payload.Id))
              post.bookmarkStatus = false;
          });
          if (draft.postOne.postId === parseInt(action.payload.Id)) {
            draft.postOne.bookmarkStatus = false;
          }
        }
        draft.postId = action.payload.Id;
      }),

    [INITPAGING]: (state, action) =>
      produce(state, (draft) => {
        draft.paging.next = 0;
        draft.paging.last = false;
      }),

    [CLEAR]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = [];
        draft.filtercontents = [];
      }),

    [POSTCLEAR]: (state, action) =>
      produce(state, (draft) => {
        draft.postOne = "";
      }),
  },
  initialState
);

const userAction = {
  bookmarkGetDB,
  arrayGetDB,
  clearDB,
  filterGETDB,
  keywordGetDB,
  getPostDB,
  addPostDB,
  modifyPostDB,
  deletePostDB,
  getMypostDB,
  getMybookmarkDB,
  initPagingDB,
  regionGETDB,
  isFilterDB,
};

export { userAction };
