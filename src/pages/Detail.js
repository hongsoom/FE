import React, { useEffect, useState, useRef } from 'react'
import '../css/mapContainer.css'


// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faBookmark} from '@fortawesome/free-regular-svg-icons'

// 카카오맵
const { kakao } = window


const Detail = ({ searchPlace }) => {

  // 맵 담는 ref
  const myMap = useRef();

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    // var markers = []
    // const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
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

  return (
    <div className='map_wrap'>
      <div
        ref={myMap}
        style={{
          width:'100vw',
          height: '100vh',
          position: 'relative',
          overflow:'hidden'
        }}
      ></div>
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
        <div className='profilePic'>
          
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

      <div className='menu_wrap'>
        <div id="result-list">
          {Places.map((item, i) => (
            <div key={i} style={{ marginTop: '20px' }}>
              <span>{i + 1}</span>
              <div>
                <h5>{item.place_name}</h5>
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
            </div>
          ))}
          <div id="pagination"></div>
        </div>
      </div>
    </div>
  )
}

export default Detail