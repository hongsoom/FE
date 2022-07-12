import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  "../../css/filterModal.css";

const FilterModal = ({onClick, region}) => {

    const navigate = useNavigate();

    const theme = ['힐링','먹방','애견동반','액티비티','호캉스']
    const price = ['10만원 이하', '10만원대', '20만원대','30만원대','40만원대','50만원 이상']

    const [colorchange, setColorChange] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);

    const colorChange = () => {
        setColorChange(!colorchange);
    }

    return (
    <div className="test">  
        <div className="filtermodal-container">
            <div className="filtermodal-content">
                <div className="filtermodal-theme">
                    <div className="filtermodal-themetitle">
                        <p>테마</p>
                    </div>
                    <div className="filtermodal-themebutton">
                        {theme.map((theme,i) => 
                            <button onClick={() => { navigate("/category/" + region + "/" + theme ); colorChange();}} className={colorchange ? "click-btn" : "noclick-btn"} key={i}>{theme}</button>
                        )}
                    </div>
                </div>
                <div className="filtermodal-price">
                    <div className="filtermodal-pricetitle">
                        <p>가격</p>
                    </div>
                    <div className="filtermodal-pricebutton">
                        {price.map((price,i) => 
                            <button onClick={() => { navigate("/category/" + region + "/" + price ); colorChange();}} className={colorchange ? "click-btn" : "noclick-btn"} key={i}>{price}</button>
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