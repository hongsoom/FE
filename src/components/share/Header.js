import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/header.scss";
import info from "../../assets/info.png";
import write from "../../assets/write.png";
import mypage from "../../assets/mypage.png";
import logoSmail from "../../assets/logo-smail.png";

const Header = () => {
  const navigate = useNavigate();

  const is_login = localStorage.getItem("token") ? true : false;

  return (
    <>
      <div className="header-container">
        <div className="header-content">
          <div className="header-image">
            <img src={info} alt="홈페이지 정보" className="categoryMenu-icon" />
            <div className="header-title" onClick={() => navigate("/")}>
              <img
                src={logoSmail}
                alt="야너갈 로고"
                className="logoSmail-icon"
              />
              <p>야, 너도 갈래?</p>
            </div>
            <div className="header-icon">
              {is_login ? (
                <>
                  <img
                    src={write}
                    alt="게시글 작성하기"
                    className="write-icon"
                    onClick={() => navigate("/write")}
                  />
                  <img
                    src={mypage}
                    alt="마이페이지로 이동하기"
                    className="mypage-icon"
                    onClick={() => navigate("/mypage")}
                  />
                </>
              ) : (
                <p className="login-icon">
                  <a href={"/login"}>로그인</a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
