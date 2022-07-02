import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const SIGNUP = "signup";
const LOGIN = "login";
const LOGOUT = "logout";
const IDCHECK = "idcheck";
const NICKNAMECHECK = "nicknamecheck";

const initialState  = {
    list : [],
    status : "",
    isLogin : false,
};

const signUp = createAction(SIGNUP, (result) => ({ result }));
const login = createAction(LOGIN, (result) => ({ result }));
const logOut = createAction(LOGOUT, (result) => ({ result }));
const idCheck = createAction(IDCHECK, (status) => ({ status }));
const nicknameCheck = createAction(NICKNAMECHECK, (status) => ({ status }));

const signUpDB = (username, nickname, password, passwordCheck) => {
    return async function () {
      try {
        const response = await instance.post("api/user/signup", {
          username: username,
          nickname : nickname,
          password : password,
          passwordCheck : passwordCheck,
        });
        console.log(response)
        if (response.status === 200) {
          window.location.assign("/login");
        }
      } catch (err) {
        console.log(err)
      }
    };
  };

const logInDB = (username, password) => {
    return async function (dispatch) {
      try {
        const response = await instance.post("api/user/login", {
          username : username,
          password : password,
        });
        console.log(response)
        if (response.status === 201) {
          const token = response.headers.authorization;
          localStorage.setItem("token", token);
          dispatch(login(true));
        }
        if (localStorage.getItem("token")) {
          window.location.assign("/");
        }
    } catch (err) {
      console.log(err)
      }
    };
  };

  const idCheckDB = (username) => {
    return async function (dispatch) {
      try {
        const response = await instance.post("api/user/idCheck", {
          username : username
        });
        console.log(response)
        const status = response.status;
        dispatch(idCheck(status))
      } catch (err) {
        console.log(err)
        const status = err.response.status;
        dispatch(idCheck(status))
      }
    };
  };

  const nicknameCheckDB = (nickname) => {
    return async function (dispatch) {
      try {
        const response = await instance.post("api/user/nickCheck", {
            nickname : nickname
        });
        console.log(response)
        const status = response.status;
        dispatch(nicknameCheck(status))
    } catch (err) {
      console.log(err)
        const status = err.response.status;
        dispatch(nicknameCheck(status))
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
      } catch (err) {
        console.log(err)
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

export default handleActions(
    {  
       [LOGIN]: (state, action) =>
        produce(state, (draft) => {
        draft.isLogin = true;
        }),

        [LOGOUT]: (state, action) =>
        produce(state, (draft) => {
        draft.isLogin = false;
        }),

        [IDCHECK]: (state, action) =>
        produce(state, (draft) => {
        draft.status = action.payload.status;
        }),

        [NICKNAMECHECK]: (state, action) =>
        produce(state, (draft) => {
        draft.status = action.payload.status;
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
};
      
export { userAction };    