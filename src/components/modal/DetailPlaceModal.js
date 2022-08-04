import React from "react";
import "../../css/placeModal.scss"

// 카카오맵
const { kakao } = window

const DetailPlaceModal = (props) => {
  const {showPlaceModal, closePlaceModal, data, setFocus, myMap} = props

  // 선택한 장소 핀찍기
  const panTo= (place, list) =>{
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 4,
    }
    const map = new kakao.maps.Map(myMap&&myMap.current, options)
    const markerPosition  = new kakao.maps.LatLng(place.y, place.x);
    map.panTo(markerPosition);   
    
    const marker = new kakao.maps.Marker({
      position: markerPosition
  });
    marker.setMap(map);

    for (var i = 0; i < list.length; i++) {
      // 마커를 생성
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(list[i].y, list[i].x),
        // position: positions[i].latlng, // 마커를 표시할 위치
        title: list[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        place_name: list[i].place_name,
      });
      const onePlace = list[i]
      kakao.maps.event.addListener(marker, "click", function () {
        var infowindow = new kakao.maps.InfoWindow({
          zIndex: 1,
          removable: true,
        });
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;"> <b>' +
          onePlace.place_name +
          "</b> <br/>" +
          onePlace.address_name +
          "<br/>" +
            onePlace.phone +
          "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }

  const onFocusPlaceHandler = (v) => {
    setFocus(v.place_name)
    panTo(v, data.place)
    closePlaceModal()
  }
  
  return(
    <div className={showPlaceModal ? 'openModal placeWrap' : 'placeWrap'}>
      {showPlaceModal ?
      <div className='background' onClick={closePlaceModal}>
        <div className='place_wrap' onClick={e => e.stopPropagation()}>
          <section>
            <div className="modalTitle">{data&&data.nickname}님의 추천 장소</div>
            <div className="placesWrap">
            {data&&data.place.map((v,i)=>{
              return(
                <div className="selectedPlaceDetail" key={i}
                onClick={()=>{onFocusPlaceHandler(v)}}
                >
                  <div className="selectedPlaceName">📍{v.place_name}</div>
                  <div className="selectedPlaceAddress">{v.address_name}</div>
                </div>  
              )
            })}
          </div>
            
            <div className="buttons">
              <div className="doneButton">
                <button className="close" onClick={closePlaceModal}>확인</button>
              </div>
            </div>  
          </section>
      </div>
      </div> : null}
    </div>
  )
}
export default DetailPlaceModal