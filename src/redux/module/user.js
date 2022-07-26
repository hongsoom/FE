import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const LOGIN = "login";
const LOGOUT = "logout";
const MYINFO = "myinfo";

const initialState = {
  list: [],
  isLogin: false,
  status: "",
};

const login = createAction(LOGIN, (result) => ({ result }));
const logOut = createAction(LOGOUT, (result) => ({ result }));
const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));

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
      .catch((error) => {
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
        draft.status = action.payload.result;
      }),

    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
      }),

    [MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myinfo = action.payload.myinfo;
      }),
  },
  initialState
);

const userAction = {
  logInDB,
  kakaoLoginDB,
  logOutDB,
  myInfoDB,
};

export { userAction };
