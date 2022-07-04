import React, { useState } from "react";
import  "../css/categorypost.css";
import profile from "../assets/profile.png";
import bookmark from "../assets/bookmark.png";
import heart from "../assets/heart.png";
import test from "../assets/test.jpg";
import test2 from "../assets/test2.jpg";

const CategoryPost = () => {

    return (
      <div className="categorypost-container">   
        <div className="categorypost-content">
            <div className="categorypost-title">
                <div className="categorypost-user">
                    <img src={profile} alt="profile" />
                    <p>제목을 입력해주세요</p>
                </div>    
                <div className="categorypost-click">
                    <img src={bookmark} alt="bookmark" />
                </div>
            </div>
            <div className="categorypost-image">
                <img src={test} alt="test" />
                <img src={test2} alt="test2" />
            </div>
            <div className="categorypost-category">
                <div className="categorypost-button">
                    <button>서울</button>
                    <button>먹방</button>
                </div>    
                <div className="categorypost-heart">
                    <img src={heart} alt="heart" />
                    <p>777</p>
                </div>
            </div>
        </div>
      </div>
  )
}

export default CategoryPost;