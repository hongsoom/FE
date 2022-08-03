import React, { useState, useRef } from "react";
import "../../css/post.scss";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

// 컴포넌트
import PostHeader from "./PostHeader";
import Kakaomap from "../kakaomap/Kakaomap";
import Title from "../post/Title";
import ImageSlide from "../imageSlide/ImageSlide";
import TextBox from "./TextBox";

// 리덕스 모듈
import { addPostDB } from "../../redux/module/post";

// 아이콘
import logosky from "../../assets/logosky.png";
import trashwhite from "../../assets/trashwhite.png";


// 카카오맵
const { kakao } = window;

const NewPost = (props) => {
  const { myInfo } = props;
  const dispatch = useDispatch();
  const myMap = useRef(); // 카카오맵 화면 ref
  const [place, setPlace] = useState(""); // 카카오맵 장소들
  const [Places, setPlaces] = useState([]); // 검색 결과 배열에 담아줌
  const [title, setTitle] = useState(""); // 글 제목
  const [content, setContent] = useState(""); // 콘텐트 텍스트
  const [inputText, setInputText] = useState(""); // 검색창 검색 키워드
  const [select, setSelect] = useState([]); // 선택한 장소 배열에 담아줌
  const [imgUrl, setImgUrl] = useState([]); // 선택한 장소 이미지미리보기 url 넣을 배열
  const [focus, setFocus] = useState(); // 선택한 장소 핀 클릭 목록 포커스
  const [selectedRegion, setRegion] = useState(""); // 지역 선택
  const [selectedTheme, setTheme] = useState([]); // 테마 선택
  const [selectedPrice, setPrice] = useState(""); // 비용 선택
  const [imgs, setImgs] = useState([]); // 이미지 모두 파일
  const [showPlaceModal, setShowPlaceModal] = useState(false); // 지역모달
  const [searchedPlaces, setSearchedPlaces] = useState(false)

  const handleSubmit = (e) => {
    if (!inputText.replace(/^\s+|\s+$/g, "")) {
      swal("키워드를 입력해주세요!");
      return false;
    }
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  // 선택 장소 목록 모달 open / close
  const openPlaceModal = () => {
    if(select&&select.length !== 0){
      setShowPlaceModal(true)
    } else{
      swal("아직 선택한 장소가 없습니다!");
    }
  }
  const closePlaceModal = () => {
    setShowPlaceModal(false)
  }

  // 장소 선택 취소
  const onRemovePlace = (place) => {
    swal({
      title: "이 장소를 삭제할까요?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("목록에서 삭제되었습니다", {
          icon: "success",
        });
        if (select && select.length !== 0) {
          setFocus(select && select[0].place_name);
        }
        setSelect((pre) => {
          const newSelect = pre.filter((v, i) => {
            return place.place_name !== v.place_name;
          });
          list(newSelect);
          return newSelect;
        });
        setImgUrl((pre) => {
          const imgUrlList = pre.filter((v, i) => {
            return place.place_name !== v.place_name;
          });
          return imgUrlList;
        });
      } else {
        swal("삭제를 취소했습니다");
      }
    });
  };

  // 첨부이미지 파일들 폼데이터로 담기
  const json = JSON.stringify(select);
  const blob = new Blob([json], { type: "application/json" });

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("regionCategory", selectedRegion);
  formData.append("themeCategory", selectedTheme);
  formData.append("priceCategory", selectedPrice);
  formData.append("places", blob);
  imgs&&imgs.forEach((v, i) => {
    formData.append("imgUrl", v);
  });


  // 작성 완료 버튼
  const onHandlerSubmit = () => {
    if (select.length === 0) {
      swal("장소를 검색하고 선택해주세요!");
    } else if (selectedRegion.length === 0) {
      swal("지역을 선택해주세요!");
    } else if (selectedTheme.length === 0) {
      swal("테마를 선택해주세요!");
    } else if (selectedPrice.length === 0) {
      swal("비용을 선택해주세요!");
    } else if (title.length === 0) {
      swal("제목을 적어주세요!");
    } else if (imgs.length === 0) {
      swal("사진을 첨부해주세요!");
    } else if (content.length < 10) {
      swal("내용은 10자 이상 적어주세요!");
    } else if (
      selectedRegion.length !== 0 &&
      selectedTheme.length !== 0 &&
      selectedPrice.length !== 0 &&
      select &&
      content.length >= 10 &&
      title &&
      imgs.length !== 0
    ) {
      swal("작성 완료하시겠습니까?").then((value) => {
        swal("작성이 완료되었습니다!");
        dispatch(addPostDB(formData));
      });
    }
  };
  
  // 핀을 클릭하면 핀 포커스
  const onClickHandler = (__place) => {
    setFocus(__place);
    setPlaces([])
    const searchList_wrap = document.getElementById("searchList_wrap");
    searchList_wrap.scrollTo(0,0)
    
  };

  // 선택된 장소만 마커 찍어주기
  // 선택된 장소 목록이 들어있는 select 상태배열을 list 함수에 넣어줬다.
  const list = (positions) => {
    if (positions.length !== 0) {
      const options = {
        center: new kakao.maps.LatLng(
          positions[positions.length - 1].y,
          positions[positions.length - 1].x
        ),
        level: 5,
      };
      const map = new kakao.maps.Map(myMap.current, options);

        for (var i = 0; i < positions.length; i++) {
          let bounds = new kakao.maps.LatLngBounds()
        // 마커를 생성
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(positions[i].y, positions[i].x),
          // position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          place_name: positions[i].place_name,
        });
        displayMarker(positions[i], i);
        bounds.extend(new kakao.maps.LatLng(positions[i].y, positions[i].x))
        map.setBounds(bounds)
      }
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      

      // 마커찍기 함수
      function displayMarker(_place, i) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(_place.y, _place.x),
        });

        kakao.maps.event.addListener(marker, "click", function () {
          var infowindow = new kakao.maps.InfoWindow({
            zIndex: 1,
            removable: true,
          });
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;"> <b>' +
              _place.place_name +
              "</b> <br/>" +
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

  return (
    <div className="writeTotalWrap">
      {/* 헤더 */}
      <PostHeader 
        setRegion={setRegion}
        setTheme={setTheme}
        setPrice={setPrice}
        selectedRegion={selectedRegion}
        selectedTheme={selectedTheme}
        selectedPrice={selectedPrice}
        openPlaceModal={openPlaceModal}
        closePlaceModal={closePlaceModal}
        setShowPlaceModal={setShowPlaceModal}
        showPlaceModal={showPlaceModal}
        myInfo={myInfo}
        setInputText={setInputText}
        inputText={inputText}
        select={select}
        setSelect={setSelect}
        setFocus={setFocus}
        myMap={myMap}
        list={list}
        Places={Places}
        handleSubmit={handleSubmit}
        onClickHandler={onClickHandler}
        setImgUrl={setImgUrl}
        searchedPlaces={searchedPlaces}
        setSearchedPlaces={setSearchedPlaces}
        />
        
      {/* 움직이는 부분 */}
      <div className="contentWrap">
        <Kakaomap
          kakao={kakao}
          myMap={myMap}
          setPlaces={setPlaces}
          place={place}
          setSearchedPlaces={setSearchedPlaces}
          searchedPlaces={searchedPlaces}
        />

        {/* 제목 */}
        <Title setTitle={setTitle} />

        {/* 검색하고 선택한 장소가 없을 때 */}
        {select && select.length === 0 ? (
          <div className="sectionWrap">
            {/* 바뀌는 부분 */}
            <div className="sectionPerPlace">
              <div className="sectionPerPlaceWrap">
                {/* 사진업로드 */}
                <div className="imgUpload">
                  {/* 사진업로드하는 장소 이름 */}
                  <div className="imgUploadHeader">
                    <div className="imgUploadTitle">
                      <div className="titleTxtWrap">
                        <img src={logosky} alt="야너갈 로고"/>
                          최상단 검색창에서 장소를 검색해주세요!
                      </div>
                      <div className="clickInfo">
                        ❗여러 장소를 검색하고 선택할 수 있어요!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : focus && focus.length !== 0 ? (
          <div className="sectionWrap">
            {/* 검색해서 장소를 선택했고 핀을 클릭했을 때 */}
            {/* 바뀌는 부분 */}
            <div className="sectionPerPlace">
              {select &&
                select.map((l, j) => {
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
                      {/* 사진업로드 */}
                      <div className="imgUpload">
                        {/* 사진업로드하는 장소 이름 */}
                        <div className="imgUploadHeader">
                          <div className="imgUploadTitle" onClick={openPlaceModal}>
                            <div className="titleTxtWrap">
                              <img src={logosky} alt="야너갈 로고" />
                              {l.place_name}
                            </div>
                            <div className="clickInfo">
                              ❗여러 장소를 검색하고 선택할 수 있어요!
                            </div>
                          </div>
                          <div
                            className="removePlaceButton"
                            onClick={() => {
                              onRemovePlace(l);
                            }}
                          >
                            <img src={trashwhite} alt="장소 삭제 버튼" />이 장소
                            삭제
                          </div>
                        </div>
                        <ImageSlide
                          select={select}
                          setSelect={setSelect}
                          imgUrl={imgUrl}
                          setImgUrl={setImgUrl}
                          setImgs={setImgs}
                          imgs={imgs}
                          l={l}
                          j={j}
                          focus={focus}
                          setFocus={setFocus}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="sectionWrap">
            {/* 검색해서 장소를 선택했지만 핀을 클릭하지 않았을 때 */}
            {/* 바뀌는 부분 */}
            <div className="sectionPerPlace">
              <div className="sectionPerPlaceWrap">
                {/* 사진업로드 */}
                <div className="imgUpload">
                  {/* 사진업로드하는 장소 이름 */}
                  <div className="imgUploadHeader">
                    <div className="imgUploadTitle" onClick={openPlaceModal}>
                      <div className="titleTxtWrap">
                        <img src={logosky} alt="야너갈 로고" />
                        {select && select[0] && select[0].place_name}
                      </div>
                      <div className="clickInfo">
                        ❗여러 장소를 검색하고 선택할 수 있어요!
                      </div>
                    </div>
                    <div
                      className="removePlaceButton"
                      onClick={() => {
                        onRemovePlace(select && select[0]);
                      }}
                    >
                      <img src={trashwhite} alt="장소 삭제 버튼" />이 장소 삭제
                    </div>
                  </div>
                  <ImageSlide
                    select={select}
                    setSelect={setSelect}
                    imgUrl={imgUrl}
                    setImgUrl={setImgUrl}
                    setImgs={setImgs}
                    imgs={imgs}
                    l={select[0] && select[0]}
                    j={0}
                    focus={focus}
                  />
                </div>
              </div>
            </div>
          </div>
          )}
        {/* 텍스트 입력 */}
        <TextBox setContent={setContent} />
        <button className="writeSubmit" onClick={onHandlerSubmit}>
          작성 완료하기
        </button>
      </div>
    </div>
  );
};

export default NewPost;