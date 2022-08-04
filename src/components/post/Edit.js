import React, { useEffect, useState, useRef } from "react";
import "../../css/post.scss";
import { useDispatch } from "react-redux";
import { modifyPostDB } from "../../redux/module/post";
import instance from "../../shared/Request";
import swal from "sweetalert";

// 컴포넌트
import PostHeader from "./PostHeader";
import Kakaomap from "../kakaomap/Kakaomap";
import Title from "./Title";
import TextBox from "./TextBox";

// 라우터
import { useNavigate, useParams } from "react-router-dom";

// 아이콘
import PostSectionPerPlace from "./PostSectionPerPlace";

// 카카오맵
const { kakao } = window;

const Edit = (props) => {
  const { myInfo } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myMap = useRef(); // 카카오맵 화면 ref
  const param = useParams().id; //수정할 게시글 번호
  const [loading, setLoading] = useState(false);
  const [editdata, setEditData] = useState([]);

  // 게시글 한개 데이터 가져오기
  const getData = async (postId) => {
    try {
      setEditData(null);
      setLoading(true);
      const response = await instance.get(`api/post/${postId}`);
      const newData = response.data.body;
      setEditData(newData);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(param);
  }, [param]);

  const [place, setPlace] = useState(""); // 카카오맵 장소들
  const [Places, setPlaces] = useState([]); // 검색 결과 배열에 담아줌
  const [title, setTitle] = useState(editdata && editdata.title); // 글 제목
  const [content, setContent] = useState(editdata && editdata.content); // 콘텐트 텍스트
  const [inputText, setInputText] = useState(""); // 검색창 검색 키워드
  const [select, setSelect] = useState([]); // 선택한 장소 배열에 담아줌
  const [imgUrl, setImgUrl] = useState([]); // 선택한 장소 이미지 갯수 카운트 배열
  const [focus, setFocus] = useState(); // 선택한 장소 핀 클릭 목록 포커스
  const [selectedRegion, setRegion] = useState(
    editdata && editdata.regionCategory
  ); // 지역 선택
  const [selectedTheme, setTheme] = useState([]); // 테마 선택
  const [selectedPrice, setPrice] = useState(
    editdata && editdata.priceCategory
  ); // 비용 선택
  const [imgs, setImgs] = useState([]); // 이미지 모두 파일
  const [showPlaceModal, setShowPlaceModal] = useState(false); // 지역모달

  useEffect(() => {
    if (editdata && editdata.place) {
      editdata &&
        editdata.place.map((v, i) => {
          if (v.place_name !== imgUrl.place_name) {
            imgUrl.push({
              place_name: v.place_name,
              imgUrl: v.imgUrl,
            });
            return imgUrl;
          }
        });
    }
    if (editdata && editdata.place) {
      editdata &&
        editdata.place.map((v, i) => {
          select.push({
            address_name: v.address_name,
            category_group_code: v.category_group_code,
            category_group_name: v.category_group_name,
            category_name: v.category_name,
            distance: v.distance,
            imgCount: 0,
            modImgUrl: v.imgUrl,
            id: v.id,
            phone: v.phone,
            place_name: v.place_name,
            place_url: v.place_url,
            road_address_name: v.road_address_name,
            x: v.x,
            y: v.y,
          });
          return select;
        });
    }
    list(select);
    window.scrollTo(0, 0);
  }, [dispatch, editdata]);

  useEffect(() => {
    setTitle(editdata && editdata.title);
    setContent(editdata && editdata.content);
    setRegion(editdata && editdata.regionCategory);
    setPrice(editdata && editdata.priceCategory);
    if (editdata && editdata.themeCategory) {
      editdata &&
        editdata.themeCategory.map((v, i) => {
          selectedTheme.push(v.themeCategory);
          return selectedTheme;
        });
    }
  }, [dispatch, editdata]);

  // 선택 장소 목록 모달 open / close
  const openPlaceModal = () => {
    if (select && select.length !== 0) {
      setShowPlaceModal(true);
    } else {
      swal("아직 선택한 장소가 없습니다!");
    }
  };

  const closePlaceModal = () => {
    setShowPlaceModal(false);
  };

  const handleSubmit = (e) => {
    if (!inputText.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요");
      return false;
    }
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  // 첨부이미지 파일들 폼데이터로 담기
  const json = JSON.stringify(select);
  const blob = new Blob([json], { type: "application/json" });
  const editFormData = new FormData();
  imgs.forEach((v, i) => {
    editFormData.append("imgUrl", v);
  });
  editFormData.append("title", title);
  editFormData.append("content", content);
  editFormData.append("regionCategory", selectedRegion);
  editFormData.append("themeCategory", selectedTheme);
  editFormData.append("priceCategory", selectedPrice);
  editFormData.append("places", blob);
  
  // 검색 목록에서 장소 하나를 선택 클릭
  const onClickHandler = (__place) => {
    setFocus(__place);
    setPlaces([])
    const searchList_wrap = document.getElementById("searchList_wrap");
    searchList_wrap.scrollTo(0,0)
  };

  // 작성 완료 버튼
  const onHandlerEdit = () => {
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
    } else if (imgUrl.length === 0 || imgs.lenght === 0) {
      swal("사진을 첨부해주세요!");
    } else if (content.length < 10) {
      swal("내용은 10자 이상 적어주세요!");
    } else if (
      selectedRegion.length !== 0 &&
      selectedTheme.length !== 0 &&
      selectedPrice.length !== 0 &&
      select &&
      content.length >= 10 &&
      title
    ) {
      swal("수정 완료하시겠습니까?").then((value) => {
        dispatch(modifyPostDB(editFormData, param));
        navigate("/");
      });
    }
  };

  // 선택된 장소만 마커 찍어주기
  // 선택된 장소 목록이 들어있는 select 상태배열을 list 함수에 넣어줬다.
  const list = (positions) => {
    if (positions.length !== 0) {
      let bounds = new kakao.maps.LatLngBounds();
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
        bounds.extend(new kakao.maps.LatLng(positions[i].y, positions[i].x));
      }
      map.setBounds(bounds);
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
            '<div style="padding:5px;font-size:12px;">' +
              _place.place_name +
              "<br/>" +
              _place.phone +
              "</div>"
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
        />
      {/* 움직이는 부분 */}
      <div className="contentWrap" id="contentWrap">
        <Kakaomap
          kakao={kakao}
          myMap={myMap}
          setPlaces={setPlaces}
          place={place}
        />
        {/* 제목 */}
        <Title setTitle={setTitle} param={param} editdata={editdata}/>

        {/* 장소마다 다른 부분 */}
        <PostSectionPerPlace
          select={select}
          setSelect={setSelect}
          focus={focus}
          setFocus={setFocus}
          list={list}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          openPlaceModal={openPlaceModal}
          setImgs={setImgs}
          imgs={imgs}
          editdata={editdata}
        />

        {/* 텍스트 입력 */}
        <TextBox editdata={editdata} setContent={setContent} param={param}/>
        <button className="writeSubmit" onClick={onHandlerEdit}>
          수정 완료하기
        </button>
      </div>
    </div>
  );
};
export default Edit;
