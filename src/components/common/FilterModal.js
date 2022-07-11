import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  "../../css/filterModal.css";

const FilterModal = ({onClick, list}) => {

    const navigate = useNavigate();

    console.log(list)

    const theme = ['힐링','먹방','애견동반','액티비티','호캉스']
    const price = ['10만원 이하', '10만원대', '20만원대','30만원대','40만원대','50만원 이상']

    return (
    <div className="test">  
        <div className="filtermodal-container">
            <div className="filtermodal-content">
                <div className="filtermodal-theme">
                    <div className="filtermodal-themetitle">
                        <p>테마</p>
                    </div>
                    <div className="filtermodal-themebutton">
                        {theme.map((value) => 
                            <button >{value}</button>
                        )}
                    </div>
                </div>
                <div className="filtermodal-price">
                    <div className="filtermodal-pricetitle">
                        <p>가격</p>
                    </div>
                    <div className="filtermodal-pricebutton">
                        {price.map((value) => 
                            <button>{value}</button>
                        )}
                    </div>
                </div>
                <div className="filtermodal-filterbutton">
                    <button onClick={onClick}>검색</button>
                </div>
            </div>
        </div>
    </div>      
  )
}

export default FilterModal;