import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const initialState = {
  title: "",
  content: "",
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
  restroom: "",
  contents: [],
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
const ARRAYGET = "post/ARRAYGET";
const BOOKMARKGET = "post/BOOKMARKGET";
const KEYWORDGET = "post/KEYWORDGET";
const BOOKMARK = "post/BOOKMARK";
const LOVE = "post/LOVE";
const MAINBOOKMARK = "post/MAINBOOKMARK";
const MAINLOVE = "post/MAINLOVE";
const INITPAGING = "post/INITPAGING";
const CLEAR = "post/CLEAR";

const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const initPaging = createAction(INITPAGING);
const arrayGet = createAction(ARRAYGET, (newList, paging) => ({
  newList,
  paging,
}));
const bookmarkGet = createAction(BOOKMARKGET, (bookmarkcontents) => ({
  bookmarkcontents,
}));
const keywordGet = createAction(KEYWORDGET, (newList, paging) => ({
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
const mainLove = createAction(MAINLOVE, (lovechecked, Id) => ({
  lovechecked,
  Id,
}));
const mainBookmark = createAction(MAINBOOKMARK, (bookmarkchecked, Id) => ({
  bookmarkchecked,
  Id,
}));
const clearPost = createAction(CLEAR);

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
      .catch((error) => {
        console.log(error);
      });
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
      .catch((error) => {
        console.log(error);
      });
  };
};

const keywordGetDB = (keyword, nextPage, size) => {
  return async function (dispatch) {
    dispatch(loading(true));
    let page;
    if (nextPage === undefined) {
      page = 0;
    } else {
      page = nextPage;
    }

    await instance
      .get(`api/posts?keyword=${keyword}&page=${page}&size=${size}`)
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
      .catch((error) => {
      });
  };
};

const clickLoveDB = (postId) => {
  return async function (dispatch) {
    await instance
      .post(`api/love/${postId}`)
      .then((response) => {
        const lovechecked = response.data.trueOrFalse;
        const Id = response.data.postId;
        dispatch(clickLove(lovechecked, Id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const clickBookmarkDB = (postId) => {
  return async function (dispatch) {
    await instance
      .post(`api/bookmark/${postId}`)
      .then((response) => {
        const bookmarkchecked = response.data.trueOrFalse;
        const Id = response.data.postId;

        dispatch(clickBookmark(bookmarkchecked, Id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const mainLoveDB = (postId) => {
  return async function (dispatch) {
    await instance
      .post(`api/love/${postId}`)
      .then((response) => {
        const lovechecked = response.data.trueOrFalse;
        const Id = response.data.postId;
        dispatch(mainLove(lovechecked, Id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const mainBookmarkDB = (postId) => {
  return async function (dispatch) {
    await instance
      .post(`api/bookmark/${postId}`)
      .then((response) => {
        const bookmarkchecked = response.data.trueOrFalse;
        const Id = response.data.postId;

        dispatch(mainBookmark(bookmarkchecked, Id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const initPagingDB = () => {
  return function (dispatch) {
    console.log("pagingclear");
    dispatch(initPaging());
  };
};

const clearDB = () => {
  return function (dispatch) {
    console.log("clear");
    dispatch(clearPost());
  };
};

export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
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

    [KEYWORDGET]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = [...state.contents, ...action.payload.newList];
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),

    [LOVE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.lovechecked) {
          draft.contents.map((post) => {
            if (post.postId === parseInt(action.payload.Id)) {
              post.loveStatus = true;
              post.loveCount = +1;
            }
          });
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
        }
      }),

    [BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.bookmarkchecked) {
          draft.contents.map((post) => {
            if (post.postId === parseInt(action.payload.Id))
              post.bookmarkStatus = true;
          });
        } else {
          draft.contents.map((post) => {
            if (post.postId === parseInt(action.payload.Id))
              post.bookmarkStatus = false;
          });
        }
      }),

    [MAINLOVE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.lovechecked) {
          draft.bookmarkcontents.map((post) => {
            if (post.postId === parseInt(action.payload.Id)) {
              post.loveStatus = true;
              post.loveCount = +1;
            }
          });
        } else {
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
        }
      }),

    [MAINBOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.bookmarkchecked) {
          draft.bookmarkcontents.map((post) => {
            if (post.postId === parseInt(action.payload.Id))
              post.bookmarkStatus = true;
          });
        } else {
          draft.bookmarkcontents.map((post) => {
            if (post.postId === parseInt(action.payload.Id))
              post.bookmarkStatus = false;
          });
        }
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
  },
  initialState
);

const userAction = {
  bookmarkGetDB,
  arrayGetDB,
  keywordGetDB,
  clickLoveDB,
  clickBookmarkDB,
  clearDB,
  mainBookmarkDB,
  mainLoveDB,
  initPagingDB,
};
export { userAction };
