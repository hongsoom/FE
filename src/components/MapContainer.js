import React, { useEffect, useState, useRef } from 'react'
import '../css/mapContainer.scss'

import instance from '../shared/Request'
import swal from 'sweetalert';

// 컴포넌트
import ImageSlide from './imageSlide/ImageSlide'
import ThemeModal from './modal/ThemeModal'
import RegionModal from './modal/RegionModal'
import PriceModal from './modal/PriceModal'

// 라우터
import {useNavigate, useParams} from 'react-router-dom'

// 리덕스
import { useDispatch } from 'react-redux'

// 리덕스 모듈
import { addPostDB} from '../redux/module/post'
import { addImg } from '../redux/module/uploadImg'
import leftArrowBlack from '../assets/leftArrowBlack.png'

// 아이콘
import search from '../assets/search.png'
import logosky from '../assets/logosky.png'
import trashwhite from '../assets/trashwhite.png'

// 카카오맵
const { kakao } = window

const MapContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myMap = useRef(); // 카카오맵 화면 ref
  const [place, setPlace] = useState(""); // 카카오맵 장소들
  const [Places, setPlaces] = useState([]) // 검색 결과 배열에 담아줌
  const [title, setTitle] = useState(''); // 글 제목
  const [content, setConent] = useState(''); // 콘텐트 텍스트 
  const [inputText, setInputText] = useState(""); // 검색창 검색 키워드
  const [select, setSelect] = useState([])  // 선택한 장소 배열에 담아줌
  const [imgUrl, setImgUrl] = useState([]) // 선택한 장소 이미지미리보기 url 넣을 배열
  const [focus, setFocus] = useState(); // 선택한 장소 핀 클릭 목록 포커스
  const [selectedRegion, setRegion] = useState(''); // 지역 선택
  const [selectedTheme, setTheme] = useState([]); // 테마 선택
  const [selectedPrice, setPrice] = useState(''); // 비용 선택
  const [showPriceModal, setShowPriceModal] = useState(false); // 비용모달
  const [showThemeModal, setShowThemeModal] = useState(false); // 지역모달
  const [showRegionModal, setShowRegionModal] = useState(false); // 지역모달
  

  const [imgs, setImgs] = useState([]); // 이미지 모두 파일
  const [loading, setLoading] = useState(false)
  const [editdata, setEditData] = useState([])
 
  const region = ['서울','대전','경기','세종','인천','대구','강원도','울산','충청도','광주','전라도','부산','경상도','제주도']
  const theme = ['힐링','맛집','애견동반','액티비티','호캉스']
  const price = ['10만원 이하', '10만원대', '20만원대','30만원대','40만원대','50만원 이상']
  
  console.log(select)

  // ---------------------------- 게시글 수정하기
  const param = useParams().id;


  const onClickLeftArrow = () => {
    navigate('/')
  }

  // -------------- 게시글 데이터 가져오기
  const getData = async (postId)=>{
    try {
      setEditData(null)
      setLoading(true)
      const response = await instance.get(`api/post/${postId}`);
      const newData = response.data.body
      setEditData(newData);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false)
  }
  
  useEffect(() => {
    getData(param); 
  }, [param]);


  
  // const data = useSelector((state) => ssate.post.post);
  // const is_edit = param ? true : false;
  // const edit_post = is_edit ? dataList && dataList.find(p=> p.postId === param) : null;
  // const is_login = localStorage.getItem("token");
  
  // console.log(data);


  // 수정 중 새로고침하면 데이터가 날아가므로 새로고침하면 강제 홈으로 이동
  // React.useEffect(()=> {
  //   if(is_edit && !edit_post){
  //     navigate(`/`)
  //   }
  // },[])

  
  // ---------------------------- 제목 가져오기
  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  // ---------------------------- 검색 창
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    const searchList_wrap = document.getElementById('searchList_wrap')
    searchList_wrap.style.height='220px'

    if(!inputText.replace(/^\s+|\s+$/g, '')){
      swal("키워드를 입력해주세요!");
      return false;
    }
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  // const isFocusedPlace = (e) => {
  //   setFocus(e.target.value)
  // }

  // ---------------------------- 지역 모달 open / close
  const openRegionModal = () => {
    setShowRegionModal(true)
  }
  const closeRegionModal = () => {
    setShowRegionModal(false)
  }

  // ---------------------------- 테마 모달 open / close
  const openThemeModal = () => {
    setShowThemeModal(true)
  }
  const closeThemeModal = () => {
    setShowThemeModal(false)
  }
    

  // ---------------------------- 비용 모달 open / close
  const openPriceModal = () => {
    setShowPriceModal(true)
  }
  const closePriceModal = () => {
    setShowPriceModal(false)
  }
  

  // ---------------------------- 적힌 콘텐트 텍스트 가져오기
  const onContentHandler = (e) => {
    setConent(e.target.value);
  };

  // ----------------------------- 장소 선택 취소
  const onRemovePlace = (place) =>{
    swal({
      title: "이 장소를 삭제할까요?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal('목록에서 삭제되었습니다', {
          icon: "success",
        });
        if(select&&select.length !==0){
          setFocus(select&&select[0].place_name)
        }        
        setSelect((pre)=>{
          const newSelect = pre.filter((v,i)=>{
            return place.place_name !== v.place_name
          })
          list(newSelect)
          return newSelect
        })
        setImgUrl((pre)=>{
          const imgUrlList = pre.filter((v,i)=>{
            return place.place_name !== v.place_name
          })
          return imgUrlList
        })
      } else {
        swal("삭제를 취소했습니다");
      }
    });
  }
  


  // ---------------------------- 첨부이미지 파일들 폼데이터로 담기
  const json = JSON.stringify(select)
  const blob = new Blob([json], { type: "application/json" })

  

  const formData = new FormData();
  formData.append("title", title)
  formData.append("content", content)
  formData.append("regionCategory", selectedRegion)
  formData.append("themeCategory", selectedTheme)
  formData.append("priceCategory", selectedPrice)
  formData.append("places", blob)
  imgs.forEach((v,i)=>{
    formData.append("imgUrl",v)
  })

  // formData.append(`${imgUrl[0]}`,)
  // localStorage.setItem('"token"') 
  // formData.append("imgUrl",imgs)

  

  for (let key of formData.keys()) {
    console.log(key, ":", formData.get(key));
  }
  
  

  // ---------------------------- 작성 완료 버튼
  const onHandlerSubmit = () =>{
    if (select.length === 0){
      swal("장소를 검색하고 선택해주세요!");
    } else if (selectedRegion.length === 0){
      swal("지역을 선택해주세요!");
    } else if (selectedTheme.length === 0){
      swal("테마를 선택해주세요!");
    } else if (selectedPrice.length === 0){
      swal("비용을 선택해주세요!");
    } else if (title.length === 0){
      swal("제목을 적어주세요!");
    } else if (imgs.length === 0){
      swal("사진을 첨부해주세요!");
    } else if (content.length < 10){
      swal("내용은 10자 이상 적어주세요!");
    } else if (selectedRegion.length !== 0 && selectedTheme.length !== 0 && selectedPrice.length !== 0 && select && content.length >= 10 && title && imgs.length !== 0){
      dispatch(addPostDB(formData))
    }
    
  }



  // ---------------------------- 서버로 보낼 데이터 콘솔에 찍어보기
  useEffect(()=>{
    console.log(
      "title:"+ title,
      "regionCategory:" +selectedRegion,
      "themeCategory:" +selectedTheme,
      "content:" +content,
      "priceCategory:" +selectedPrice,
      "place:" +select,
      "imgUrl" +imgs
      
    )
  },[content, select])




 

  const onClickHandler = (__place) => {
    setFocus(__place)
    console.log(__place)
    const searchList_wrap = document.getElementById('searchList_wrap')
    searchList_wrap.style.height='0px'
  }


  
  // ---------------------------- 카카오맵 불러오기
  useEffect(() => {
    // 지도에 검색하고 결과 나오게 하기
    // infowindow: 장소별 세부사항 보여주는 말풍선
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

    // 지도가 찍어주는 위치 
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 4,
    }
    const map = new kakao.maps.Map(myMap.current, options)

    const ps = new kakao.maps.services.Places()

    // 키워드 검색
    // place: 유저가 입력한 검색키워드
    ps.keywordSearch(place, placesSearchCB)



    
    // 검색이 완료됐을 때 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        // 검색으로 나온 목록을 for문 돌려서 지도에 마커로 찍기
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds)

        // 검색된 목록들의 하단에 페이지 번호(1,2,3..)를 보여주는 displayPagination() 추가
        displayPagination(pagination)
        // 검색된 목록(data)을 places 상태값 배열에 추가
        setPlaces(data)
      }
      // 검색 결과가 없을 경우
      else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        swal('검색 결과가 존재하지 않습니다.');
        return;
    }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      // 페이지 번호별 이동링크 달기
      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        // 현재 페이지 on설정 / 페이지 번호 클릭시 이동 설정
        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }
        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }


    // 마커찍기 함수
    function displayMarker(_place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(_place.y, _place.x),
      })
      // 마커 클릭시 장소 상세 말풍선 나오기
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + _place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }

  }, [place])

 
  
  // ---------------------------- 선택된 장소만 마커 찍어주기

    // 선택된 장소 목록이 들어있는 select 상태배열을 list 함수에 넣어줬다.
    const list = (positions) => {
      if (positions.length !==0 ){
        const options = {
          center: new kakao.maps.LatLng(positions[positions.length-1].y, positions[positions.length-1].x),
          level: 5,
        }
        const map = new kakao.maps.Map(myMap.current, options)
  
        for (var i = 0; i < positions.length; i ++) {
          // 마커를 생성
          var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new kakao.maps.LatLng(positions[i].y, positions[i].x),
              // position: positions[i].latlng, // 마커를 표시할 위치
              title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              place_name : positions[i].place_name
          });
          displayMarker(positions[i] ,i)          
      }
  
      // 마커찍기 함수
      function displayMarker(_place, i) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(_place.y, _place.x)
        })
        
        kakao.maps.event.addListener(marker, 'click', function () {
          var infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true })
          infowindow.setContent('<div style="padding:5px;font-size:12px;"> <b>'+ _place.place_name + '</b> <br/>' +  _place.address_name  + '<br/>' + _place.phone + '</div>')
          infowindow.open(map, marker)
          setFocus(_place.place_name)
          // const clickedFinPlace = document.getElementById(`finPlace${i}`)
          // clickedFinPlace.scrollIntoView({behavior:'smooth',block:'center'})
        })
      }
      } else {
        const options = {
          center: new kakao.maps.LatLng(37.5666805, 126.9784147),
          level: 4,
        }
        const map = new kakao.maps.Map(myMap.current, options)
      }


    }

    
    
  
    console.log(select)

  return (
    <>
      {/* 헤더 */}
      <div className='writeHeader'>
        <div className='writeHeaderWrap'>
          <div className='writeUpperHeader'>
            <div className='writePreIcon' onClick={onClickLeftArrow}>
              <img src={leftArrowBlack} alt="홈으로 이동"/>
            </div>

            <div className='writeSearchNresult'>
              {/* 검색창 */}
              <form className="inputForm" onSubmit={handleSubmit}>
                <input
                  placeholder="위치를 검색해주세요"
                  onChange={onChange}
                  value={inputText}
                />
                <button type="submit">
                  <img src={search} alt="검색 아이콘"/>
                </button>
              </form>

              {/* 검색목록*/}
              <div className='searchList_wrap' id='searchList_wrap' style={Places&&Places.length ? {height:'220px'}: {height:'0px', border:'none'}}>
                <div id="result-list">
                  {Places.map((item, i) => (
                    <label htmlFor={item.id} key={i}>
                    <div style={{ marginTop: '20px'}}>
                      <span>{i + 1}</span>
                      <div>
                        <h3>{item.place_name}</h3>
                        {item.road_address_name ? (
                          <div>
                            <span>{item.road_address_name}</span><br/>
                            <span>{item.address_name}</span>
                          </div>
                        ) : (
                          <span>{item.address_name}</span>
                        )}
                        <span>{item.phone}</span>
                      </div>
                      <div className='select'>
                        <input type="checkbox" value={item.id} id={item.id}
                        onChange={(e)=>{ onClickHandler(item.place_name)
                          if(e.target.checked){
                            setSelect((pre)=>{
                              const selectList = [...pre]
                              const newData = {...Places[i], imgCount:""}
                              selectList.push(newData)
                              list(selectList)
                              return selectList
                            })
                            setImgUrl((pre)=>{
                              const imgUrlList = [...pre]
                              const newData = {place_name:item.place_name, imgUrl:[]}
                              imgUrlList.push(newData)
                              dispatch(addImg(imgUrlList))
                              return imgUrlList
                            })

                          }
                          else{
                            setFocus(select[0].place_name)
                            setSelect((pre)=>{
                              const selectList = pre.filter((v,i)=>{
                                return item.place_name !== v.place_name
                              })
                              list(selectList)
                              return selectList
                            })
                            setImgUrl((pre)=>{
                              const imgUrlList = pre.filter((v,i)=>{
                                return item.place_name !== v.place_name
                              })
                              return imgUrlList
                            })
                          }
                        }} style={{display:'none'}}/>
                      </div>
                      
                      {/* <div style={{width:'60px', background:'#ddd', textAlign:'center',marginTop:'5px', cursor:'pointer', borderRadius:'3px'}}
                      
                      >선택하기</div> */}
                      </div>
                      </label>
                    
                  ))}
                  
                  <div id="pagination"></div>
                </div>
              </div>
            </div>
          </div>

          <div className='writeLowerHeader'>
            <div className='modalButtons'>

              {/* 지역선택 */}
              <div className='regionButton'onClick={openRegionModal}>
              {selectedRegion?
                <div className='modalChoiceTitle'>🗺 {selectedRegion&&selectedRegion}</div>
                :
                <div className='modalChoiceTitle'>🗺 지역 선택</div>
                }
                
                <div className='regions'>
                  <RegionModal region={region} selectedRegion={selectedRegion} setRegion={setRegion}
                  showRegionModal={showRegionModal}
                  closeRegionModal={closeRegionModal}
                  />
                </div>  
              </div>

              {/* 테마선택 */}
              <div className='themeButton' onClick={openThemeModal}>
                  {
                    selectedTheme.length === 0 ?
                    <div className='modalChoiceTitle'>
                      ⛱ 테마 선택
                    </div>
                    :
                    selectedTheme.length === 1 ?
                    <div className='modalChoiceTitle'>
                      ⛱ {selectedTheme[0]}
                    </div>
                    :
                    selectedTheme.length > 1 ?
                    <div className='modalChoiceTitle'>
                      ⛱ 테마 {selectedTheme.length-1}개
                    </div>
                    :
                    null
                  }
                <div className='themes'>
                    <ThemeModal theme={theme} selectedTheme={selectedTheme} setTheme={setTheme}
                    showThemeModal={showThemeModal}
                    closeThemeModal={closeThemeModal}
                    />
                </div>    
              </div>

              {/* 비용선택 */}
              <div className='priceButton'
              onClick={openPriceModal}>
                {selectedPrice ?
                <div className='modalChoiceTitle'>💸 {selectedPrice&&selectedPrice}</div>
                :
                <div className='modalChoiceTitle'>💸 비용 선택</div>
                }
                
                  <div className='prices'>
                    <PriceModal price={price} selectedPrice={selectedPrice} setPrice={setPrice}
                    showPriceModal={showPriceModal}
                    closePriceModal={closePriceModal}
                    />
                  </div>    
              </div>

              {/* 일정선택 */}
              <div className='calendarButton'
              onClick={openPriceModal}>
                {/* {selectedPrice ?
                <div className='modalChoiceTitle'>{selectedPrice&&selectedPrice}</div>
                :
                <div className='modalChoiceTitle'>비용 선택</div>
                } */}
                <div className='modalChoiceTitle'>🗓 일정 선택</div>
                <div className='calendars'>
                  <PriceModal price={price} selectedPrice={selectedPrice} setPrice={setPrice}
                  showPriceModal={showPriceModal}
                  closePriceModal={closePriceModal}
                  />
                </div>    
              </div>
            </div>
          </div>
        </div>
        {/* 카카오맵 */}
        <div className='writeMapWrap'
          ref={myMap}>
        </div>
      </div>


      
      
      

      {/* 움직이는 부분 */}
      <div className='contentWrap'>
        
        {/* 제목 */}
        <div className='writeTitleWrap'>
          <input type="text" onChange={onTitleHandler} defaultValue={editdata&&editdata.title} placeholder="코스 이름을 적어주세요"/>
        </div>

        {/* 검색하고 선택한 장소가 없을 때 */}
        {select.length === 0 ?
        <div className='sectionWrap'>
          {/* 바뀌는 부분 */}
          <div className='sectionPerPlace'>
            <div className="sectionPerPlaceWrap">        
              {/* 사진업로드 */}
              <div className='imgUpload'>
                {/* 사진업로드하는 장소 이름 */}
                <div className='imgUploadHeader'>
                  <div className='imgUploadTitle'>
                    <img src={logosky} alt="야너갈 로고"/>
                    장소를 검색해주세요!
                  </div>
                </div>
              </div>
            </div>
          </div>  

          {/* 텍스트 입력 */}
          <div className='writeTxt'
          >
            <textarea placeholder="아직 선택된 장소가 없어요!" defaultValue={editdata&&editdata.content} onChange={onContentHandler}/>
          </div>
          <button className='writeSubmit' onClick={onHandlerSubmit}> 작성 완료하기</button>
        </div> 

        :
        
        focus&&focus.length !== 0 ?
        <div className='sectionWrap'>
        {/* 검색해서 장소를 선택했고 핀을 클릭했을 때 */}
          {/* 바뀌는 부분 */}
          <div className='sectionPerPlace' >
            {select&&select.map((l,j)=>{
              return(
                <div className="sectionPerPlaceWrap" key={j} 
                style={focus === l.place_name ? {display:"block"} : {display:'none'}}
                >        
                  {/* 사진업로드 */}
                  <div className='imgUpload'>
                    {/* 사진업로드하는 장소 이름 */}
                    <div className='imgUploadHeader'>
                      <div className='imgUploadTitle'>
                        <img src={logosky} alt="야너갈 로고"/>
                        {l.place_name}
                      </div>
                      <div className='removePlaceButton'
                      onClick={()=>{onRemovePlace(l)}}
                      >
                        <img src={trashwhite} alt="장소 삭제 버튼"/>
                        이 장소 삭제
                      </div>    
                    </div>
                    <ImageSlide select={select} setSelect={setSelect} imgUrl={imgUrl} setImgUrl={setImgUrl} setImgs={setImgs} imgs={imgs} l={l} j={j}
                    focus={focus}
                  />
                  </div>
                  
                </div>
              )
            })}
          </div>  

          {/* 텍스트 입력 */}
          <div className='writeTxt'>
            <textarea placeholder="코스에 대한 설명을 입력해주세요" defaultValue={editdata&&editdata.content} onChange={onContentHandler}/>
          </div>

          <button className='writeSubmit' onClick={onHandlerSubmit}
          
          >작성 완료하기</button>
        </div> 
            
        :

        <div className='sectionWrap'>
          {/* 검색해서 장소를 선택했지만 핀을 클릭하지 않았을 때 */}
          {/* 바뀌는 부분 */}
          <div className='sectionPerPlace'>
            <div className="sectionPerPlaceWrap">        
              {/* 사진업로드 */}
              <div className='imgUpload'>
                {/* 사진업로드하는 장소 이름 */}
                <div className='imgUploadHeader'>
                  <div className='imgUploadTitle'>
                    <img src={logosky} alt="야너갈 로고"/>
                    {select&&select[0]&&select[0].place_name}
                  </div>
                  <div className='removePlaceButton'
                  onClick={()=>{onRemovePlace(select&&select[0])}}
                  >
                    <img src={trashwhite} alt="장소 삭제 버튼"/>
                    이 장소 삭제
                  </div>    
                </div>
                <ImageSlide select={select} setSelect={setSelect} imgUrl={imgUrl} setImgUrl={setImgUrl} setImgs={setImgs} imgs={imgs} l={select[0]&&select[0]} j={0}
                 focus={focus}
                  />
              </div>
            </div>
          </div>  

          {/* 텍스트 입력 */}
          <div className='writeTxt'
          >
            <textarea placeholder="코스에 대한 설명을 입력해주세요" defaultValue={editdata&&editdata.content} onChange={onContentHandler}/>
          </div>
          <button className='writeSubmit' onClick={onHandlerSubmit}
          >작성 완료하기</button>
        </div> 
        
        
        }
        
                   

        {/* 검색목록과 선택한 목록 */}
        {/* <div className='selectNselected'>
          <div className='selectedList'>
            {select.map((item, i) => (
              <div className='selected' id={`finPlace${i}`} key={i}
                style={focus === item.place_name ? {background:'#B6DCFF', color:'#fff'}:{background:'rgba(255, 255, 255, 0.85)', color:'#222'}}
                
              >
                <input type="radio" name="selectedPlace" value={item.place_name} id={item.place_name}
                onChange={isFocusedPlace}/>
                <label htmlFor={item.place_name}>
                  <div style={{ marginTop: '5px'}} 
                  >
                    <div>
                      <h3>{item.place_name}</h3>
                      <span>{item.phone}</span>
                    </div>

                  </div>
                </label>
              </div>
              ))}
          </div>
        </div>  */}
      </div>
    </>
  )
}

export default MapContainer