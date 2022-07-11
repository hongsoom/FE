import React, { useState, useRef, useEffect } from "react";
import  "../../css/categorySlide.css";
import leftArrow from "../../assets/leftArrow.png"
import rightArrow from "../../assets/rightArrow.png"

const CategorySlide = ({image}) => {

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

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const [tochedX, setTochedX] = useState(0);

  let curPos = 0;
  let postion = 0;
  const IMAGE_WIDTH = 375;

  function prev(){
    if(curPos > 0){
      postion += IMAGE_WIDTH;
      slideRef.style.transform = `translateX(${postion}px)`;
      curPos = curPos - 1;
    }
  }
  function next(){
    if(curPos < 3){
      postion -= IMAGE_WIDTH;
      slideRef.style.transform = `translateX(${postion}px)`;
      curPos = curPos + 1;
    }
  }

  const touchStart = (e) => {
    setTochedX(e.touches[0].pageX);
  } 

  const touchEnd = (e) => {
    const distanceX = e.changedTouches[0].pageX;

    if (tochedX > distanceX) {
      next();
    } 
    else {
      prev();
    }
  } 

  return (
    <div className="categoryslide-imagecontainer">
      <div className="categoryslide-imagecontent" 
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
          ref={slideRef}>
        {image.map((list) => 
            <img src={list} alt="image" />
        )}
      </div>
      <div className="categoryslide-button">
        <button onClick={PrevSlide} className="Prev"><img src={leftArrow} alt="Prev" /></button>
        <button onClick={NextSlide} className="Next"><img src={rightArrow} alt="Next" /></button>
      </div>
   </div>
  )
}

export default CategorySlide;