import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/module/user";
import instance from "../shared/Request";
import "../css/signup.scss";
import logoSmail from "../assets/logo-smail.png";

const Signup = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.user.status);

  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [message, setMessage] = useState("");
  const [messageUsername, setMessageUsername] = useState("");
  const [messageNickname, setMessageNickname] = useState("");

  const [state, setState] = useState(false);
  const [stateUsername, setStateUsername] = useState(false);
  const [stateNickname, setStateNickname] = useState(false);

  const [signupState, setSignupState] = useState(false);
  const [idState, setIdState] = useState(false);
  const [nicknameState, setNicknameState] = useState(false);

  useEffect(() => {
    if (idState && !nicknameState) {
      idcondition();
    }

    if (nicknameState && !idState) {
      nicknamecondition();
    }
  }, [dispatch, idState, nicknameState]);

  useEffect(() => {
    if (signupState) {
      signupCheck();
    }
  }, [status]);

  const idCheck = (username) => {
    return async function (dispatch) {
      await instance
        .post("api/user/idCheck", {
          username: username,
        })
        .then((response) => {
          setIdState(true);
          const status = response.status;

          if (status === 200) {
            setStateUsername(true);
            setMessageUsername("사용 가능한 ID 입니다.");
            setIdState(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIdState(true);

          const status = err.response.status;

          if (status === 400) {
            if (username === "") {
              setStateUsername(false);
              setMessageUsername("공백은 사용할 수 없습니다.");
              setIdState(false);
            } else {
              setStateUsername(false);
              setMessageUsername("이메일 형식이 올바르지 않습니다.");
              setIdState(false);
            }
          }

          if (status === 500) {
            setStateUsername(false);
            setMessageUsername("이미 사용중인 ID 입니다.");
            setIdState(false);
          }
        });
    };
  };

  const nicknameCheck = (nickname) => {
    return async function (dispatch) {
      await instance
        .post("api/user/nickCheck", {
          nickname: nickname,
        })
        .then((response) => {
          console.log(response);
          setNicknameState(true);
          const status = response.status;

          if (status === 200) {
            setStateNickname(true);
            setMessageNickname("사용 가능한 nickname 입니다.");
            setNicknameState(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setNicknameState(true);
          const status = err.response.status;
          console.log(status);

          if (status === 400) {
            if (nickname === "") {
              setStateNickname(false);
              setMessageNickname("공백은 사용할 수 없습니다.");
              setNicknameState(false);
            } else {
              setStateNickname(false);
              setMessageNickname("특수문자는 사용할 수 없습니다.");
              setNicknameState(false);
            }
          }

          if (status === 500) {
            setStateNickname(false);
            setMessageNickname("이미 사용중인 nickname 입니다.");
            setNicknameState(false);
          }
        });
    };
  };

  const idcondition = () => {
    if (username === "") {
      setStateUsername(false);
      setMessageUsername("공백은 사용할 수 없습니다.");
      setIdState(false);
    }

    let emailCheck =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailCheck.test(username)) {
      setStateUsername(false);
      setMessageUsername("이메일 형식이 올바르지 않습니다.");
      setIdState(false);
    }
  };

  const nicknamecondition = () => {
    if (nickname === "") {
      setStateNickname(false);
      setMessageNickname("공백은 사용할 수 없습니다.");
      setNicknameState(false);
    }

    let special_pattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

    if (special_pattern.test(nickname) === true) {
      setStateNickname(false);
      setMessageNickname("특수문자는 사용할 수 없습니다.");
      setNicknameState(false);
    }

    if (nickname.length < 2 || nickname.length > 8) {
      setStateNickname(false);
      setMessageNickname("닉네임은 2자리 이상, 8자리 미만입니다.");
      setNicknameState(false);
    }
  };

  const signupCheck = () => {
    if (status === 400) {
      if (
        username === "" ||
        nickname === "" ||
        password === "" ||
        passwordCheck === ""
      ) {
        setState(false);
        setMessage("모든 칸을 입력해 주세요.");
        setSignupState(false);
      }

      if (password.length < 8 || password.length > 16) {
        setState(false);
        setMessage("비밀번호는 8자리 이상, 16자리 미만입니다.");
        setSignupState(false);
      }

      let special_pattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
      if (special_pattern.test(password) === true) {
        setState(false);
        setMessage("특수문자는 사용할 수 없습니다.");
        setSignupState(false);
      }

      let chk_num = password.search(/[0-9]/g);
      let chk_eng = password.search(/[a-z]/gi);
      if (chk_num < 0 || chk_eng < 0) {
        setState(false);
        setMessage("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
        setSignupState(false);
      }

      if (password !== passwordCheck) {
        setState(false);
        setMessage("비밀번호를 다시 확인해주세요.");
        setSignupState(false);
      }
    }

    if (status === 201) {
      if (password === passwordCheck) {
        setState(true);
        setMessage("비밀번호가 일치합니다.");
      }
    }
  };

  const signup = () => {
    dispatch(userAction.signUpDB(username, nickname, password, passwordCheck));
    setSignupState(true);
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-logo">
          <img src={logoSmail} alt="logo" />
          <div className="signup-shadow"></div>
          <p>야너갈에 가입할 계정을 입력해주세요</p>
        </div>
        <div className="signup-input">
          <label>이메일</label>
          <div className="signup-id">
            <input
              type="text"
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={idCheck(username)}>중복확인</button>
          </div>
          <div className="message">
            <p className={stateUsername === false ? "error" : "success"}>
              {messageUsername}
            </p>
          </div>

          <label>닉네임</label>
          <div className="signup-nickname">
            <input
              type="text"
              label="닉네임"
              placeholder="닉네임을 입력해 주세요"
              onChange={(e) => setNickname(e.target.value)}
            />
            <button onClick={nicknameCheck(nickname)}>중복확인</button>
          </div>
          <div className="message">
            <p className={stateNickname === false ? "error" : "success"}>
              {messageNickname}
            </p>
          </div>

          <label>비밀번호</label>
          <div className="signup-password">
            <input
              type="Password"
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="Password"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              className="passwordCheck"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
          <div className="signup-message">
            <p className={state === false ? "error" : "success"}>{message}</p>
          </div>
          <button onClick={signup} className="signup-btn">
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
