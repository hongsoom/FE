import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/module/user";
import { KAKAO_AUTH_URL } from "../shared/OAuth";
import Kakao_login from "../assets/kakao_login.png";
import logoSmail from "../assets/logo-smail.png";
import "../css/login.scss";

const Login = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.user.status);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState(false);

  const login = () => {
    if (status === 500) {
      if (username === "" || password === "") {
        setMessage("모든 칸을 입력해 주세요.");
      }
    }

    if (status === 400) {
      setMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
      setState(false);
    }
  };

  useEffect(() => {
    if (state) {
      login();
    }
  }, [status]);

  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <div className="login-logo">
            <div className="choi-test"></div>
            <img src={logoSmail} alt="logoSmail" />
            <h2>Welcome!</h2>
            <p>여행 경로가 궁금할땐 야너갈</p>
          </div>
          <div className="choi-test2">
            <div className="login-input">
              <input
                type="text"
                className="login-email"
                placeholder="이메일을 입력해 주세요"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="login-password"
                placeholder="비밀번호를 입력해 주세요"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-message">
              <p>{message}</p>
            </div>
            <div className="login-button">
              <button
                onClick={() => {
                  dispatch(userAction.logInDB(username, password));
                  setState(true);
                }}
                className="login-btn"
              >
                로그인
              </button>
            </div>
            <div className="login-route">
              <a href={"/signup"}>
                회원가입
                <span className="arrow"></span>
              </a>
            </div>
            <div className="login-kakao">
              <a href={KAKAO_AUTH_URL}>
                <img src={Kakao_login} alt="kakao" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
