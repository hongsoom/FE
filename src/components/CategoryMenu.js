import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/categoryMenu.css";
import leftArrow from "../assets/leftArrow.png";

const CategoryMenu = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <div className="categorymenu-container">
      <div className="categorymenu-content">
        <div className="categorymenu-title">
          <img src={leftArrow} alt="previous-page" onClick={onClick}/>
          <p>어디로 떠나볼까요?</p>
        </div>
        <div className="categorymenu-area">
          <ul>지역
            <li>서울</li>
            <li>경기</li>
            <li>인천</li>
            <li>강원도</li>
            <li>충청도</li>
            <li>전라도</li>
            <li>경상도</li>
            <li>대전</li>
            <li>세종</li>
            <li>대구</li>
            <li>울산</li>
            <li>광주</li>
            <li>부산</li>
            <li>제주도</li>
          </ul>
        </div>
        <div className="categorymenu-theme">

        </div>
      </div>
    </div>
  )
}

export default CategoryMenu;