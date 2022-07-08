import React, { useState, useRef } from "react";
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

    const [tochedX, setTochedX] = useState(0);
    const [tochedY, setTochedY] = useState(0);
    
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideRef = useRef(null);
  
    const TOTAL_SLIDES = image.length -1;
  
    const NextSlide = () => {
      if (currentSlide >= TOTAL_SLIDES) {
        setCurrentSlide(0); 
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    };
  
    const PrevSlide = () => {
      if (currentSlide === 0) {
        setCurrentSlide(TOTAL_SLIDES);
      } else {
        setCurrentSlide(currentSlide - 1);
      }
    };
    
    const touchStart = (e) => {
      setTochedX(e.changedTouches[0].pageX);
      setTochedY(e.changedTouches[0].pageY);
    } 
  
    const touchEnd = (e) => {
      const distanceX = tochedX - e.changedTouches[0].pageX;
      const distanceY = tochedY - e.changedTouches[0].pageY;
      const vector = Math.abs(distanceX / distanceY);
      console.log(distanceX)
  
      if (distanceX > 10 && vector > 2) {
        NextSlide();
      } 
      if (tochedX < -20 && vector > 2) {
        PrevSlide();
      }
      setTochedX(0);
      setTochedY(0);
    } 

    return (
      <div className="mainpost-container"
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
            ref={slideRef}>   
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