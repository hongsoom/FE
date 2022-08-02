import React from "react";
import "../../css/post.scss";

import { useNavigate } from "react-router-dom";
import SearchPlace from "../post/SearchPlace";
import ModalButtons from "../modal/ModalButtons";

import search from "../../assets/search.png";
import leftArrowBlack from "../../assets/leftArrowBlack.png";

const PostHeader = (props) => {
  const {myInfo, setInputText, inputText, Places, handleSubmit, onClickHandler, setSelect, select, setImgUrl, list, setFocus, myMap, setPrice, setRegion, setTheme, selectedRegion, selectedTheme, selectedPrice, openPlaceModal, closePlaceModal, setShowPlaceModal, showPlaceModal, param, setAllImgUrl} = props
  const navigate = useNavigate();

  const region = ["서울", "대전", "경기", "세종", "인천", "대구", "강원도", "울산", "충청도", "광주", "전라도", "부산", "경상도", "제주도"];   
  const theme = ["힐링", "맛집", "애견동반", "액티비티", "호캉스"];
  const price = ["10만원 이하", "10만원대", "20만원대", "30만원대", "40만원대", "50만원 이상"];

  const onClickLeftArrow = () => {
    navigate("/");
  };

  // 검색 창
  const onChange = (e) => {
    setInputText(e.target.value);
  };
  
  return(
    <div className="writeHeader">
      <div className="writeHeaderWrap">
        <div className="writeUpperHeader">
          <div className="writePreIcon" onClick={onClickLeftArrow}>
            <img src={leftArrowBlack} alt="홈으로 이동" />
          </div>
          <SearchPlace
            search={search}
            Places={Places}
            onChange={onChange}
            handleSubmit={handleSubmit}
            inputText={inputText}
            onClickHandler={onClickHandler}
            setSelect={setSelect}
            select={select}
            setImgUrl={setImgUrl}
            list={list}
            setFocus={setFocus}
            param={param}
            setAllImgUrl={setAllImgUrl}
          />
        </div>

        <div className="writeLowerHeader">
          <ModalButtons
            region={region}
            theme={theme}
            price={price}
            setRegion={setRegion}
            setTheme={setTheme}
            setPrice={setPrice}
            selectedRegion={selectedRegion}
            selectedTheme={selectedTheme}
            selectedPrice={selectedPrice}
            openPlaceModal={openPlaceModal}
            closePlaceModal={closePlaceModal}
            setShowPlaceModal={setShowPlaceModal}
            showPlaceModal={showPlaceModal}
            myInfo={myInfo}
            select={select}
            setSelect={setSelect}
            setFocus={setFocus}
            myMap={myMap}
            list={list}
          />
        </div>
      </div>
    </div>

  )
}
export default PostHeader