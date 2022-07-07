import React from "react";
import CategorySlide from "../category/CategorySlide";
import  "../../css/mainPost.css";
import profile from "../../assets/profile.png";
import bookmark from "../../assets/bookmark.png";
import heart from "../../assets/heart.png";
import test from "../../assets/test.jpg";
import test2 from "../../assets/test2.jpg";
import test3 from "../../assets/test3.jpg";
import test4 from "../../assets/test4.jpg";
import test5 from "../../assets/test5.jpg";
import test7 from "../../assets/test7.png";


const MainPost = () => {
    
    const image = [test, test2, test3, test4, test5, test7];

    return (
      <div className="mainpost-container">   
        <div className="mainpost-content">
            <div className="mainpost-title">
                <div className="mainpost-user">
                    <img src={profile} alt="profile" />
                    <p>제목을 입력해주세요</p>
                </div>    
                <div className="mainpost-click">
                    <img src={bookmark} alt="bookmark" />
                </div>
            </div>
            <CategorySlide image={image} />
            <div className="mainpost-category">
                <div className="mainpost-button">
                    <button>서울</button>
                    <button>먹방</button>
                </div>    
                <div className="mainpost-heart">
                    <img src={heart} alt="heart" />
                    <p>777</p>
                </div>
            </div>
        </div>
      </div>
    )
}

export default MainPost;