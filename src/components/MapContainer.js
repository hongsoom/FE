import React, { useEffect, useState, useRef } from 'react'
import '../css/mapContainer.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faBookmark} from '@fortawesome/free-regular-svg-icons'



const { kakao } = window

const MapContainer = ({ searchPlace }) => {

  const myMap = useRef();

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  console.log(Places)
  
  // 선택한 장소 배열에 담아줌
  const [select, setSelect] = useState([])  
  console.log(select)

  const [marker, setMarker] = useState([])


  // 선택된 장소 핀 리스트
  // const markerdata = [
  //   {
  //     title: "콜드스퀘어",
  //     lat: 37.62197524055062,
  //     lng: 127.16017523675508,
  //     }
  // ]

  



  
  
  useEffect(() => {

    // 1. 지도에 검색하고 결과 나오게 하기
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    // var markers = []
    // const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 4,
    }
    const map = new kakao.maps.Map(myMap.current, options)

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchPlace, placesSearchCB)



    

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
        setPlaces(data)
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

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

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


    // 마커찍기
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }



  }, [searchPlace])

  
    const list = (positions) => {
      // console.log(positions)
      // console.log(positions[positions.length-1].x, positions[positions.length-1].y)

      const options = {
        center: new kakao.maps.LatLng(positions[positions.length-1].y, positions[positions.length-1].x),
        level: 4,
      }
      const map = new kakao.maps.Map(myMap.current, options)
  

      for (var i = 0; i < positions.length; i ++) {
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(positions[i].y, positions[i].x),
            // position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            place_name : positions[i].place_name
        });
        displayMarker(positions[i])
        
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      })
      
      kakao.maps.event.addListener(marker, 'click', function (e) {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true })
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        
        infowindow.open(map, marker)
        console.log(marker, e)
      })
    }
        

    }
  
    const selec = (Places) => {
        const options = {
          center: new kakao.maps.LatLng(Places.y, Places.x),
          level: 4,
        }
        const map = new kakao.maps.Map(myMap.current, options)
        
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(Places.y, Places.x),
        })
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        kakao.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + Places.place_name + '</div>')
          infowindow.open(map, marker)
        })
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
      <div className='profile'>
        <div className='pic'>

        </div>
        <div className='txtWrap'>
          <div className='nick'>
            닉네임
          </div>
          <div className='themeNprice'>
            <div className='tagList'>
              <div className='tag'>
                서울
              </div>
            </div>
            <div className='price'>
              30만원대
            </div>
          </div>
        </div>
      </div>  
        
      <div className='menu_wrap' style={Places.length !== 0 ? {display:'block'}: {display:'none'}}>
        <div id="result-list">
          {Places.map((item, i) => (
            <div key={i} style={{ marginTop: '20px' }}
            onClick={()=>{
              selec(Places[i])
            }}>
              <span>{i + 1}</span>
              <div>
                <h3>{item.place_name}</h3>
                {item.road_address_name ? (
                  <div>
                    <span>{item.road_address_name}</span>
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
                    setPlaces([])
                    console.log(select)
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
    </div>
  )
}

export default MapContainer