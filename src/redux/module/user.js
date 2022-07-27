import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const SIGNUP = "signup";
const LOGIN = "login";
const LOGOUT = "logout";
const IDCHECK = "idcheck";
const NICKNAMECHECK = "nicknamecheck";
const MYINFO = "myinfo";
const EDITMYINFO = "editinfo";

const initialState = {
  list: [],
  isLogin: false,
  status: "",
};

const signUp = createAction(SIGNUP, (result) => ({ result }));
const login = createAction(LOGIN, (result) => ({ result }));
const logOut = createAction(LOGOUT, (result) => ({ result }));
const idCheck = createAction(IDCHECK, (status) => ({ status }));
const nicknameCheck = createAction(NICKNAMECHECK, (status) => ({ status }));
const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));
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
      console.log(response);
      const status = response.status;
      dispatch(signUp(status));
      if (response.status === 201) {
        window.location.assign("/login");
      }
    } catch (err) {
      console.log(err);
      const status = err.response.data.status;
      dispatch(signUp(status));
    }
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

        localStorage.setItem("token", token);

        const status = response.data.statusCode;
        dispatch(login(status));
      }
      if (localStorage.getItem("token")) {
        window.location.assign("/");
      }
    } catch (err) {
      const status = err.response.data.statusCode;
      dispatch(login(status));
    }
  };
};

const kakaoLoginDB = (code) => {
  return async function (dispatch) {
    try {
      const response = await instance.get(
        `api/user/kakaoLogin/callback?code=${code}`
      );
      console.log(response);
      if (response.status === 201) {
        const token = response.headers.authorization;

        localStorage.setItem("token", token);
      }
      if (localStorage.getItem("token")) {
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
    localStorage.removeItem("token");
    dispatch(logOut());
    window.location.assign("/login");
  };
};

const myInfoDB = () => {
  return async function (dispatch) {
    await instance
      .get("api/user/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        const data = res.data;
        dispatch(myInfo(data));
      })
      .catch((error) => {});
  };
};

const editInfoDB = (data) => {
  console.log(data);
  return async function (dispatch) {
    await instance
      .put("api/user", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
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
        draft.status = action.payload.result;
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
  editInfoDB,
};

export { userAction };
