import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import { KAKAO_AUTH_URL } from "../shared/OAuth";
import Kakao_login from "../assets/kakao_login.png";
import "../css/Login.css";

const Login = () => {
  
    const dispatch = useDispatch();

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

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
      <div className="Login-container">
        <div className="Login-content">
          <div className="Login-logo">
              <img alt="Logo"/>
          </div>
          <div className="Login-input">
              <input type="text" label="이메일" placeholder="이메일을 입력해 주세요"  onChange={(e) => setusername(e.target.value)}/>

              <input type="password" label="비밀번호" placeholder="비밀번호를 입력해 주세요" onChange={(e) => setpassword(e.target.value)}/>

              <button onClick={login} className="Login-btn">로그인</button>

              <p>아직 회원이 아니신가요? &nbsp;
                  <a href={"/Signup"}>회원가입</a>
              </p>
          </div>
          <div className="Login-social">
            <div className="kakao-line">
              <hr></hr>
              <p>OR</p>
              <hr></hr>
            </div>
            <div className="Login-kakao">
              <a href={KAKAO_AUTH_URL}>
                <img src={Kakao_login} alt="kakao"/>
              </a>
            </div>
          </div>
        </div>
    </div>
    );
  };

export default Login;