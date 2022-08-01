import React, { useRef } from "react";

// 카카오맵
const { kakao } = window;
// 선택된 장소 목록이 들어있는 data.place 배열을 list 함수에 넣어준다.
const SelectedList = ({positions}) => {
  const myMap = useRef();

  function list(positions){

    if (positions && positions.length !== 0) {
      let bounds = new kakao.maps.LatLngBounds();
      const options = {
        center: new kakao.maps.LatLng(
          positions[positions.length - 1].y,
          positions[positions.length - 1].x
        ),
        level: 7,
      };
      const map = new kakao.maps.Map(myMap.current, options);
  
  
      for (var i = 0; i < positions.length; i++) {
        // 마커를 생성
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(positions[i].y, positions[i].x),
          // position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title,
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
          title: _place.place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });
  
        kakao.maps.event.addListener(marker, "click", function () {
          var infowindow = new kakao.maps.InfoWindow({
            zIndex: 1,
            removable: true,
          });
          infowindow.setContent(
            '<div style="display:flex;justify-content:center;"><div style="padding-left:15px;padding-right:15px;height:100px;font-size:12px;display:flex;flex-direction:column;justify-content:center;">' +
            _place.place_name +
            "<br/>" +
            _place.phone +
            "<br/>" +
            `<a href=${_place.place_url} style="color:blue" target="_blank">자세히 알아보기</a></div></div>`
          );
          infowindow.open(map, marker);
          // setFocus(_place.place_name);
        });
      }
    } else {
      const options = {
        center: new kakao.maps.LatLng(37.5666805, 126.9784147),
        level: 4,
      };
      const map = new kakao.maps.Map(myMap.current, options);
    }

  }
  
  
}
export default SelectedList