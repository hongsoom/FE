import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import "../css/Signup.css";

const Signup = () => {
    const dispatch = useDispatch();

    const [username, setusername] = useState("");
    const [nickname, setnickname] = useState("");
    const [password, setpassword] = useState("");
    const [passwordCheck, setpasswordCheck] = useState("");

    const signup = () => {
        if (username === "" || nickname === "" || password === "" || passwordCheck === "") {
            alert("모든 칸을 입력해 주세요.");
            return;
        }

        if (nickname.length < 2 || nickname.length > 8) {
            alert("닉네임은 2자리 이상, 8자리 미만입니다.");
            return;
        }

        if (password.length < 8 || password.length > 16) {
            alert("비밀번호는 8자리 이상, 16자리 미만입니다.");
            return;
        }

        let chk_num = password.search(/[0-9]/g);
        let chk_eng = password.search(/[a-z]/ig);
        if(chk_num < 0 || chk_eng < 0) {
            alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
            return;
        }

        if (password !== passwordCheck) {
            alert("비밀번호를 다시 확인해주세요.");
            return;
        }

        dispatch(userAction.signUpDB(
            username, nickname, password, passwordCheck
        ))
    }

    const idCheck = () => {
        let emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;;
        
        if(!emailCheck.test(username)) {
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }

        dispatch(userAction.idCheckDB(
            username
        ))
    }

    const nicknameCheck = () => {
        let blank_pattern = /[\s]/g;

        if(blank_pattern.test(nickname) === true) {
            alert("공백은 사용할 수 없습니다.");
            return;
        }

        let special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

        if(special_pattern.test(nickname) === true ){
            alert('특수문자는 사용할 수 없습니다.');
            return;
        }

        dispatch(userAction.nicknameCheckDB(
            nickname
        ))
    }

  return (
    <div className="Signup-container">
        <div className="Signup-content">
            <div className="Signup-logo">
                <img alt="Logo"/>
            </div>
            <div className="Signup-input">
                <label>이메일</label>
                    <div className="Signup-id">
                        <input type="text" label="이메일" placeholder="이메일을 입력해 주세요" onChange={(e) => setusername(e.target.value)}/>
                        <button onClick={idCheck}>중복확인</button>
                    </div>

                <label>닉네임</label>
                    <div className="Signup-nickname">
                        <input type="text" label="닉네임" placeholder="닉네임을 입력해 주세요" onChange={(e) => setnickname(e.target.value)}/>
                        <button onClick={nicknameCheck}>중복확인</button>
                    </div>

                <label>비밀번호</label>
                    <input type="Password" label="비밀번호" placeholder="비밀번호를 입력해 주세요" onChange={(e) => setpassword(e.target.value)}/>

                <label>비밀번호 확인</label>
                    <input type="Password" label="비밀번호 확인" placeholder="비밀번호를 다시 입력해 주세요" onChange={(e) => setpasswordCheck(e.target.value)}/>

                <button onClick={signup} className="Signup-btn">시작하기</button>

{/*                     <p>계정이 있으신가요? &nbsp;
                        <a href={"/Login"}>로그인</a>
                    </p> */}
                </div>
            </div>
        </div>
    )
}

export default Signup;