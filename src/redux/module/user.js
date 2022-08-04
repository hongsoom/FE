import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const SIGNUP = "signup";
const LOGIN = "login";
const LOGOUT = "logout";
const IDCHECK = "idcheck";
const NICKNAMECHECK = "nicknamecheck";
const MYINFO = "myinfo";
const USERINFO = "userinfo";
const EDITMYINFO = "editinfo";

const initialState = {
  list: [],
  isLogin: false,
  status: "",
  message: "",
};

const signUp = createAction(SIGNUP, (result) => ({ result }));
const login = createAction(LOGIN, (result) => ({ result }));
const logOut = createAction(LOGOUT, (result) => ({ result }));
const idCheck = createAction(IDCHECK, (status) => ({ status }));
const nicknameCheck = createAction(NICKNAMECHECK, (status) => ({ status }));
const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));
const userInfo = createAction(USERINFO, (userinfo) => ({ userinfo }));
const editinfo = createAction(EDITMYINFO, (myinfo) => ({ myinfo }));

const signUpDB = (username, nickname, password, passwordCheck) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("api/user/signup", {
        username: username,
        nickname: nickname,
        password: password,
        passwordCheck: passwordCheck,
      });
      const status = response.status;
      dispatch(signUp(status));
      if (response.status === 201) {
        window.location.assign("/login");
      }
    } catch (err) {}
  };
};

const logInDB = (username, password) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("api/user/login", {
        username: username,
        password: password,
      });
      if (response.status === 201) {
        const token = response.headers.authorization;

        sessionStorage.setItem("token", token);

        const message = response.data.message;
        dispatch(login(message));
      }
      if (sessionStorage.getItem("token")) {
        window.location.assign("/");
      }
    } catch (err) {
      const message = err.response.data.message;
      dispatch(login(message));
    }
  };
};

const kakaoLoginDB = (code) => {
  return async function (dispatch) {
    try {
      const response = await instance.get(
        `api/user/kakaoLogin/callback?code=${code}`
      );
      if (response.status === 201) {
        const token = response.headers.authorization;

        sessionStorage.setItem("token", token);
      }
      if (sessionStorage.getItem("token")) {
        window.location.assign("/");
      }
    } catch (err) {}
  };
};

const idCheckDB = (username) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("api/user/idCheck", {
        username: username,
      });
      const status = response.status;
      dispatch(idCheck(status));
    } catch (err) {
      const status = err.response.status;
      dispatch(idCheck(status));
    }
  };
};

const nicknameCheckDB = (nickname) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("api/user/nickCheck", {
        nickname: nickname,
      });
      const status = response.status;
      dispatch(nicknameCheck(status));
    } catch (err) {
      const status = err.response.status;
      dispatch(nicknameCheck(status));
    }
  };
};

const logOutDB = () => {
  return async function (dispatch) {
    sessionStorage.removeItem("token");
    dispatch(logOut());
    window.location.assign("/");
  };
};

const myInfoDB = () => {
  return async function (dispatch) {
    await instance
      .get(`api/user`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        dispatch(myInfo(data));
      })
      .catch((error) => {});
  };
};

const userInfoDB = (userId) => {
  return async function (dispatch) {
    await instance
      .get(`api/user/${userId}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        dispatch(userInfo(data));
      })
      .catch((error) => {});
  };
};

const editInfoDB = (data) => {
  return async function (dispatch) {
    await instance
      .put("api/user", data, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        window.location.assign("/mypage");
      })
      .catch((error) => {});
  };
};

export default handleActions(
  {
    [SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.result;
      }),

    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
        draft.message = action.payload.result;
      }),

    [IDCHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.status;
      }),

    [NICKNAMECHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.status;
      }),

    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
      }),

    [MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myinfo = action.payload.myinfo;
      }),

    [USERINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userinfo = action.payload.userinfo;
      }),

    [EDITMYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myinfo = {
          ...draft.myinfo,
          ...action.payload.myinfo,
        };
      }),
  },
  initialState
);

const userAction = {
  signUpDB,
  logInDB,
  idCheckDB,
  nicknameCheckDB,
  kakaoLoginDB,
  logOutDB,
  myInfoDB,
  userInfoDB,
  editInfoDB,
};

export { userAction };
