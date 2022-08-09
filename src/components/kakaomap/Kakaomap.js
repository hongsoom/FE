import React, { useEffect } from 'react'
import swal from 'sweetalert';
import '../../css/kakaomap.scss'


const Kakaomap = (props) => {
  const {kakao, myMap, setPlaces, place } = props

  useEffect(()=>{
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 4,
    }
    const map = new kakao.maps.Map(myMap.current, options)
    
    return()=> {
      const options = {
        center: new kakao.maps.LatLng(37.5666805, 126.9784147),
        level: 4,
      }
    }
  },[])
  
  useEffect(()=>{
    
      const ps = new kakao.maps.services.Places()
      
      // 키워드 검색
      // place: 유저가 입력한 검색키워드
      ps.keywordSearch(place, placesSearchCB)
      
      // 검색이 완료됐을 때 호출되는 콜백함수
      function placesSearchCB(data, status, pagination) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) { 
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
      
  },[kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.LatLngBounds, kakao.maps.Map, kakao.maps.Marker, kakao.maps.event, kakao.maps.services.Places, kakao.maps.services.Status.OK, kakao.maps.services.Status.ZERO_RESULT, myMap, place, setPlaces])
 


  function onGeolocation(){
    // GeoLocation
    if (navigator.geolocation) {
      const options = {
        center: new kakao.maps.LatLng(37.5666805, 126.9784147),
        level: 4,
      };
      const map = new kakao.maps.Map(myMap.current, options);
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
          
          var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도
          
          var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
          
          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message);
              
        });
      
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
            message = 'geolocation을 사용할수 없어요..'
            
        displayMarker(locPosition, message);
    }
    
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
    
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({  
            map: map, 
            position: locPosition
        }); 
        
        var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;
    
        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });
        
        // 인포윈도우를 마커위에 표시합니다 
        infowindow.open(map, marker);
        
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);      
    }    
    }
 
  return(
    <div className='writeMapWrap' ref={myMap}>
      <div className='geolocation' onClick={onGeolocation} style={{position:'absolute',bottom:'10px',right:'10px',background:'#8ACEFF', width:'50px', height:'50px',borderRadius:'100px', zIndex:'99'}}></div>
    </div>
  )
}

export default Kakaomap