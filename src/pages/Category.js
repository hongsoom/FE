import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/post";
import Header from "../components/common/Header";
import Sharing from "../components/common/Sharing";
import KeywordPost from "../components/post/KeywordPost";
import CategoryPost from "../components/category/CategoryPost";
import  "../css/category.css";

const Category = () => {

    const dispatch = useDispatch();

    const keyword = useParams().keyword;
    
    const [themeSelect, setThemeSelect] = useState([]);
    const [priceSelect, setPriceSelect] = useState("");
    const [list, setList] = useState(keyword);
    const [region, setRegion] = useState("")
    const [theme, setTheme] = useState("");
    
    const is_list = list ? true : false;

    useEffect(() => {
      if(themeSelect.length > 0 ) {
          setTheme(themeSelect.toString());
      }

      if (themeSelect.length === 0) {
          setTheme("");
      }
    },[themeSelect])
  
    useEffect(() => {
      if (keyword === "서울" || keyword ===  "경기" || keyword === "인천" || keyword === "강원도" || keyword === "충청도" || keyword === "전라도" || keyword === "경상도" || keyword === "대전" || keyword === "세종" || keyword === "대구" || keyword === "울산" || keyword === "광주" || keyword === "부산" || keyword === "제주도") {
        setRegion(keyword);   
      }
      setList(keyword);
      
      return () => {
        dispatch(userAction.clearDB());
      }
    },[keyword])
    
    return (
      <>
      <Header />
      <Sharing list={list} region={region} themeSelect={themeSelect} priceSelect={priceSelect} setThemeSelect={setThemeSelect} setPriceSelect={setPriceSelect} />
      <div className="category-container">   
        <div className="category-content">
          <div className="category-category">
            {is_list ? <KeywordPost keyword={list} /> : <CategoryPost region={region} theme={theme} price={priceSelect} />}
          </div>
        </div>
      </div>
    </>
    )
}

export default Category;