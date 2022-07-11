import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../components/common/Header";
import CategoryPost from "../components/category/CategoryPost";
import FilterModal from "../components/common/FilterModal";
import  "../css/category.css";
import filter from "../assets/filter.png";

const Category = () => {

  const list = useParams().list;

  const [modal, setModal] = useState(false);

  const onClick = () => {
    setModal(!modal); 
    };
  
  return (
    <>
    {modal ? <FilterModal onClick={onClick} list={list} /> : null}
    <Header />
    <div className="category-click">
      <div className="category-button">
        <button>{list}</button>
      </div>
      <div className="category-filter">
        <button><img src={filter} alt="filter"/></button>
      </div>
    </div> 
    <div className="category-container">   
      <div className="category-content">
        <div className="category-category">
          <CategoryPost />
        </div>
      </div>
    </div>
  </>
  )
}

export default Category;