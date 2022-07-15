import React from "react";
import { useNavigate } from "react-router-dom";
import  "../../css/filterModal.css";

const FilterModal = (props) => {
    const navigate = useNavigate();

    const { onClick, region, themeSelect, priceSelect, setThemeSelect, setPriceSelect } = props;


    const is_region = region ? true : false;
    const theme = ['힐링','맛집','애견동반','액티비티','호캉스']
    const price = ['10만원 이하', '10만원대', '20만원대','30만원대','40만원대','50만원 이상']

    return (
        <>
        <div className="test">  
            <div className="filtermodal-container">
                <div className="filtermodal-content">
                    <div className="filtermodal-theme">
                        <div className="filtermodal-themetitle">
                            <p>테마</p>
                        </div>
                        <div className="filtermodal-themebutton">
                            {theme.map((theme, i) => {
                            return (
                                <div className="filtermodal-main-category-theme" key={i}>
                             {is_region ?                             
                                <button key={i} onClick={() => { !themeSelect.includes(theme) ? setThemeSelect((themeSelect) => [...themeSelect, theme]) 
                                : setThemeSelect(themeSelect.filter((button) => button !== theme)) }}
                                className={
                                    themeSelect.includes(theme)
                                    ? "table_btn_s"
                                    : "table_btn_ns"
                                }>{theme}</button> : <button key={i} onClick={() => navigate("/category/" + `${theme}`)}> {theme} </button> }   
                                </div>
                            )})}
                        </div>
                    </div>
                    <div className="filtermodal-price">
                        <div className="filtermodal-pricetitle">
                            <p>가격</p>
                        </div>
                        <div className="filtermodal-pricebutton">
                            {price.map((price, i) => {
                                return(
                                    <div className="filtermodal-main-category-price" key={i}>
                                    {is_region ?    
                                        <button key={i}  onClick={() => { !priceSelect.includes(price) ? setPriceSelect(price) 
                                        : setPriceSelect("") }}
                                        className={
                                            priceSelect.includes(price)
                                            ? "table_btn_s"
                                            : "table_btn_ns"
                                        }>{price}</button> : <button key={i} onClick={() => navigate("/category/" + `${price}`)}> {price} </button> }
                                     </div>
                                )})}
                        </div>
                    </div>
                    <div className="filtermodal-filterbutton">
                        <button onClick={onClick}>검색</button>
                    </div>
                </div>            
            </div>
        </div>  
    </>    
  )
}

export default FilterModal;