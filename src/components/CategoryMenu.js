import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/categoryMenu.css";
import leftArrow from "../assets/leftArrow.png";
import downArrow from "../assets/downArrow.png";

const CategoryMenu = ({ onClick }) => {

  const navigate = useNavigate();

  const area = ["서울", "경기", "인천", "강원도", "충청도", "전라도", "경상도", "대전", "세종", "대구", "울산", "광주", "부산", "제주도"];
  const theme = ["힐링", "먹방", "애견동반", "액티비티", "호캉스"];

  const [clickArea, setClickArea] = useState(false);
  const [clickTheme, setClickTheme] = useState(false);

  const areaCategory = () => {
    setClickArea(!clickArea); 
  };

  const themeCategory = () => {
    setClickTheme(!clickTheme); 
  };

  return (
    <div className="categorymenu-container">
      <div className="categorymenu-content">
        <div className="categorymenu-title">
          <img src={leftArrow} alt="previous-page" onClick={onClick}/>
          <p>어디로 떠나볼까요?</p>
        </div>
        <div className="categorymenu-area">
          <p>지역</p>
          <button onClick={areaCategory}><img src={downArrow} alt="downarrow"/></button>
        </div>
        <div className="area-list">
              {clickArea ?
                area.map((list) => 
                    <p>{list}</p>
                )  
            : null }
        </div>
        <div className="categorymenu-theme">
          <p>테마</p>
          <button onClick={themeCategory}><img src={downArrow} alt="downarrow"/></button>
        </div>
        <div className="theme-list">  
          {clickTheme ?
            theme.map((list) => 
              <p>{list}</p>
          )    
        : null }
        </div>
      </div>
    </div>
  )
}

export default CategoryMenu;