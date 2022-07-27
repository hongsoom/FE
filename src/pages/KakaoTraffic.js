import React, { useState } from "react";
import '../css/kakaoTraffic.scss'
import { useParams, useLocation, useNavigate } from "react-router-dom";

import leftArrowBlack from "../assets/leftArrowBlack.png"
import radiobutton from "../assets/radiobutton.png"
import radioselected from "../assets/radioselected.png"
import swal from 'sweetalert';

const KakaoTraffic = () =>{
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data
  const param = useParams().id;
  console.log(param)
  console.log(data)

  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureY, setDepartureY] = useState('');
  const [departureX, setDepartureX] = useState('');
  const [arrivalY, setArrivalY] = useState('');
  const [arrivalX, setArrivalX] = useState('');

  const onClickLeftArrow = () =>{
    navigate(`/detail/${param}`);
  }

  const onSearchMapHandler = () => {
    if(departure === arrival){
      swal("출발지와 도착지를 확인해주세요!");
    } else if(departure.length === 0){
      swal("출발지를 선택해주세요");
    } else if(departure.length === 0){
      swal("도착지를 선택해주세요");
    } else if (departure&&arrival&&departure !== arrival){
      window.open(`kakaomap://route?sp=${departureY},${departureX}&ep=${arrivalY},${arrivalX}&by=CAR`)
    }
  }

  return(
    <div className="kakaoTraffic">
        <div className="trafficHeader">
          <div className="preIcon" onClick={onClickLeftArrow}>
            <img src={leftArrowBlack} alt="홈으로 이동" />
          </div>
          <div className="title">장소 길찾기</div>
        </div>

        <div className="kakaoContentWrap">
          <div className="departure">
            <div className="departureTitle">
            📍출발지 선택
            </div>  
            <div className="departureListBox">
              <div className="departureList">
                {data&&data.place.map((v,i)=>{
                  return(
                    <div className="departureItem">
                      <label htmlFor={`depart${v.place_name}`}>
                        {departure === v.place_name?
                          <img src={radioselected} alt="선택된 버튼"/>  
                          :
                          <img src={radiobutton} alt="선택버튼"/>
                        }
                        <div key={i}>{v.place_name}</div>
                      </label>
                      <input type="radio" name= "departure" id={`depart${v.place_name}`} value={v.place_name}
                      onChange={(e)=>{
                        if(e.target.checked){
                          setDeparture(e.target.value)
                          setDepartureY(v.y)
                          setDepartureX(v.x)
                        }
                      }}
                      />
                    </div>
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
                {data&&data.place.map((v,i)=>{
                  return(
                    <div className="arrivalItem">
                      <label htmlFor={`arrival${v.place_name}`}>
                        {arrival === v.place_name?
                          <img src={radioselected} alt="선택된 버튼"/>  
                          :
                          <img src={radiobutton} alt="선택버튼"/>
                        }
                        <div key={i}>{v.place_name}</div>
                      </label>
                      <input type="radio" name= "arrival" id={`arrival${v.place_name}`} value={v.place_name}
                      onChange={(e)=>{
                        if(e.target.checked){
                          setArrival(e.target.value)
                          setArrivalY(v.y)
                          setArrivalX(v.x)
                        }
                      }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="searchButton"
          onClick={onSearchMapHandler}
          >
            <div className="searchButtonWrap">
              길 찾기 실행하기
            </div>
          </div>
        </div>
      
    </div>
  )
}
export default KakaoTraffic