import React, { useState } from "react";
import Header from "../components/common/Header";
import  "../css/category.css";
import CategoryPost from "../components/category/CategoryPost";

const Category = () => {

    return (
      <>
      <Header />
      <div className="category-button">
        <button>서울</button>
        <button>힐링</button>
        <button>대구</button>
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