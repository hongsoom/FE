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
  const [tochedY, setTochedY] = useState(0);
  console.log(tochedX)
  
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
    <div className="categoryslide-imagecontainer">
      <div className="categoryslide-imagecontent" 
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
          ref={slideRef}>
        {image.map((list, i) => 
            <img src={list} alt="image" key={i} />
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