import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegionFilter from "../filter/RegionFilter";
import "../../css/header.scss";
import categoryMenu from "../../assets/categoryMenu.png";
import write from "../../assets/write.png";
import mypage from "../../assets/mypage.png";
import logoSmail from "../../assets/logo-smail.png";
import close from "../../assets/close.png";

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
            {viewCategory ? (
              <img
                src={close}
                alt="close"
                className="close-icon"
                onClick={onClick}
              />
            ) : (
              <img
                src={categoryMenu}
                alt="categoryMenu"
                className="categoryMenu-icon"
                onClick={onClick}
              />
            )}
            <div className="header-title" onClick={() => navigate("/main")}>
              <img src={logoSmail} alt="logoSmail" className="logoSmail-icon" />
              <p>야, 너도 갈래?</p>
            </div>
            <div className="header-icon">
              {is_login ? (
                <>
                  <img
                    src={write}
                    alt="write"
                    className="write-icon"
                    onClick={() => navigate("/write")}
                  />
                  <img
                    src={mypage}
                    alt="mypage"
                    className="mypage-icon"
                    onClick={() => navigate("/mypage")}
                  />
                </>
              ) : (
                <p className="login-icon">
                  <a href={"/"}>로그인</a>
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
