import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryMenu from "../category/CategoryMenu";
import "../../css/header.css";
import categoryMenu from "../../assets/categoryMenu.png"
import mypage from "../../assets/mypage.png"
import search from "../../assets/search.png";
import logoSmail from "../../assets/logo-smail.png";
import topArrow from "../../assets/topArrow.png";

const Header = () => {
    const navigate = useNavigate();

    const [viewCategory, setViewCategory] = useState(false);

    const onClick = () => {
        setViewCategory(!viewCategory); 
      };

    return (
        <>
        { viewCategory ? <CategoryMenu onClick={onClick} /> : null }
        <div className="header-container">
            <div className="header-content">
                <div className="header-image">
                    { viewCategory ? <img src={topArrow} alt="topArrow" className="topArrow-icon" onClick={onClick}/> 
                     : <img src={categoryMenu} alt="categoryMenu" className="categoryMenu-icon" onClick={onClick}/> }
                    <div className="header-title">
                        <img src={logoSmail} alt="logoSmail" className="logoSmail-icon"/>
                        <p>야너갈</p>
                    </div>
                    <img src={mypage} alt="mypage" className="mypage-icon" onClick={ () => navigate("/mypage") }/>
                </div>
                <div className="header-search">
                    <input type="text" />
                    <button><img src={search} alt="search"/></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header;