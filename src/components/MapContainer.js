import React, { useEffect, useState, useRef } from 'react'
import '../css/mapContainer.css'
import ImageSlide from './ImageSlide'


// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faBookmark} from '@fortawesome/free-regular-svg-icons'


// 카카오맵
const { kakao } = window


const MapContainer = ({ searchPlace }) => {

  // 맵 담는 ref 
  const myMap = useRef();

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  // console.log(Places)
  
  // 선택한 장소 배열에 담아줌
  const [select, setSelect] = useState([])  
  // console.log(select)

  const [marker, setMarker] = useState([])


  
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
    }
  

    // const selec = (Places) => {
    //     const options = {
    //       center: new kakao.maps.LatLng(Places.y, Places.x),
    //       level: 4,
    //     }
    //     const map = new kakao.maps.Map(myMap.current, options)
        
    //     const marker = new kakao.maps.Marker({
    //       map: map,
    //       position: new kakao.maps.LatLng(Places.y, Places.x),
    //     })
    //     var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    //     kakao.maps.event.addListener(marker, 'click', function () {
    //       infowindow.setContent('<div style="padding:5px;font-size:12px;">' + Places.place_name + '</div>')
    //       infowindow.open(map, marker)
    //     })
    // }

  


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
          제목
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
          <div className='menu_wrap' style={Places.length !== 0 ? {display:'block'}: {display:'none'}}>
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
                        // setPlaces([])
                      } 
                    }} style={{display:'none'}}/>
                  </div>
                  <label htmlFor={item.id}>
                  <div style={{width:'60px', background:'#ddd', textAlign:'center',marginTop:'5px', cursor:'pointer'}}>선택하기</div>
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

                  {/* <div className='select'>
                    <input type="checkbox" value={item.id} id={item.id}
                    onChange={(e)=>{
                      if(e.target.checked){
                        setSelect((pre)=>{
                          const selectList = [...pre]
                          selectList.push(Places[i])
                          list(selectList)
                          return selectList
                        })
                        setPlaces([])
                      } 
                    }} style={{display:'none'}}/>
                  </div>
                  <label htmlFor={item.id}>
                  <div style={{width:'60px', background:'#ddd', textAlign:'center',marginTop:'5px', cursor:'pointer'}}>선택하기</div>
                  </label> */}

                </div>
              </div>
              ))}
          </div>
        </div> 


        {/* 사진업로드 */}
        <ImageSlide/>
      </div>
  </div>
  )
}

export default MapContainer