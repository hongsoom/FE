import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/module/user";
import "../css/signup.css";

const Signup = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const [message, setMessage] = useState("");
    const [messageUsername, setMessageUsername] = useState("");
    const [messageNickname, setMessageNickname] = useState("");

    const [state, setState] = useState(undefined);

    const status = useSelector((state) => state.user.status);

    const signup = () => {
        if (username === "" || nickname === "" || password === "" || passwordCheck === "") {
            setState(false);
            setMessage("모든 칸을 입력해 주세요.");
            return;
        }

        if (password.length < 8 || password.length > 16) {
            setState(false);
            setMessage("비밀번호는 8자리 이상, 16자리 미만입니다.");
            return;
        }

        let chk_num = password.search(/[0-9]/g);
        let chk_eng = password.search(/[a-z]/ig);
        if(chk_num < 0 || chk_eng < 0) {
            setState(false);
            setMessage("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
            return;
        }

        if (password !== passwordCheck) {
            setState(false);
            setMessage("비밀번호를 다시 확인해주세요.");
            return;
        }

        if (password === passwordCheck) {
            setState(true);
            setMessage("비밀번호가 일치합니다.");
            return;
        }

        dispatch(userAction.signUpDB(
            username, nickname, password, passwordCheck
        ))
    }

    const idCheck = () => {
        let emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;;
        
        if(!emailCheck.test(username)) {
            setState(false);
            setMessageUsername("이메일 형식이 올바르지 않습니다.");
            return; 
        }

        if(status === 500) {
            setState(false);
            setMessageUsername("이미 사용중인 ID 입니다.");
            return;
        }

        if(status === 200) {
            setState(true);
            setMessageUsername("사용 가능한 ID 입니다.");
            return;
        }

        dispatch(userAction.idCheckDB(
            username
        ))
    }

    const nicknameCheck = () => {
        
        if(nickname === "") {
            setState(false);
            setMessageNickname("공백은 사용할 수 없습니다.");
            return;
        }

        let special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

        if(special_pattern.test(nickname) === true ){
            setState(false);
            setMessageNickname("특수문자는 사용할 수 없습니다.");
            return;
        }

        if (nickname.length < 2 || nickname.length > 8) {
            setState(false);
            setMessageNickname("닉네임은 2자리 이상, 8자리 미만입니다.");
            return;
        }

        if(status === 500) {
            setState(false);
            setMessageNickname("이미 사용중인 nickname 입니다.");
            return;
        }

        if(status === 200) {
            setState(true);
            setMessageNickname("사용 가능한 nickname 입니다.");
            return;
        }

        dispatch(userAction.nicknameCheckDB(
            nickname
        ))
    }

  return (
    <div className="signup-container">
        <div className="signup-content">
            <div className="signup-input">
                <label>이메일</label>
                    <div className="signup-id">
                        <input type="text" label="이메일" placeholder="이메일을 입력해 주세요" onChange={(e) => setUsername(e.target.value)}/>
                        <button onClick={idCheck}>중복확인</button>
                    </div>
                    <div className="message">
                        <p className={state === false ? "error" : "success"}>{messageUsername}</p>
                    </div>

                <label>닉네임</label>
                    <div className="signup-nickname">
                        <input type="text" label="닉네임" placeholder="닉네임을 입력해 주세요" onChange={(e) => setNickname(e.target.value)}/>
                        <button onClick={nicknameCheck}>중복확인</button>
                    </div>
                    <div className="message">
                        <p className={state === false ? "error" : "success"}>{messageNickname}</p>
                    </div>

                <label>비밀번호</label>
                    <div className="signup-password">
                        <input type="Password" label="비밀번호" placeholder="비밀번호를 입력해 주세요" className="password" onChange={(e) => setPassword(e.target.value)}/>
                        <input type="Password" label="비밀번호 확인" placeholder="비밀번호 확인" className="passwordCheck"onChange={(e) => setPasswordCheck(e.target.value)}/>
                    </div>
                    <div className="message">
                        <p className={state === false ? "error" : "success"}>{message}</p>
                    </div>
                <button onClick={signup} className="signup-btn">시작하기</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;