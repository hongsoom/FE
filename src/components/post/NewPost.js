import React, { useState, useRef } from "react";
import "../../css/post.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

// 컴포넌트
import SearchPlace from "../post/SearchPlace";
import Kakaomap from "../kakaomap/Kakaomap";
import ImageSlide from "../imageSlide/ImageSlide";
import ThemeModal from "../modal/ThemeModal";
import RegionModal from "../modal/RegionModal";
import PriceModal from "../modal/PriceModal";

// 리덕스 모듈
import { addPostDB } from "../../redux/module/post";

// 아이콘
import search from "../../assets/search.png";
import logosky from "../../assets/logosky.png";
import trashwhite from "../../assets/trashwhite.png";
import leftArrowBlack from "../../assets/leftArrowBlack.png";

// 카카오맵
const { kakao } = window;

const NewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myMap = useRef(); // 카카오맵 화면 ref
  const [place, setPlace] = useState(""); // 카카오맵 장소들
  const [Places, setPlaces] = useState([]); // 검색 결과 배열에 담아줌
  const [title, setTitle] = useState(""); // 글 제목
  const [content, setConent] = useState(""); // 콘텐트 텍스트
  const [inputText, setInputText] = useState(""); // 검색창 검색 키워드
  const [select, setSelect] = useState([]); // 선택한 장소 배열에 담아줌
  const [imgUrl, setImgUrl] = useState([]); // 선택한 장소 이미지미리보기 url 넣을 배열
  const [focus, setFocus] = useState(); // 선택한 장소 핀 클릭 목록 포커스
  const [selectedRegion, setRegion] = useState(""); // 지역 선택
  const [selectedTheme, setTheme] = useState([]); // 테마 선택
  const [selectedPrice, setPrice] = useState(""); // 비용 선택
  const [showPriceModal, setShowPriceModal] = useState(false); // 비용모달
  const [showThemeModal, setShowThemeModal] = useState(false); // 지역모달
  const [showRegionModal, setShowRegionModal] = useState(false); // 지역모달
  const [imgs, setImgs] = useState([]); // 이미지 모두 파일
  const [loading, setLoading] = useState(false);
  const [editdata, setEditData] = useState([]);

  const region = [
    "서울",
    "대전",
    "경기",
    "세종",
    "인천",
    "대구",
    "강원도",
    "울산",
    "충청도",
    "광주",
    "전라도",
    "부산",
    "경상도",
    "제주도",
  ];
  const theme = ["힐링", "맛집", "애견동반", "액티비티", "호캉스"];
  const price = [
    "10만원 이하",
    "10만원대",
    "20만원대",
    "30만원대",
    "40만원대",
    "50만원 이상",
  ];

  const onClickLeftArrow = () => {
    navigate("/");
  };

  // ---------------------------- 제목 가져오기
  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  // ---------------------------- 검색 창
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    const searchList_wrap = document.getElementById("searchList_wrap");
    searchList_wrap.style.height = "220px";

    if (!inputText.replace(/^\s+|\s+$/g, "")) {
      swal("키워드를 입력해주세요!");
      return false;
    }
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  // ---------------------------- 지역 모달 open / close
  const openRegionModal = () => {
    setShowRegionModal(true);
  };
  const closeRegionModal = () => {
    setShowRegionModal(false);
  };

  // ---------------------------- 테마 모달 open / close
  const openThemeModal = () => {
    setShowThemeModal(true);
  };
  const closeThemeModal = () => {
    setShowThemeModal(false);
  };

  // ---------------------------- 비용 모달 open / close
  const openPriceModal = () => {
    setShowPriceModal(true);
  };
  const closePriceModal = () => {
    setShowPriceModal(false);
  };

  // ---------------------------- 적힌 콘텐트 텍스트 가져오기
  const onContentHandler = (e) => {
    setConent(e.target.value);
  };

  // ----------------------------- 장소 선택 취소
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

  // ---------------------------- 첨부이미지 파일들 폼데이터로 담기
  const json = JSON.stringify(select);
  const blob = new Blob([json], { type: "application/json" });

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("regionCategory", selectedRegion);
  formData.append("themeCategory", selectedTheme);
  formData.append("priceCategory", selectedPrice);
  formData.append("places", blob);
  imgs.forEach((v, i) => {
    formData.append("imgUrl", v);
  });

  // for (let key of formData.keys()) {
  //   console.log(key, ":", formData.get(key));
  // }

  // ---------------------------- 작성 완료 버튼
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
      dispatch(addPostDB(formData));
    }
  };

  const onClickHandler = (__place) => {
    setFocus(__place);
    const searchList_wrap = document.getElementById("searchList_wrap");
    searchList_wrap.style.height = "0px";
  };

  // ---------------------------- 선택된 장소만 마커 찍어주기

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
              _place.address_name +
              "<br/>" +
              _place.phone +
              "</div>"
          );
          infowindow.open(map, marker);
          setFocus(_place.place_name);
          // const clickedFinPlace = document.getElementById(`finPlace${i}`)
          // clickedFinPlace.scrollIntoView({behavior:'smooth',block:'center'})
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
    <>
      {/* 헤더 */}
      <div className="writeHeader">
        <div className="writeHeaderWrap">
          <div className="writeUpperHeader">
            <div className="writePreIcon" onClick={onClickLeftArrow}>
              <img src={leftArrowBlack} alt="홈으로 이동" />
            </div>
            <SearchPlace
              search={search}
              Places={Places}
              onChange={onChange}
              handleSubmit={handleSubmit}
              inputText={inputText}
              onClickHandler={onClickHandler}
              setSelect={setSelect}
              select={select}
              setImgUrl={setImgUrl}
              list={list}
              setFocus={setFocus}
            />
          </div>
          <div className="writeLowerHeader">
            <div className="modalButtons">
              {/* 지역선택 */}
              <div className="regionButton" onClick={openRegionModal}>
                {selectedRegion ? (
                  <div className="modalChoiceTitle">
                    🗺 {selectedRegion && selectedRegion}
                  </div>
                ) : (
                  <div className="modalChoiceTitle">🗺 지역 선택</div>
                )}

                <div className="regions">
                  <RegionModal
                    region={region}
                    selectedRegion={selectedRegion}
                    setRegion={setRegion}
                    showRegionModal={showRegionModal}
                    closeRegionModal={closeRegionModal}
                  />
                </div>
              </div>

              {/* 테마선택 */}
              <div className="themeButton" onClick={openThemeModal}>
                {selectedTheme.length === 0 ? (
                  <div className="modalChoiceTitle">⛱ 테마 선택</div>
                ) : selectedTheme.length === 1 ? (
                  <div className="modalChoiceTitle">⛱ {selectedTheme[0]}</div>
                ) : selectedTheme.length > 1 ? (
                  <div className="modalChoiceTitle">
                    ⛱ 테마 {selectedTheme.length - 1}개
                  </div>
                ) : null}
                <div className="themes">
                  <ThemeModal
                    theme={theme}
                    selectedTheme={selectedTheme}
                    setTheme={setTheme}
                    showThemeModal={showThemeModal}
                    closeThemeModal={closeThemeModal}
                  />
                </div>
              </div>

              {/* 비용선택 */}
              <div className="priceButton" onClick={openPriceModal}>
                {selectedPrice ? (
                  <div className="modalChoiceTitle">
                    💸 {selectedPrice && selectedPrice}
                  </div>
                ) : (
                  <div className="modalChoiceTitle">💸 비용 선택</div>
                )}

                <div className="prices">
                  <PriceModal
                    price={price}
                    selectedPrice={selectedPrice}
                    setPrice={setPrice}
                    showPriceModal={showPriceModal}
                    closePriceModal={closePriceModal}
                  />
                </div>
              </div>

              {/* 일정선택 */}
              <div className="calendarButton" onClick={openPriceModal}>
                <div className="modalChoiceTitle">🗓 일정 선택</div>
                <div className="calendars">
                  <PriceModal
                    price={price}
                    selectedPrice={selectedPrice}
                    setPrice={setPrice}
                    showPriceModal={showPriceModal}
                    closePriceModal={closePriceModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Kakaomap
          kakao={kakao}
          myMap={myMap}
          setPlaces={setPlaces}
          place={place}
        />
      </div>

      {/* 움직이는 부분 */}
      <div className="contentWrap">
        {/* 제목 */}
        <div className="writeTitleWrap">
          <input
            type="text"
            onChange={onTitleHandler}
            defaultValue={editdata && editdata.title}
            placeholder="코스 이름을 적어주세요"
          />
        </div>

        {/* 검색하고 선택한 장소가 없을 때 */}
        {select.length === 0 ? (
          <div className="sectionWrap">
            {/* 바뀌는 부분 */}
            <div className="sectionPerPlace">
              <div className="sectionPerPlaceWrap">
                {/* 사진업로드 */}
                <div className="imgUpload">
                  {/* 사진업로드하는 장소 이름 */}
                  <div className="imgUploadHeader">
                    <div className="imgUploadTitle">
                      <img src={logosky} alt="야너갈 로고" />
                      장소를 검색해주세요!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 텍스트 입력 */}
            <div className="writeTxt">
              <textarea
                placeholder="아직 선택된 장소가 없어요!"
                defaultValue={editdata && editdata.content}
                onChange={onContentHandler}
              />
            </div>
            <button className="writeSubmit" onClick={onHandlerSubmit}>
              {" "}
              작성 완료하기
            </button>
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
                          <div className="imgUploadTitle">
                            <img src={logosky} alt="야너갈 로고" />
                            {l.place_name}
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
                        />
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* 텍스트 입력 */}
            <div className="writeTxt">
              <textarea
                placeholder="코스에 대한 설명을 입력해주세요"
                defaultValue={editdata && editdata.content}
                onChange={onContentHandler}
              />
            </div>

            <button className="writeSubmit" onClick={onHandlerSubmit}>
              작성 완료하기
            </button>
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
                    <div className="imgUploadTitle">
                      <img src={logosky} alt="야너갈 로고" />
                      {select && select[0] && select[0].place_name}
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

            {/* 텍스트 입력 */}
            <div className="writeTxt">
              <textarea
                placeholder="코스에 대한 설명을 입력해주세요"
                defaultValue={editdata && editdata.content}
                onChange={onContentHandler}
              />
            </div>
            <button className="writeSubmit" onClick={onHandlerSubmit}>
              작성 완료하기
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NewPost;
