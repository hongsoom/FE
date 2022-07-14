import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/post";
import Header from "../components/common/Header";
import Sharing from "../components/common/Sharing";
import CategoryPost from "../components/category/CategoryPost";
import  "../css/category.css";

const Category = () => {

    const dispatch = useDispatch();

    const region = useParams().region;

    const [themeSelect, setThemeSelect] = useState([]);
    const [priceSelect, setPriceSelect] = useState("");
    const [theme, setTheme] = useState("");

    useEffect(() => {
      if(themeSelect.length > 0 ) {
          setTheme(themeSelect.toString())
          console.log(theme)
      }

      if (themeSelect.length === 0) {
          setTheme(themeSelect.toString())
          console.log(theme)
      }
  },[themeSelect])

  
    useEffect(() => {
      return () => {
        dispatch(userAction.clearDB());
    }
  },[region])
    
    return (
      <>
      <Header />
      <Sharing region={region} themeSelect={themeSelect} priceSelect={priceSelect} setThemeSelect={setThemeSelect} setPriceSelect={setPriceSelect} />
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