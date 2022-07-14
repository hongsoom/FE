import React, { useState } from "react";
import Header from "../components/common/Header";
import Sharing from "../components/common/Sharing";
import MainPost from "../components/post/MainPost";
import OptionPost from "../components/category/OptionPost";
import  "../css/main.css";
import downArrow from "../assets/downArrow.png";

const Main = () => {

  const recommendList = ["서울", "호캉스", "힐링"];

  const [filterClick, setFilterClick] = useState(false);

  const onFilterClick = () => {
    setFilterClick(!filterClick); 
  };

  return (
      <>
      <Header />
      <Sharing recommendList={recommendList} />
        <div className="main-container">   
        <div className="main-content">
          <div className="main-recommend">
            <MainPost />
          </div>
          <div className="main-latest-love-container">
            <div className="main-latest-love-content">
              <p>다른 회원님의 경로를 확인해보세요</p>
              <button onClick={onFilterClick}>
                {filterClick ? <p>최신순<img src={downArrow} alt="downArrow"/></p> : <p>인기순<img src={downArrow} alt="downArrow"/></p>}
                </button>
            </div>  
              <div className="main-latest-love">
                <OptionPost />
              </div> 
          </div>
        </div>
      </div> 
    </>
  )
}

export default Main;