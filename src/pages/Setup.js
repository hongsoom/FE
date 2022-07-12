import React from 'react';
import "../css/setup.css";

import {useNavigate} from 'react-router-dom'

import leftArrowBlack from "../assets/leftArrowBlack.png"
import noPic from "../assets/noPic.png"

const Setup = () => {
  const navigate = useNavigate();
  
  const onClickLeftArrow = () => {
    navigate('/mypage')
  }

  return(
    <>
      {/* 헤더 */}
      <div className="mypageHeader">
        <div className="mypageHeaderItemsWrap">
          <div className="leftArrowBlack"
            onClick={onClickLeftArrow}>
            <img src={leftArrowBlack} alt="leftArrow"/>
          </div>
          <div className="myPageTitle">환경설정</div>
        </div>
      </div>

      <div className="setupWrap">
        <div className='setupContents'>
          <div className='setupProfilePic'>
            <img src={noPic} alt="nonePic" className='noPic'/>
          </div>
          <div className='setupNickname'>
            <input type="text" placeholder='닉네임을 입력하세요'/>
          </div>

          <textarea className='setupIntroduce' placeholder='자기소개를 입력하세요'>
          </textarea>

          <button>저장</button>
        </div>
      </div>
    </>
  )
}

export default Setup