import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryMenu from "../category/CategoryMenu";
import "../../css/header.css";
import categoryMenu from "../../assets/categoryMenu.png"
import mypage from "../../assets/mypage.png"
import search from "../../assets/search.png";

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
                    <img src={categoryMenu} alt="categoryMenu" onClick={onClick}/>
                    <img src={mypage} alt="mypage" onClick={ () => navigate("/mypage") }/>
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