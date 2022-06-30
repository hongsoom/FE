import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const SIGNUP = "signup";
const LOGIN = "login";
const LOGOUT = "logout";
const SET_USER = "setuser";

const initialState  = {
    list: [],
    isLogin: false,
};

const signUp = createAction(SIGNUP, (result) => ({ result }));
const login = createAction(LOGIN, (result) => ({ result }));
const logOut = createAction(LOGOUT, (result) => ({ result }));
const setUser = createAction(SET_USER, (user) => ({ user }));

const signUpDB = (username, nickname, password, passwordCheck) => {
  console.log(username, nickname, password, passwordCheck)
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
          window.alert("회원가입 완료! 로그인 해주세요:)");
          window.location.assign("/login");
        }
      } catch (err) {
        console.log(err)
      }
    };
  };

const logInDB = (username, password) => {
  console.log(username, password)
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
/*         if (localStorage.getItem("token")) {
          window.location.assign("/");
        }  */
    } catch (err) {
      console.log(err)
      }
    };
  };

  const idCheckDB = (username) => {
    console.log(username)
    return async function () {
        const _idCheck = await instance.post("api/user/idCheck", {
          username : username
        })
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            window.alert("사용 가능한 ID입니다.");
          } 
        })
      .catch((err) => {
        console.log(err)
      })
    };
  };

  const nicknameCheckDB = (nickname) => {
    console.log(nickname)
    return async function () {
      try {
        const response = await instance.post("api/user/nickCheck", {
            nickname : nickname
        });
        console.log(response)
        if (response.status === 200) {  
          window.alert("사용 가능한 nickname입니다.");
        }
    } catch (err) {
      console.log(err)
      }
    };
  };  

  const kakaoLoginDB = (code) => {
    console.log(code)
    return async function (dispatch) {
      try {
        const response = await instance.get(
          `api/user/kakaoLogin/callback?code=${code}`
        );
        console.log(response)
        if (response.status === 201) {
          const token = response.data.token;
          localStorage.setItem("token", token);
/*           dispatch(setUser({
            username: response.data.username,
            nickname: response.data.nickname
          })) */
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
        [SET_USER]: (state, action) =>
        produce(state, (draft) => {
        draft.list = action.payload.user;
        draft.isLogin = true;
        }),

        [LOGIN]: (state, action) =>
        produce(state, (draft) => {
        draft.isLogin = true;
        }),

        [LOGOUT]: (state, action) =>
        produce(state, (draft) => {
        draft.isLogin = false;
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