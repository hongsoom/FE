import React, { useState } from "react";
import Header from "../components/common/Header";
import MainPost from "../components/post/MainPost";
import CategoryPost from "../components/category/CategoryPost";
import FilterModal from "../components/common/FilterModal";
import  "../css/main.css";
import filter from "../assets/filter.png";

const Main = () => {
    const [modal, setModal] = useState(false);

    const onClick = () => {
      setModal(!modal); 
      };

    return (
      <>
      {modal ? <FilterModal onClick={onClick} /> : null}
      <Header />
      <div className="main-click">
        <div className="main-button">
          <button>#서울</button>
          <button>#호캉스</button>
          <button>#힐링</button>
        </div>
        <div className="main-filter">
         <button onClick={onClick}><img src={filter} alt="filter"/></button>
        </div>
      </div> 
      <div className="main-container">   
        <div className="main-content">
          <div className="main-recommend">
            <MainPost />
          </div>
          <div className="main-latest-love-container">
            <div className="main-latest-love-content">
              <p>다른 회원님의 경로를 확인해보세요</p>
              <button><img src={filter} alt="filter"/></button>
            </div>
            <div className="main-latest-love">
              <CategoryPost />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main;