import React, { useEffect, useState, useRef } from "react";
import "../css/detail.scss";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostDB, clearPostDB } from "../redux/module/post";
import { userAction } from "../redux/module/user";

// 컴포넌트
import DetailHeader from "../components/post/DetailHeader"
import Kakaomap from "../components/kakaomap/Kakaomap";
import Comment from "../components/comment/Comment";
import DetailSectionPerPlace from "../components/post/DetailSectionPerPlace";
import DetailHeartMarkShare from "../components/post/DetailHeartMarkShare";

import logosky from "../assets/logosky.png";

// 카카오맵
const { kakao } = window;

const Detail = () => {
  const dispatch = useDispatch();
  const param = useParams().id;
  const myMap = useRef();
  const data = useSelector((state) => state.post.postOne);
  const [focus, setFocus] = useState("");
  const [showPlaceModal, setShowPlaceModal] = useState(false); // 지역모달

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

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  useEffect(() => {
    list(data.place);
  }, [data]);

  // 선택 장소 목록 모달 open
  const openPlaceModal = () => {
    setShowPlaceModal(true);
  };

  // 선택된 장소 목록이 들어있는 data.place 배열을 list 함수에 넣어준다.
  function list(positions) {
    if (positions && positions.length !== 0) {
      const options = {
        center: new kakao.maps.LatLng(
          positions[positions.length - 1].y,
          positions[positions.length - 1].x
        ),
        level: 8,
      };
      const map = new kakao.maps.Map(myMap.current, options);

      for (var i = 0; i < positions.length; i++) {
        // 마커를 생성
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(positions[i].y, positions[i].x),
          // position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title,
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
            "<br/>" +
            `<a href=${_place.place_url} style="color:blue" target="_blank">자세히 알아보기</a></div>`
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
  }

  return (
    <div className="detailTotalWrap">
      <DetailHeader myMap={myMap} openPlaceModal={openPlaceModal} setFocus={setFocus} setShowPlaceModal={setShowPlaceModal} showPlaceModal={showPlaceModal} data={data} list={list} userInfo={userInfo}/>
      
      <div className="contentsWrap">
        {/* 카카오맵 / 제목 / 사진슬라이드 */}
        <Kakaomap kakao={kakao} myMap={myMap} />
        <DetailSectionPerPlace data={data} logosky={logosky} focus={focus} openPlaceModal={openPlaceModal}/>

        {/* 콘텐츠 */}
        <div className="txtPlace">{data && data.content}</div>
        {/* 좋아요 북마크 공유하기 */}
        <DetailHeartMarkShare data={data} param={param}/>

        {/* 댓글 */}
        <div className="commentPlace">
          <Comment param={param} userId={userInfo && userInfo.userId} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
