import React, { useState } from 'react';
import "../css/setup.scss";

import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userAction } from '../redux/module/user'

// 아이콘
import leftArrowBlack from "../assets/leftArrowBlack.png"

const Setup = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {myInfo} = props
  console.log(myInfo)
  const [userImg, setUserImg] = useState(myInfo&&myInfo.userImgUrl? myInfo.userImgUrl : null);
  const [previewUrl, setPreviewUrl] = useState(myInfo&&myInfo.userImgUrl? myInfo.userImgUrl : null);
  const [introduce, setIntroduce] = useState(myInfo&&myInfo.userInfo? myInfo.userInfo : '');
  const [myNickname, setMynickname] = useState(myInfo&&myInfo.nickname ? myInfo.nickname : '');
  const [nickNameNotice, setNickNameNotice] = useState();

  // 첨부 프로필 이미지 '파일은 setUserImg에, blob url은 setPreviewUrl에 담음'
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

  // ----------------- 마이페이지로 돌아가기 버튼
  const onClickLeftArrow = () => {
  navigate('/mypage')
  }

  //  for (let key of formData.keys()) {
  //    console.log(key, ":", formData.get(key));
  //  }

  
  // ----------------- 서버로 저장 버튼
  const onSaveHandler = () => {
    if(myNickname.length < 2 || myNickname.length > 8){
      setNickNameNotice("닉네임은 2자리 이상, 8자리 미만입니다")
    } else{
      dispatch(userAction.editInfoDB(
        formData
      ))
    }
  }



  return(
    <div className="setupWrap">
      {/* 헤더 */}
      <div className="setupHeader">
        <div className="leftArrowBlack"
          onClick={onClickLeftArrow}>
          <img src={leftArrowBlack} alt="leftArrow"/>
        </div>
      </div>

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
          <p>{nickNameNotice}</p>
        </div>

        <textarea className='setupIntroduce' placeholder='자기소개를 입력하세요' defaultValue={myInfo&&myInfo.userInfo}
        onChange={(e)=>{
          setIntroduce(e.target.value)
        }}
        >
        </textarea>

        <button className='setUpbutton' onClick={onSaveHandler}>저장</button>
      </div>
    </div>
  )
}

export default Setup