import React, {useState} from "react";
import '../css/kakaoTraffic.scss'
import { useParams, useLocation, useNavigate } from "react-router-dom";

import leftArrowBlack from "../assets/leftArrowBlack.png"

const KakaoTraffic = () =>{
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data
  const param = useParams().id;
  console.log(param)
  console.log(data)

  const onClickLeftArrow = () =>{
    navigate(`/detail/${param}`);
  }

  return(
    <div className="trafficWrap">
      <div className="trafficHeader">
        <div className="preIcon" onClick={onClickLeftArrow}>
          <img src={leftArrowBlack} alt="홈으로 이동" />
        </div>
        <div className="title">장소 길찾기</div>
      </div>

      <div className="contentWrap">
        <div className="departure">
          <div className="departureTitle">
          📍출발지 선택
          </div>  
          <div className="departureListBox">
            <div className="departureList">
              {data&&data.place((v,i)=>{
                return(
                  <div>{v.place_name}</div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="arrival">
          <div className="arrivalTitle">
          📍도착지 선택
          </div> 
          <div className="arrivalListBox">
            <div className="arrivalList">
              {data&&data.place((v,i)=>{
                return(
                  <div>{v.place_name}</div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default KakaoTraffic