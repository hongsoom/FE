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
    const [keyword, setKeyword] = useState("");

    const onClick = () => {
        setViewCategory(!viewCategory); 
    };

    const handleClick = () => {
         if (keyword === "서울" || keyword ===  "경기" || keyword === "인천" || keyword === "강원도" || keyword === "충청도" || keyword === "전라도" || keyword === "경상도" || keyword === "대전" || keyword === "세종" || keyword === "대구" || keyword === "울산" || keyword === "광주" || keyword === "부산" || keyword === "제주도") {
            navigate("/category/" + keyword);   
        }  else {
            navigate("/" + keyword)
        }
    }

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
                    <input type="text" placeholder="지역이나 테마를 검색해보세요" onChange={(e) => { setKeyword(e.target.value)}}/>
                    <button onClick={handleClick}><img src={search} alt="search"/></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header;