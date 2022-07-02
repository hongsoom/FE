import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import { KAKAO_AUTH_URL } from "../shared/OAuth";
import Kakao_login from "../assets/kakao_login.png";
import "../css/login.css";

const Login = () => {
  
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
      if (username === "" || password === "") {
        alert("모든 칸을 입력해 주세요.");
        return;
      }

      dispatch(userAction.logInDB(
        username, password
      ))
    }

    return (
      <>
      <div className="login-container">
        <div className="login-content">
          <div className="login-logo">
              <img alt="Logo"/>
          </div>
          <div className="login-input">
              <input type="text" label="이메일" placeholder="이메일을 입력해 주세요"  onChange={(e) => setUsername(e.target.value)}/>

              <input type="password" label="비밀번호" placeholder="비밀번호를 입력해 주세요" onChange={(e) => setPassword(e.target.value)}/>

              <button onClick={login} className="login-btn">로그인</button>
          </div>
          <div className="login-route">
              <p>아직 회원이 아니신가요? &nbsp;
                  <a href={"/signup"}>회원가입
                    <span className="arrow"></span>
                  </a>
              </p>
          </div>
            <div className="kakao-line">OR</div>
            <div className="login-kakao">
              <a href={KAKAO_AUTH_URL}>
                <img src={Kakao_login} alt="kakao"/>
              </a>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login;