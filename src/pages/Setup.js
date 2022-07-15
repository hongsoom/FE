import React, { useEffect, useState } from 'react';
import "../css/setup.css";

import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userAction } from '../redux/module/user'


import leftArrowBlack from "../assets/leftArrowBlack.png"

const Setup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ----------------- 나의 정보 가져오기
  useEffect(()=>{
    dispatch(userAction.myInfoDB())
  },[dispatch])

  const myInfo = useSelector(state=>state.user.myinfo)
  console.log(myInfo)
  // ---------------------------------------------------

  const [userImg, setUserImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [introduce, setIntroduce] = useState();
  const [myNickname, setMynickname] = useState();

  // ----------------- 마이페이지로 돌아가기 버튼
  const onClickLeftArrow = () => {
    navigate('/mypage')
  }

  // 첨부 프로필 이미지 '파일은 setUserImgUrl에, blob url은 setPreviewUrl에'
  const loadProfilImg = (e) => {
    const file = e.target.files[0]
    setUserImg(file)
    const Url = URL.createObjectURL(file)
    setPreviewUrl(Url)
  }

  

  // 서버에 저장할 내용 폼데이터로 만들기
  const formData = new FormData();
  formData.append("nickname", myNickname)
  formData.append("userImgUrl", userImg)
  formData.append("userInfo", introduce)
  
  // ----------------- 서버로 저장 버튼
  const onSaveHandler = () => {
    dispatch(userAction.editInfoDB(
      formData
    ))
  }

 for (let key of formData.keys()) {
    console.log(key, ":", formData.get(key));
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
        <label htmlFor='uploadProfileImg'>
          <div className='setupProfilePic'
          style={previewUrl ? {backgroundImage:`url(${previewUrl})`, backgroundSize:'cover', backgroundPosition:'center'}: {background:'#F5F9FF'}}
          >
          </div>    
          </label>
          <input type="file" id='uploadProfileImg' name="uploadProfileImg" accept="image/*" 
          onChange={(e)=>{loadProfilImg(e)}}
          style={{display:'none'}}
          />
          
          <div className='setupNickname'>
            <input type="text" placeholder='닉네임을 입력하세요' defaultValue={myInfo&&myInfo.nickname}
            onChange={(e)=>{
              setMynickname(e.target.value)
            }}
            />
          </div>

          <textarea className='setupIntroduce' placeholder='자기소개를 입력하세요'
          onChange={(e)=>{
            setIntroduce(e.target.value)
          }}
          >
          </textarea>

          <button className='setUpbutton' onClick={onSaveHandler}>저장</button>
        </div>
      </div>
    </>
  )
}

export default Setup