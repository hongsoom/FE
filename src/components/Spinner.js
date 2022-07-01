import React from "react";
import spinner from "../assets/Spinner.gif";
import "../css/spinner.css";

const Spinner = () => {
  
    return (
        <div className="Spinner-container">    
            <div className="Spinner-text">잠시만 기다려 주세요</div>
            <img src={spinner} alt="로딩중" width="5%" />
        </div>
    );
  };

export default Spinner;