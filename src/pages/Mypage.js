import React, { useEffect, useState } from "react";
import "../css/mypage.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userAction } from "../redux/module/user";
import { getMypostDB, getMybookmarkDB } from "../redux/module/post";

import leftArrowBlack from "../assets/leftArrowBlack.png"
import setup from "../assets/setup.png"
import talkwhite from "../assets/talkwhite.png"
import heartwhite from "../assets/heartwhite.png"
import edit from "../assets/edit.png"

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState("myPosts");

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);
  const [direction, setDirection] = useState("desc");
  const [id, setId] = useState("id");

  const [tabState, setTabState] = useState(true);

  // ----------------- 나의 정보 / 나의 게시글 가져오기
  useEffect(()=>{
    dispatch(userAction.myInfoDB())
    
  },[dispatch])

  
  useEffect(()=>{
    dispatch(getMypostDB(
      size, page, id, direction
    ))
    dispatch(getMybookmarkDB(
      size, page, id, direction
    ))
  },[])

 
  const myInfo = useSelector(state=>state.user.myinfo)
  const myPosts = useSelector(state=>state.post.myposts)
  const myMarks = useSelector(state=>state.post.mybookmarks)
  console.log(myPosts)
  console.log(myMarks)

  // ---------------------------------------------------

  const onClickLeftArrow = () => {
    navigate("/");
  };

  const onClickSetup = () => {
    navigate('/setup')
  }
  
  const isChecked = (e) =>{
    if(e.target.checked){
      setToggle(e.target.value)
    }
  }
  
  const onClickToPost = (postId) =>{
    navigate(`/detail/${postId}`)
  }

  const onWriteHandler = () => {
    navigate('/write')
  }

  return (
    <div className="mypageWrap">
      {/* 헤더 */}
      <div className="mypageHeader">
        <div className="mypageHeaderItemsWrap">
          <div className="leftArrowBlack" onClick={onClickLeftArrow}>
            <img src={leftArrowBlack} alt="leftArrow" />
          </div>
          <div className="myPageTitle" onClick={() => console.log("dd")}>
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

      <div className="mypageWraper">
        {/* 프로필 */}
        <div className="myProfile">
          <div className="myProfilePic">
            <div className="myProfilePicCircle">
              <img src={myInfo && myInfo.userImgUrl} alt="프로필 이미지" />
            </div>
          </div>

          <div className="myProfileTxt">
            <div className="myProfileTxtTitle">
              <div className="myProfileName">{myInfo && myInfo.nickname}</div>
              <div className="myProfileLogout">로그아웃</div>
            </div>
            <div className="myProfileTxtDetail">
              {myInfo && myInfo.userInfo}
            </div>
          </div>
        </div>

        {/* 게시글 */}
        <div className="myprofilePosts">
          <div className="myprofilePostsTitle">
            <div
              className="myPostsTitle"
              style={
                toggle === "myPosts"
                  ? { borderBottom: "2px solid #8ACEFF", fontWeight: "600" }
                  : { borderBottom: "2px solid transparent" }
              }
              >
              <input
                type="radio"
                name="myPost"
                value="myPosts"
                id="myPosts"
                onChange={isChecked}
              />
              <label htmlFor="myPosts">내가 쓴 글</label>
            </div>
            
            <div
              className="myBookmarkTitle"
              style={
                toggle === "myBookmark"
                  ? { borderBottom: "2px solid #8ACEFF", fontWeight: "600" }
                  : { borderBottom: "2px solid transparent" }
              }
              >
              <input
                type="radio"
                name="myPost"
                value="myBookmark"
                id="myBookmark"
                onChange={isChecked}
              />
              <label htmlFor="myBookmark">즐겨찾기</label>
            </div>
          </div>
          


          <div className="postsNmarks">
            {toggle === "myPosts" ? (
              <div className="myPosts">
                <div className="postboxs">
                  {myPosts &&
                    myPosts.myposts.map((v, i) => {
                      return (
                        <div
                          className="postbox"
                          key={i}
                          style={{
                            backgroundImage: `url(${v.imgUrl})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="txtArea">
                            <div className="postBoxTitle">{v.title}</div>
                            <div className="myPostDetail">
                              <div className="myPostTag">
                                <div>#{v.regionCategory}</div>
                                {v.themeCategory.map((v, i) => {
                                  return <div key={i}>#{v.themeCategory}</div>;
                                })}
                              </div>
                              <div className="myPostIcons">
                                <img src={talkwhite} alt="댓글 갯수" />
                                {v.commentCount}
                                <img src={heartwhite} alt="댓글 갯수" />
                                {v.loveCount}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className="myBookmarks" id="myBookmarks">
                <div className="postboxs">
                  {myMarks &&
                    myMarks.mybookmarks.content.map((v, i) => {
                      return (
                        <div
                          className="postbox"
                          key={i}
                          style={{
                            backgroundImage: `url(${v.imgUrl})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="txtArea">
                            <div className="postBoxTitle">{v.title}</div>
                            <div className="myPostDetail">
                              <div className="myPostTag">
                                <div>#{v.regionCategory}</div>
                                {v.themeCategory.map((v, i) => {
                                  return <div key={i}>#{v.themeCategory}</div>;
                                })}
                              </div>
                              <div className="myPostIcons">
                                <img src={talkwhite} alt="댓글 갯수" />
                                {v.commentCount}
                                <img src={heartwhite} alt="댓글 갯수" />
                                {v.loveCount}
                              </div>
                            </div>
                          </div>
                        </div>

                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="writeButtonWrap">
          <div className="writeButton"
          onClick={onWriteHandler}>
            <img src={edit} alt="글쓰기 버튼"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
