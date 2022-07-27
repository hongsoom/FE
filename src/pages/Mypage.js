import React, { useEffect, useState } from "react";
import "../css/mypage.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// 모듈
import { getMypostDB, getMybookmarkDB } from "../redux/module/post";

// 컴포넌트
import MyPageHeader from "../components/mypage/MyPageHeader"
import MyPosts from "../components/mypage/MyPosts"

// 아이콘
import leftArrowBlack from "../assets/leftArrowBlack.png"
import setup from "../assets/setup.png"
import talkwhite from "../assets/talkwhite.png"
import heartwhite from "../assets/heartwhite.png"
import edit from "../assets/edit.png"

const Mypage = (props) => {
  const {myInfo} = props
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState("myPosts");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);
  const [direction, setDirection] = useState("desc");
  const [id, setId] = useState("id");

  // ----------------- 나의 정보 / 나의 게시글 가져오기
  useEffect(()=>{
    dispatch(getMypostDB(
      size, page, id, direction
    ))
    dispatch(getMybookmarkDB(
      size, page, id, direction
    ))
  },[dispatch])

  const myPosts = useSelector(state=>state.post.myposts)
  const myMarks = useSelector(state=>state.post.mybookmarks)
  console.log(myMarks)
  console.log(myPosts)

  // ---------------------------------------------------

  const onWriteHandler = () => {
    navigate('/write')
  }

  return (
    <div className="mypageWrap">

      {/* 헤더 */}
      <MyPageHeader leftArrowBlack={leftArrowBlack} setup={setup} navigate={navigate} myInfo={myInfo}/>

      <div className="mypageWraper">

        {/* 내가 쓴글 & 즐겨찾기한 글 */}
        <MyPosts myPosts={myPosts} toggle={toggle} setToggle={setToggle} talkwhite={talkwhite} heartwhite={heartwhite} myMarks={myMarks} navigate={navigate}/>

      </div>

      <div className="writeButtonWrap">
          <div className="writeButton" onClick={onWriteHandler}>
            <img src={edit} alt="글쓰기 버튼"/>
          </div>
        </div>

    </div>
  );
};

export default Mypage;