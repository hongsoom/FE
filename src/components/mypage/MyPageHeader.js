import React from "react";
import "../../css/mypage.scss";

const MyPageHeader = (props) => {
  const {leftArrowBlack, setup, navigate} = props

  const onClickLeftArrow = () => {
    navigate("/");
  };

  const onClickSetup = () => {
    navigate('/setup')
  }

  return(
    <div className="mypageHeader">
      <div className="mypageHeaderItemsWrap">
        <div className="leftArrowBlack" onClick={onClickLeftArrow}>
          <img src={leftArrowBlack} alt="leftArrow" />
        </div>
        <div className="myPageTitle">
          마이페이지
        </div>
        <img
          src={setup}
          className="setup"
          alt="환경설정"
          onClick={onClickSetup}
        />
      </div>
    </div>
  )
}
export default MyPageHeader