import React, { useState, useRef, useEffect } from "react";
import  "../../css/categorySlide.css";
import leftArrow from "../../assets/leftArrow.png"
import rightArrow from "../../assets/rightArrow.png"

const CategorySlide = ({image}) => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const scrollRef = useRef(null);
  const slideRef = useRef(null);
  const clickRef = useRef(null);

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

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
  
      scrollRef.current.scrollLeft = startX - e.pageX;
  
      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);

  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  const onMouseDown = (e) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };

  const onMouseUp = (e) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };

  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
      if (mouseUpClientX < mouseDownClientX) {
        NextSlide();
      } else if (mouseUpClientX > mouseDownClientX) {
        PrevSlide();
      }
    }
  }, [mouseUpClientX]);

  return (
    <div className="categoryslide-imagecontainer" 
    onMouseDown={onMouseDown}
    onMouseMove={isDrag ? onThrottleDragMove : null}
    onMouseUp={onMouseUp}
    onMouseLeave={onDragEnd}
    ref={scrollRef}>
      <div className="categoryslide-imagecontent" ref={slideRef}>
        {image.map((list) => 
            <img src={list} alt="image" />
        )}
      </div>
      <div className="categoryslide-button" ref={clickRef}>
        <button onClick={PrevSlide} className="Prev"><img src={leftArrow} alt="Prev" /></button>
        <button onClick={NextSlide} className="Next"><img src={rightArrow} alt="Next" /></button>
      </div>
   </div>
  )
}

export default CategorySlide;