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

const BOOKMARK = "post/BOOKMARK";
const LOVE = "post/LOVE";
const MAINBOOKMARK = "post/MAINBOOKMARK";
const MAINLOVE = "post/MAINLOVE";

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

const clickLoveDB = (postId) => {
  return async function (dispatch) {
    await instance
      .post(`api/love/${postId}`)
      .then((response) => {
        console.log("좋아요 api", response);
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
        console.log("북마크 api", response);
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
        console.log("메인좋아요 api", response);
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
        console.log("메인북마크 api", response);
        const bookmarkchecked = response.data.trueOrFalse;
        const Id = response.data.postId;

        dispatch(mainBookmark(bookmarkchecked, Id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export default handleActions(
  {
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
  },
  initialState
);

const userAction = {
  clickLoveDB,
  clickBookmarkDB,
  mainBookmarkDB,
  mainLoveDB,
};
export { userAction };
