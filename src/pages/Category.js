import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/post";
import Header from "../components/common/Header";
import CategoryPost from "../components/category/CategoryPost";
import FilterModal from "../components/common/FilterModal";
import  "../css/category.css";
import filter from "../assets/filter.png";

const Category = (props) => {

    const dispatch = useDispatch();

    const region = useParams().region;

    const [themeSelect, setThemeSelect] = useState([]);
    const [priceSelect, setPriceSelect] = useState("");
    const [theme, setTheme] = useState("");

    console.log(themeSelect)
    console.log(priceSelect)

    const [modal, setModal] = useState(false);

    const onClick = () => {
      setModal(!modal); 
    };

    useEffect(() => {
      if(themeSelect.length > 0 ) {
          setTheme(themeSelect.toString())
          console.log(theme)
      }

      if (themeSelect.length === 0) {
          setTheme(themeSelect.toString())
          console.log(theme)
      }
      return () => {
        dispatch(userAction.clearDB());
    }
  },[themeSelect, region])
    
    return (
      <>
      {modal ? <FilterModal onClick={onClick} themeSelect={themeSelect} priceSelect={priceSelect} setThemeSelect={setThemeSelect} setPriceSelect={setPriceSelect} /> : null}
      <Header />
      <div className="category-click">
        <div className="category-button">
          <button>{region}</button>
          {themeSelect.map((list) => 
            <button>{list}</button>
          )} 
          {priceSelect ? <button>{priceSelect}</button> : null}
        </div>
        <div className="category-filter">
          <button onClick={onClick}><img src={filter} alt="filter"/></button>
        </div>
      </div> 
      <div className="category-container">   
        <div className="category-content">
          <div className="category-category">
            <CategoryPost region={region} theme={theme} price={priceSelect} />
          </div>
        </div>
      </div>
    </>
    )
}

export default Category;