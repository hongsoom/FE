import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/categoryMenu.css";

const CategoryMenu = ({ onClick }) => {

  const navigate = useNavigate();

  const area = ["서울", "경기", "인천", "강원도", "충청도", "전라도", "경상도", "대전", "세종", "대구", "울산", "광주", "부산", "제주도"];

  return (
    <div className="categorymenu-container">
      <div className="categorymenu-content">
        <div className="categorymenu-title">
            <p>어디로 떠나볼까요?</p>
        </div>
        <div className="area-list">
                {area.map((list,i) => 
                    <p onClick={() => {navigate("/category/" + list); onClick();}} key={i}>{list}</p>
                )}  
        </div>
      </div>
    </div>
  )
}

export default CategoryMenu;