import React, { useEffect, useState } from "react";
import "../css/mypage.css";

import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";

import { userAction } from '../redux/module/user'
import { myInfoDB } from '../redux/module/user'

import leftArrowBlack from "../assets/leftArrowBlack.png"
import setup from "../assets/setup.png"


const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState('myPosts');

  useEffect(()=>{
    dispatch(userAction.myInfoDB())
  },[])


  const onClickLeftArrow = () => {
    navigate('/')
  }
  
  const onClickSetup = () => {
    navigate('/setup')
  }
  
  const isChecked = (e) =>{
    if(e.target.checked){
      setToggle(e.target.value)
    }
  }


    return (
      <>
      {/* 헤더 */}
      <div className="mypageHeader">
        <div className="mypageHeaderItemsWrap">
          <div className="leftArrowBlack"
            onClick={onClickLeftArrow}>
            <img src={leftArrowBlack} alt="leftArrow"/>
          </div>
          <div className="myPageTitle" onClick={()=>
            console.log('dd')}
            >마이페이지</div>
          <img src={setup} className="setup" alt="환경설정"
          onClick={onClickSetup}/>
        </div>
      </div>

      <div className="mypageWraper">
        {/* 프로필 */}
        <div className="myProfile">
          <div className="myProfilePic">
            <div className="myProfilePicCircle">

            </div>
          </div>

          <div className="myProfileTxt">
            <div className="myProfileTxtTitle">
              <div className="myProfileName">
                여행천재
              </div>
              <div className="myProfileLogout">
                로그아웃
              </div>
            </div>
            <div className="myProfileTxtDetail">
                여행계획 알차게 짜는 여행쟁이
            </div>
          </div>
        </div>

        {/* 게시글 */}
        <div className="myprofilePosts">
          <div className="myprofilePostsTitle">
            <div className="myPostsTitle"
            style={toggle === "myPosts" ? {borderBottom:'2px solid #8ACEFF', fontWeight:'600'}:{borderBottom:'2px solid transparent'}}
            >
              <input type="radio" name="myPost" value="myPosts" id="myPosts"
              onChange={isChecked}/>
              <label htmlFor="myPosts">
                내가 쓴 글
              </label>
            </div>
            <div className="myBookmarkTitle" 
            style={toggle === "myBookmark" ? {borderBottom:'2px solid #8ACEFF', fontWeight:'600'}:{borderBottom:'2px solid transparent'}}
            >
              <input type="radio" name="myPost" value="myBookmark" id="myBookmark"
              onChange={isChecked}/>
              <label htmlFor="myBookmark">
                즐겨찾기
              </label>
            </div>
          </div>

          <div className="myPosts">
            <div className="postboxs">
              <div className="postbox">

              </div>
              <div className="postbox">
                
              </div>
              <div className="postbox">
                
              </div>
              <div className="postbox">
                
              </div>
              <div className="postbox">

              </div>
              <div className="postbox">
                
              </div>
              <div className="postbox">
                
              </div>
              <div className="postbox">
                
              </div>
            </div>
          </div>
        </div>

      </div>
      </>
  )
}

export default Mypage;