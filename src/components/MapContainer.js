import React, { useEffect, useState, useRef } from 'react'
import '../css/mapContainer.css'
import ImageSlide from './ImageSlide'

import {useDispatch, useSelector} from 'react-redux'
import {addPostDB} from '../redux/module/post'

// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faBookmark} from '@fortawesome/free-regular-svg-icons'


// 카카오맵
const { kakao } = window


const MapContainer = ({ searchPlace }) => {

  const dispatch = useDispatch();

  const region = ['서울','대전','경기','세종','인천','대구','강원도','울산','충청도','광주','전라도','부산','경상도','제주도']
  const theme = ['힐링','먹방','애견동반','액티비티','호캉스']
  const price = ['10만원 이하', '10만원대', '20만원대','30만원대','40만원대','50만원 이상']


  

  // 맵 담는 ref 
  const myMap = useRef();
  // 제목 담는 ref
  const title = useRef();

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  
  // 선택한 장소 배열에 담아줌
  const [select, setSelect] = useState([])  

  // 선택한 베스트 화장실 선택
  const[selectedRestroom, setRestroom] = useState();
  const isCheckedRestroom = (e) =>{
    if (e.target.checked){
      setRestroom(e.target.value)
    }
  }

  // 첨부이미지 파일들 담아줌 (파일 자체 배열)
  const [imgFile, setImgFile] = useState([]);

  // 첨부이미지 파일들 폼데이터로 담기
  const formData = new FormData();
  for(let i=0; i<imgFile.length; i++){
    formData.append("imgUrl",imgFile[i]);
  }
  
 
  // 지역 선택
  const [selectedRegion, setRegion] = useState();
  const isChecked = (e) =>{
    if (e.target.checked){
      setRegion(e.target.value)
    }
  }

  // 테마 선택
  const [selectedTheme, setTheme] = useState([]);

  // 비용 선택
  const [selectedPrice, setPrice] = useState();
  const isCheckedPrice = (e) =>{
    if (e.target.checked){
      setPrice(e.target.value)
    }
  }

  // 텍스트 내용
  const txt = useRef();


  // 작성 완료 버튼
  const onHandlerSubmit = () =>{

    dispatch(addPostDB({
      title : title.current.value,
      content : txt.current.value,
      restroom: selectedRestroom,
      regionCategory: selectedRegion,
      themeCategory: selectedTheme,
      priceCategory: selectedPrice,
      imgUrl: formData
    }))
  }
  

    


  
  useEffect(() => {

    

    // 1. 지도에 검색하고 결과 나오게 하기
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
    // searchPlace: 유저가 입력한 검색키워드
    ps.keywordSearch(searchPlace, placesSearchCB)



    
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
        alert('검색 결과가 존재하지 않습니다.');
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
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })
      // 마커 클릭시 장소 상세 말풍선 나오기
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }

  }, [searchPlace])



  // 이하는 useEffect 바깥에 위치한 함수들


    // 선택된 장소만 마커 찍어주기
    // 선택된 장소 목록이 들어있는 select 상태배열을 list 함수에 넣어줬다.
    const list = (positions) => {
      if (positions.length !==0 ){
        const options = {
          center: new kakao.maps.LatLng(positions[positions.length-1].y, positions[positions.length-1].x),
          level: 4,
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
          displayMarker(positions[i])
          
      }
  
      // 마커찍기 함수
      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x)
        })
        
        kakao.maps.event.addListener(marker, 'click', function () {
          var infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true })
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
          infowindow.open(map, marker)
        })
      }
      } else{
        const options = {
          center: new kakao.maps.LatLng(37.5666805, 126.9784147),
          level: 4,
        }
        const map = new kakao.maps.Map(myMap.current, options)

      }
      
    }

  


  return (
    <div className='map_wrap'>
      <div
        ref={myMap}
        style={{
          width:'100vw',
          height: '100vh',
          position: 'absolute'
        }}
      >
      </div>
      
      {/* 헤더 */}
      <div className='detailHeader'>
        <div className='preIcon'>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </div>
        <div className='title'>
          <input type="text" ref={title}/>
        </div>
        <div className='heart'>
          <FontAwesomeIcon icon={faHeart} style={{marginRight:'5px'}}/>
          777
        </div>
        <div className='bookmark'>
          <FontAwesomeIcon icon={faBookmark}/>
        </div>
      </div>
      


      <div className='contentWrap'>
        {/* 검색목록과 선택한 목록 */}
        <div className='selectNselected'>
        {/* 검색목록*/}
          <div className='searchList_wrap' style={Places.length !== 0 ? {display:'block'}: {display:'none'}}>
            <div id="result-list">
              {Places.map((item, i) => (
                <div key={i} style={{ marginTop: '20px' }}>
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
                    onChange={(e)=>{
                      if(e.target.checked){
                        setSelect((pre)=>{
                          const selectList = [...pre]
                          selectList.push(Places[i])
                          list(selectList)
                          return selectList
                        })
                      } else{
                        setSelect((pre)=>{
                          const selectList = pre.filter((v,i)=>{
                            return item.place_name !== v.place_name
                          })
                          list(selectList)
                          return selectList
                        })
                      }
                    }} style={{display:'none'}}/>
                  </div>
                  <label htmlFor={item.id}>
                  {select.includes(item)?  
                  <div style={{width:'60px', background:'skyblue', textAlign:'center',marginTop:'5px', cursor:'pointer'}}>취소하기</div>
                  :
                  <div style={{width:'60px', background:'#ddd', textAlign:'center',marginTop:'5px', cursor:'pointer'}}>선택하기</div>
                  }
                  </label>
                </div>
              ))}
              
              <div id="pagination"></div>
            </div>
          </div>
          
          <div className='selectedList'>
            {select.map((item, i) => (
              <div className='selected' key={i}>
                <div style={{ marginTop: '10px' }}>
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

                </div>
              </div>
              ))}
          </div>
        </div> 
      
        {/* 화장실 */}
        <div className='restroom' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          <div className='restroomWrap'>
            {select.map((v,i)=>{
              return(
                <div className='selectBestRestroom' key={i}
                style={selectedRestroom === v.place_name ? {background:'skyblue'}: {border:'1px solid #ccc'}}>
                  <input type="radio" name="restroom" value={v.place_name} id={v.place_name}
                  onChange={isCheckedRestroom}/>
                  <label htmlFor={v.place_name}>
                  {v.place_name}
                  </label>
                </div>
              )
            })}
          </div>            
        </div>


        {/* 지역선택 */}
        <div className='region' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          <div className='regionWrap'>
          {region.map((v,i)=>{
            return(
              <div className='regions' key={i}
              style={selectedRegion === v ? {background:'skyblue'}: {border:'1px solid #ccc'}}>
                <input type="radio" name="region" value={v} id={v}
                onChange={isChecked}/>
                <label htmlFor={v}>
                  {v}
                </label>
              </div>
            )
          })}
          </div>
        </div>

        {/* 테마선택 */}
        <div className='theme' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          <div className='themeWrap'>
          {theme.map((v,i)=>{
            return(
              <div className='themes' key={i}
              style={selectedTheme.includes(v) ? {background:'skyblue', border:'1px solid #ccc'}: {border:'1px solid #ccc'}}>
                <input type="checkbox" name="theme" value={v} id={v}
                onChange={(e)=>{
                  if (e.target.checked){
                  setTheme((pre)=>{
                    const newData=[...pre];
                    newData.push(v)
                    return newData
                  })
                   }else{
                    setTheme((pre)=>{
                      const newData = pre.filter((l,i)=>{
                        return l !== v
                        })
                        return newData
                    })
                   }
                  }}
                />
                <label htmlFor={v}>
                  {v}
                </label>
              </div>
            )
          })}
         </div>
        </div>

        {/* 비용선택 */}
        <div className='price' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          <div className='priceWrap'>
          {price.map((v,i)=>{
            return(
              <div className='prices' key={i}
              style={selectedPrice === v ? {background:'skyblue',border:'1px solid #ccc'}: {border:'1px solid #ccc'}}>
                <input type="radio" name="price" value={v} id={v}
                onChange={isCheckedPrice}/>
                <label htmlFor={v}>
                  {v}
                </label>
              </div>
            )
          })}
          </div>
        </div>

        {/* 사진업로드 */}
        <div style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          <ImageSlide setImgFile={setImgFile}/>
        </div>

        {/* 텍스트 입력 */}
        <div className='txt' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          <textarea placeholder='내용을 입력해주세요' ref={txt}/>
        </div>

        <button className='submit' onClick={onHandlerSubmit}
        style={select.length !==0 && selectedRegion && selectedTheme ? {display:'block'}: {display:'none'}}
        >작성완료</button>
      </div>
  </div>
  )
}

export default MapContainer