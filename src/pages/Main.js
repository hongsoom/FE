import React, { useState } from "react";
import Header from "../components/common/Header";
import MainPost from "../components/post/MainPost";
import OptionPost from "../components/category/OptionPost";
import FilterModal from "../components/common/FilterModal";
import  "../css/main.css";
import filter from "../assets/filter.png";
import downArrow from "../assets/downArrow.png";

const Main = () => {

    const recommendList = ["서울", "호캉스", "힐링"];

    const [modal, setModal] = useState(false);
    const [filterClick, setFilterClick] = useState(false);

    const onClick = () => {
      setModal(!modal); 
    };

    const onFilterClick = () => {
      setFilterClick(!filterClick); 
    };

    return (
      <>
      {modal ? <FilterModal onClick={onClick} /> : null}
      <Header />
      <div className="main-click">
        <div className="main-button">
          {recommendList.map((list) =>
              <button>#{list}</button>
          )}
        </div>
        <div className="main-filter">
         <button onClick={onClick}><img src={filter} alt="filter"/></button>
        </div>
      </div> 
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