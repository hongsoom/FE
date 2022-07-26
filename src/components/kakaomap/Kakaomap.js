import React, { useEffect } from 'react'
import swal from 'sweetalert';
import '../../css/kakaomap.scss'


const Kakaomap = (props) => {
  const {kakao, myMap, setPlaces, place} = props
  
  useEffect(()=>{

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
  
  
  },[place])

  return(
    <div className='writeMapWrap' ref={myMap}>
    </div>
  )
}

export default Kakaomap