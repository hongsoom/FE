import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Header from "../components/common/Header";
import KeywordPost from "../components/post/KeywordPost";
import FilterModal from "../components/common/FilterModal";
import  "../css/category.css";
import filter from "../assets/filter.png";

const Filter = (props) => {

    const keyword_ = useParams().keyword;
    const [keyword, setKeyword] = useState(keyword_)

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
  },[themeSelect])

    useEffect(() => {
        setKeyword(keyword_)

        if(keyword_ === undefined) {
        setKeyword("")
        }
    },[keyword_]) 
    
    return (
      <>
      {modal ? <FilterModal onClick={onClick} themeSelect={themeSelect} priceSelect={priceSelect} setThemeSelect={setThemeSelect} setPriceSelect={setPriceSelect} /> : null}
      <Header />
      <div className="category-click">
        <div className="category-button">
          <button>{keyword}</button>
        </div>
        <div className="category-filter">
          <button onClick={onClick}><img src={filter} alt="filter"/></button>
        </div>
      </div> 
      <div className="category-container">   
        <div className="category-content">
          <div className="category-category">
          {keyword !== undefined && keyword ?      
            <KeywordPost keyword={keyword}/> :
            null }
          </div>
        </div>
      </div>
    </>
    )
}

export default Filter;