import React, { useState } from "react";
import Header from "../components/Header";
import  "../css/main.css";
import CategoryPost from "../components/CategoryPost";

const Main = () => {

    return (
      <>
      <Header />  
      <div className="main-container">   
        <div className="header-category">
          <button>서울</button>
          <button>힐링</button>
          <button>대구</button>
        </div> 
        <div className="main-content">
          <div className="main-recommend">
              <CategoryPost />
          </div>
          <div className="main-category">
              
          </div>
        </div>
      </div>
    </>
  )
}

export default Main;