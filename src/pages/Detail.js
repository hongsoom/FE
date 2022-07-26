import React, { useEffect, useState, useRef } from "react";
import "../css/detail.scss";
import instance from "../shared/Request";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deletePostDB } from "../redux/module/post";
import { userAction } from "../redux/module/user";

// 컴포넌트
import Kakaomap from "../components/kakaomap/Kakaomap";
import DetailImageSlide from "../components/imageSlide/DetailImageSlide";
import Comment from "../components/comment/Comment";

// 아이콘
import leftArrowBlack from "../assets/leftArrowBlack.png";
import editblack from "../assets/editblack.png";
import trash from "../assets/trash.png";
import heartpink from "../assets/heartpink.png";
import bookmark from "../assets/bookmark.png";
import shareblack from "../assets/shareblack.png";
import logosky from "../assets/logosky.png";
import bookmarkBlue from "../assets/bookmark-blue.png";
import heartpaint from "../assets/heartpaint.png";

// 카카오맵
const { kakao } = window;

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams().id;
  const [points, setPoints] = useState([]);
  const myMap = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState("");

  // -------------- 게시글 데이터 가져오기
  const getData = async (postId) => {
    try {
      setData(null);
      setLoading(true);
      const response = await instance.get(`api/post/${postId}`);
      const newData = response.data.body;
      setData(newData);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(param);
  }, [param]);

  console.log(data);

  // 로그인한 사람과 글쓴이가 일치하는지 여부 확인
  useEffect(() => {
    dispatch(userAction.myInfoDB());
  }, [dispatch]);
  const userInfo = useSelector((state) => state.user.myinfo);

  // -------------- 게시글 데이터 삭제하기
  const onDeleteHandler = () => {
    dispatch(deletePostDB(param));
  };

  // ------------- 수정하기
  const onModifyHandler = () => {
    navigate(`/write/${param}`);
  };

  useEffect(() => {
    list(data && data.place);
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
            '<div style="padding:5px;font-size:12px;">' +
              _place.place_name +
              "<br/>" +
              _place.phone +
              `<a href= 	kakaomap://route?sp=37.537229,127.005515&ep=37.4979502,127.0276368&by=CAR style="color:blue" target="_blank">카카오길찾기</a></div>`
          );
          infowindow.open(map, marker);
          setFocus(_place.place_name);
          const clickedFinPlace = document.getElementById(`selectedPlace${i}`);
          clickedFinPlace.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
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

  return (
    <>
      {/* 헤더 */}
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
                ) : null}
              </div>
              <div className="nick">
                {data && data.nickname && data.nickname}
              </div>
              <div className="profileTags">
                <div className="regionCategory">
                  #{data && data.regionCategory}
                </div>
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
              <div className="calendarButton">🗓 코스일정</div>
              <div className="kakaomapButton">길찾기</div>
            </div>
          </div>
        </div>
        <Kakaomap kakao={kakao} myMap={myMap} />
      </div>

      {/* 장소목록 / 사진슬라이드 / 댓글 */}
      <div className="contentsWrap">
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
                          <div className="imgUploadTitle">
                            <img src={logosky} alt="야너갈 로고" />
                            {l.place_name}
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
            {/* 콘텐츠 */}
            <div className="txtPlace">{data && data.content}</div>

            {/* 좋아요 즐겨찾기 버튼 */}
            <div className="heartNbookmarkIcon">
              <div className="heartIcon">
                {data && data.loveStatus === true ? (
                  <img src={heartpaint} alt="좋아요 버튼" />
                ) : (
                  <img src={heartpink} alt="좋아요 버튼" />
                )}
              </div>
              <div className="heartNum">{data && data.loveCount}</div>
              <div className="bookmarkIcon">
                {data && data.bookmarkStatus === false ? (
                  <img src={bookmark} alt="즐겨찾기 버튼" />
                ) : (
                  <img src={bookmarkBlue} alt="즐겨찾기 완료" />
                )}
              </div>
              <div className="shareIcon">
                <img src={shareblack} alt="즐겨찾기 버튼" />
              </div>
            </div>

            <div className="commentPlace">
              <Comment param={param} />
            </div>
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
                    <div className="imgUploadTitle">
                      <img src={logosky} alt="야너갈 로고" />
                      {data && data.place[0] && data.place[0].place_name}
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

            {/* 콘텐츠 */}
            <div className="txtPlace">{data && data.content}</div>

            {/* 좋아요 즐겨찾기 버튼 */}
            <div className="heartNbookmarkIcon">
              <div className="heartIcon">
                {data && data.loveStatus === true ? (
                  <img src={heartpaint} alt="좋아요 버튼" />
                ) : (
                  <img src={heartpink} alt="좋아요 버튼" />
                )}
              </div>
              <div className="heartNum">{data && data.loveCount}</div>
              <div className="bookmarkIcon">
                {data && data.bookmarkStatus === false ? (
                  <img src={bookmark} alt="즐겨찾기 버튼" />
                ) : (
                  <img src={bookmarkBlue} alt="즐겨찾기 완료" />
                )}
              </div>
              <div className="shareIcon">
                <img src={shareblack} alt="즐겨찾기 버튼" />
              </div>
            </div>

            <div className="commentPlace">
              <Comment param={param} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
