import React, { useEffect, useState, useRef } from "react";
import "../css/detail.scss";
import swal from "sweetalert";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPostDB,
  deletePostDB,
  clearPostDB,
  clickBookmarkDB,
  clickLoveDB,
} from "../redux/module/post";
import { userAction } from "../redux/module/user";

// 컴포넌트
import DetailPlaceModal from "../components/modal/DetailPlaceModal";
import Kakaomap from "../components/kakaomap/Kakaomap";
import DetailImageSlide from "../components/imageSlide/DetailImageSlide";
import Comment from "../components/comment/Comment";
import DetailWebShare from "../components/share/DetailWebShare";

// 아이콘
import leftArrowBlack from "../assets/leftArrowBlack.png";
import editblack from "../assets/editblack.png";
import trash from "../assets/trash.png";
import bookmark from "../assets/bookmark.png";
import shareblack from "../assets/shareblack.png";
import logosky from "../assets/logosky.png";
import bookmarkBlue from "../assets/bookmark-blue.png";
import heartEmpty from "../assets/heart.png";
import heartFull from "../assets/heartpaint.png";
import bronze from "../assets/bronze.png";
import silver from "../assets/silver.png";
import gold from "../assets/gold.png";
import diamond from "../assets/diamond.png";
import master from "../assets/master.png";
import user from "../assets/user.png";

// 카카오맵
const { kakao } = window;

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const param = useParams().id;
  const myMap = useRef();

  const Id = useSelector((state) => state.post.postId);
  const data = useSelector((state) => state.post.postOne);

  const [focus, setFocus] = useState("");
  const [showPlaceModal, setShowPlaceModal] = useState(false); // 지역모달
  const [shareMove, setShareMove] = useState(false);

  useEffect(() => {
    dispatch(getPostDB(param));
    return () => {
      dispatch(clearPostDB());
    };
  }, [dispatch, param]);

  // 로그인한 사람과 글쓴이가 일치하는지 여부 확인
  useEffect(() => {
    dispatch(userAction.myInfoDB());
  }, [dispatch]);
  const userInfo = useSelector((state) => state.user.myinfo);

  // ---------------------------- 선택 장소 목록 모달 open / close
  const openPlaceModal = () => {
    setShowPlaceModal(true);
  };
  const closePlaceModal = () => {
    setShowPlaceModal(false);
  };

  // -------------- 게시글 데이터 삭제하기
  const onDeleteHandler = () => {
    swal({
      title: "삭제하시겠습니까?",
      text: "삭제시 등급 게이지가 줄어듭니다",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("삭제되었습니다!", {
          icon: "success",
        });
        dispatch(deletePostDB(param));
        navigate("/");
      } else {
        swal("취소되었습니다");
      }
    });
  };
  // ------------- 수정하기
  const onModifyHandler = () => {
    navigate(`/write/${param}`);
  };

  // ------------- 길찾기 버튼
  const onKakaoTrafficHandler = () => {
    navigate(`/detail/${param}/kakaomap`, { state: { data: data } });
  };

  useEffect(() => {
    list(data.place);
    window.scrollTo(0, 0);
  }, [data]);

  // 선택된 장소 목록이 들어있는 data.place 배열을 list 함수에 넣어준다.
  const list = (positions) => {
    if (positions && positions.length !== 0) {
      const options = {
        center: new kakao.maps.LatLng(
          positions[positions.length - 1].y,
          positions[positions.length - 1].x
        ),
        level: 7,
      };
      const map = new kakao.maps.Map(myMap.current, options);

      for (var i = 0; i < positions.length; i++) {
        // 마커를 생성
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(positions[i].y, positions[i].x),
          // position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          place_name: positions[i].place_name,
        });
        displayMarker(positions[i], i);
      }

      // 마커찍기 함수
      function displayMarker(_place, i) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(_place.y, _place.x),
          title: _place.place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });

        kakao.maps.event.addListener(marker, "click", function () {
          var infowindow = new kakao.maps.InfoWindow({
            zIndex: 1,
            removable: true,
          });
          infowindow.setContent(
            '<div style="display:flex;justify-content:center;"><div style="padding-left:15px;padding-right:15px;height:100px;font-size:12px;display:flex;flex-direction:column;justify-content:center;">' +
              _place.place_name +
              "<br/>" +
              _place.phone +
              "<br/>" +
              `<a href=${_place.place_url} style="color:blue" target="_blank">자세히 알아보기</a></div></div>`
          );
          infowindow.open(map, marker);
          setFocus(_place.place_name);
        });
      }
    } else {
      const options = {
        center: new kakao.maps.LatLng(37.5666805, 126.9784147),
        level: 4,
      };
      const map = new kakao.maps.Map(myMap.current, options);
    }
  };

  // 메인으로 돌아가기 버튼
  const onClickLeftArrow = () => {
    navigate("/");
  };

  const webShare = () => {
    setShareMove(!shareMove);
  };

  return (
    <>
      <div className="detailHeader">
        <div className="detailHeaderWrap">
          <div className="detailUpperHeader">
            <div className="preIcon" onClick={onClickLeftArrow}>
              <img src={leftArrowBlack} alt="홈으로 이동" />
            </div>
            <div className="title">{data && data.title}</div>
            <div className="icons">
              {userInfo && data && userInfo.nickname === data.nickname ? (
                <>
                  <div className="editIcon">
                    <img
                      src={editblack}
                      alt="수정하기"
                      onClick={onModifyHandler}
                    />
                  </div>
                  <div className="trashIcon">
                    <img src={trash} alt="삭제하기" onClick={onDeleteHandler} />
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="detailMiddleHeader">
            <div className="profile">
              <div className="profilePic">
                {data && data.userImgUrl ? (
                  <img src={`${data.userImgUrl}`} alt="프로필 이미지" />
                ) : (
                  <img src={user} alt="기본 프로필 이미지" />
                )}
              </div>
              <div className="myBadge">
                {data && data.grade === "BRONZE" ? (
                  <img src={bronze} alt="브론즈 뱃지" />
                ) : data && data.grade === "SILVER" ? (
                  <img src={silver} alt="실버 뱃지" />
                ) : data && data.grade === "GOLD" ? (
                  <img src={gold} alt="골드 뱃지" />
                ) : data && data.grade === "DIAMOND" ? (
                  <img src={diamond} alt="다이아몬드 뱃지" />
                ) : data && data.grade === "MASTER" ? (
                  <img src={master} alt="마스터 뱃지" />
                ) : null}
              </div>
              <div className="nick">
                {data && data.nickname && data.nickname}
              </div>
              <div className="profileTags">
                {data &&
                  data.themeCategory.map((v, i) => {
                    return (
                      <div className="themeCategory" key={i}>
                        #{v.themeCategory}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="detailLowerHeader">
            <div className="modalButtons">
              <div className="regionButton">
                🗺 {data && data.regionCategory}
              </div>
              <div className="priceButton">💸 {data && data.priceCategory}</div>
              {/* 선택한 장소 확인하기 */}
              <div className="placeButton" onClick={()=>{list(data&&data.place)}}>
                모든 핀 보기
                <div className="places">
                  <DetailPlaceModal
                    data={data}
                    myMap={myMap}
                    showPlaceModal={showPlaceModal}
                    setFocus={setFocus}
                    closePlaceModal={closePlaceModal}
                  />
                </div>
              </div>
              <div className="kakaomapButton" onClick={onKakaoTrafficHandler}>
                길찾기
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 장소목록 / 사진슬라이드 / 댓글 */}
      <div className="contentsWrap">
        <div className="kakaomap">
          <Kakaomap kakao={kakao} myMap={myMap} />
        </div>
        {focus && focus.length !== 0 ? (
          <div className="detailSectionWrap">
            {/* 핀을 클릭했을 때 */}
            {/* 바뀌는 부분 시작 */}
            <div className="sectionPerPlace">
              {data &&
                data.place.map((l, j) => {
                  return (
                    <div
                      className="sectionPerPlaceWrap"
                      key={j}
                      style={
                        focus === l.place_name
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <div className="imgUpload">
                        {/* 사진업로드하는 장소 이름 */}
                        <div className="imgUploadHeader">
                          <div className="imgUploadTitle" onClick={openPlaceModal}>
                            <div className="titleTxtWrap">
                              <img src={logosky} alt="야너갈 로고" />
                              {l.place_name}
                            </div>
                            <div className="clickInfo">
                                클릭시 모든 장소를 확인할 수 있어요!
                            </div>
                          </div>
                        </div>
                        <DetailImageSlide
                          data={data}
                          focus={focus}
                          l={l}
                          j={j}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* 장소마다 바뀌는 부분 끝  */}
          </div>
        ) : (
          <div className="detailSectionWrap">
            {/* 핀을 클릭하지 않았을 때 */}
            {/* 바뀌는 부분 시작 */}
            <div className="sectionPerPlace">
              <div className="sectionPerPlaceWrap">
                <div className="imgUpload">
                  {/* 사진업로드하는 장소 이름 */}
                  <div className="imgUploadHeader">
                    <div className="imgUploadTitle" onClick={openPlaceModal}>
                      <div className="titleTxtWrap">
                        <img src={logosky} alt="야너갈 로고" />
                        {data && data.place[0] && data.place[0].place_name}
                      </div>
                      <div className="clickInfo">
                          클릭시 모든 장소를 확인할 수 있어요!
                      </div>
                    </div>
                  </div>
                  {/* 사진업로드 */}
                  <div className="imgSlide">
                    <DetailImageSlide
                      data={data}
                      l={data && data.place[0]}
                      j={0}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 장소마다 바뀌는 부분 끝  */}
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="txtPlace">{data && data.content}</div>
        {shareMove ? (
          <DetailWebShare
            webShare={webShare}
            title={data && data.title}
            imgUrl={data && data.place[0] && data.place[0].imgUrl[0]}
            loveCount={data && data.loaveCount}
            postId={data && data.postId}
            regionCategory={data && data.regionCategory}
            priceCategory={data && data.priceCategory}
            themeCategory={data && data.themeCategory}
          />
        ) : null}
        {/* 좋아요 즐겨찾기 버튼 */}
        <div className="heartNbookmarkIcon">
          <div className="iconsWrap">
            <div
              className="heartIcon"
              onClick={() => dispatch(clickLoveDB(param))}
            >
              {data.loveStatus === true ? (
                <img src={heartFull} alt="heartFull" />
              ) : (
                <img src={heartEmpty} alt="heartEmpty" />
              )}
            </div>
            <div className="heartNum">{data && data.loveCount}</div>
            <div
              className="bookmarkIcon"
              onClick={() => dispatch(clickBookmarkDB(param))}
            >
              {data.postId === Id ? (
                data.bookmarkStatus === false ? (
                  <img src={bookmark} alt="즐겨찾기 버튼" />
                ) : (
                  <img src={bookmarkBlue} alt="즐겨찾기 완료" />
                )
              ) : data.bookmarkStatus === false ? (
                <img src={bookmark} alt="즐겨찾기 버튼" />
              ) : (
                <img src={bookmarkBlue} alt="즐겨찾기 완료" />
              )}
            </div>
            <div className="shareIcon" onClick={webShare}>
              <img src={shareblack} alt="공유하기 버튼" />
            </div>
          </div>
        </div>

        <div className="commentPlace">
          <Comment param={param} userId={userInfo && userInfo.userId} />
        </div>
      </div>
    </>
  );
};

export default Detail;
