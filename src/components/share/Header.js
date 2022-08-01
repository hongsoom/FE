import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegionFilter from "../filter/RegionFilter";
import "../../css/header.scss";
import categoryMenu from "../../assets/categoryMenu.png";
import write from "../../assets/write.png";
import mypage from "../../assets/mypage.png";
import logoSmail from "../../assets/logo-smail.png";

const Header = () => {
  const navigate = useNavigate();

  const is_login = localStorage.getItem("token") ? true : false;

  const [viewCategory, setViewCategory] = useState(false);

  const onClick = () => {
    setViewCategory(!viewCategory);
  };

  return (
    <>
      {viewCategory ? <RegionFilter onClick={onClick} /> : null}
      <div className="header-container">
        <div className="header-content">
          <div className="header-image">
            <img
              src={categoryMenu}
              alt="카테고리 보기"
              className="categoryMenu-icon"
              onClick={onClick}
            />
            <div className="header-title" onClick={() => navigate("/")}>
              <img src={logoSmail} alt="야너갈 로고" className="logoSmail-icon" />
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
