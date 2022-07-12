import React, { useEffect, useState, useRef } from 'react'
import '../css/detail.css'

import Comment from "../components/comment/Comment"

import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import {getPostDB} from '../redux/module/post'

// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faBookmark} from '@fortawesome/free-regular-svg-icons'


// 카카오맵
const { kakao } = window

const Detail = () => {
  const dispatch = useDispatch();
  const param = useParams().id;
  const [points, setPoints] = useState([])
  const myMap = useRef();

  
  // 선택한 장소 이미지미리보기 url 넣을 배열
  const [imgUrl, setImgUrl] = useState([])

  // 게시글 아이디로 내용 불러오기
  useEffect(()=>{
    dispatch(getPostDB(param))
  },[dispatch])
  
  const data = useSelector(state=>state.post.post)
  console.log(data&&data)

  


  
  // ----------------------- 첫 로딩 카카오맵 초기 상태
  useEffect(() => {

    const mapOption = { 
      center: new kakao.maps.LatLng(data && toString(data.post.body.place[0].y), data && toString(data.post.body.place[0].x)), // 지도의 중심좌표
      level: 6 // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(myMap.current, mapOption); // 지도를 생성합니다


    data && data.post.body.place.map((v,i)=>{
      return(
        points.push({y:v.y, x: v.x, place_name:v.place_name, phone:v.phone})
      )
    })

    list(points)

  }, [dispatch])


  // ----------------------- 카카오맵에 장소 핀 꽂아 보여주기
  const list = (positions) => {
    if (positions.length !==0 ){
      const options = {
        center: new kakao.maps.LatLng(positions[positions.length-1].y, positions[positions.length-1].x),
        level: 5,
      }
      const map = new kakao.maps.Map(myMap.current, options)

      
      const bounds = new kakao.maps.LatLngBounds();
  
      points.forEach(point => {
        bounds.extend(new kakao.maps.LatLng(point.lat, point.lng))
      });


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
        marker.setMap(map);
    }

      // 마커찍기 함수
      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x)
        })
        
        kakao.maps.event.addListener(marker, 'click', function () {
          var infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true })
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name +  '<br/>' + place.phone + '</div>')
          infowindow.open(map, marker)
        })
      }
      }
        else {
        const options = {
          center: new kakao.maps.LatLng(37.5666805, 126.9784147),
          level: 4,
        }
        const map = new kakao.maps.Map(myMap.current, options)

      }
      
    }


  
 
  


  return (
    <>
      {/* 헤더 */}
      <div className='detailHeader'>
        <div className='preIcon'>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </div>
        <div className='title'>
          {data && data.post.body.title}
        </div>
        <div className='heart'>
          <FontAwesomeIcon icon={faHeart} style={{marginRight:'5px'}}/>
          777
        </div>
        <div className='bookmark'>
          <FontAwesomeIcon icon={faBookmark}/>
        </div>
      </div>


      {/* 지도 */}
      <div className='map_wrap'
        ref={myMap}
        style={{
          width:'100vw',
          height: '50vh',
          position: 'absolute'
        }}
      >
      </div>

      {/* 프로필 / 장소목록 / 사진슬라이드 / 댓글 */}
      <div className='contentsWrap'>
        <div className='profile'>
          <div className='profilePic'>
            
          </div>
          <div className='txtWrap'>
            <div className='nick'>
              닉네임
            </div>
            <div className='themeNprice'>
                <div className='regionCategory'>
                  {data && data.post.body.regionCategory}
                </div>
                  {data && data.post.body.themeCategory.map((v,i)=>{
                    return(
                      <div className='themeCategory' key={i}>
                        {v.themeCategory}
                      </div>
                    )
                  })}
                <div className='priceCategory'>
                  {data && data.post.body.priceCategory}
                </div>
              </div>
          </div>
        </div>  

        {/* 검색목록과 선택한 목록 */}
          <div className='placeList'>
            {data && data.post.body.place.map((item, i) => (
              <div className='selectedPlace' key={i}>
                <div style={{ marginTop: '10px'}}>
                  <h3>{i + 1}. {item.place_name}</h3>
                  {item.road_address_name ? (
                    <div>
                      <span>{item.road_address_name}</span><br/>
                      {/* <span>{item.address_name}</span> */}
                    </div>
                  ) : (
                    <span>{item.address_name}</span>
                  )}
                  <span>{item.phone}</span>
                </div>
              </div>
              ))}
          </div>

          {/* 사진업로드 */}
          <div className='imgSlide'>
            {/* <DetailImageSlide data={data}/> */}
          </div>

          <div className='txtPlace'>
            {data && data.post.body.content}
          </div>

          <div className='commentPlace'>
            <Comment/>
          </div>
          
        </div> 
        
      </>
  )
}

export default Detail