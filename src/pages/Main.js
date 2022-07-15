import React, { useState } from "react";
import Header from "../components/common/Header";
import Sharing from "../components/common/Sharing";
import MainPost from "../components/post/MainPost";
import OptionPost from "../components/post/OptionPost";
import  "../css/main.css";
import downArrow from "../assets/downArrow.png";

const Main = () => {

  const recommendList = ["서울", "호캉스", "힐링"];

  const [filterClick, setFilterClick] = useState(false);
  const [loveCount, setLoveCount] = useState("loveCount");

  const onFilterClick = () => {
    setFilterClick(!filterClick); 
  };

  return (
      <>
      <Header />
      <Sharing recommendList={recommendList} />
        <div className="main-container">   
        <div className="main-content">
            <MainPost />
          <div className="main-latest-love-container">
            <div className="main-latest-love-content">
              <p>다른 회원님의 경로를 확인해보세요</p>
              <button onClick={onFilterClick}>
                {filterClick ? <p>최신순<img src={downArrow} alt="downArrow"/></p> : <p>인기순<img src={downArrow} alt="downArrow"/></p>}
                </button>
            </div>  
              {filterClick ? <OptionPost loveCount={loveCount}/> 
                : <OptionPost />}
          </div>
        </div>
      </div> 
    </>
  )
}

export default Main;