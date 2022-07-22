import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/module/post";
import "../../css/filterMenu.css";

const FilterMenu = ({ onClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const area = [
    "서울",
    "경기",
    "인천",
    "강원도",
    "충청도",
    "전라도",
    "경상도",
    "대전",
    "세종",
    "대구",
    "울산",
    "광주",
    "부산",
    "제주도",
  ];

  useEffect(() => {
    dispatch(userAction.initPagingDB());
  }, []);

  return (
    <div className="categorymenu-container">
      <div className="categorymenu-content">
        <div className="categorymenu-title">
          <p>어디로 떠나볼까요?</p>
        </div>
        <div className="area-list">
          {area.map((region, i) => (
            <p
              onClick={() => {
                navigate("/filter/" + region);
                onClick();
                dispatch(userAction.initPagingDB());
              }}
              key={i}
            >
              {region}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
