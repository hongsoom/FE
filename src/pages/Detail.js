import React, { useEffect, useState, useRef, useMemo } from 'react'
import '../css/detail.css'

import DetailImageSlide from '../components/DetailImageSlide'

import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom";
import {addPostDB} from '../redux/module/post'

// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faBookmark} from '@fortawesome/free-regular-svg-icons'


// 카카오맵
const { kakao } = window




const Detail = () => {

  // 선택한 장소 이미지미리보기 url 넣을 배열
  const [imgUrl, setImgUrl] = useState([])
  console.log(imgUrl)

  // const postId = useParams().id;
  // const data = useSelector((state) => state.post.posts);
  // console.log(data);
  // const nowPost = data && data.filter((v, i) => String(postId) === v._id);

  const initialState = {
    title : 'title',
    content : '게시글 내용 입니다',
    regionCategory : '서울',
    themeCategory : ['힐링','맛집','애견동반'],
    priceCategory : '10만원대',
    place: [
      {
       addressName:'서울 마포구 합정동 363-28',
       categoryGroupCode:'CE7',
       categoryGroupName:'카페',
       categoryName: '음식점 > 카페',
       distance:'',
       files: [],
       id:'447132083',
       phone: '070-4192-0378',
       placeName: '어반플랜트 합정',
       placeUrl: 'http://place.map.kakao.com/447132083',
       roadAddressName: '서울 마포구 독막로4길 3',
       x: '126.91718810093374',
       y: '37.547894169649254',
      },
      {
        addressName:'서울 마포구 합정동 357-6',
        categoryGroupCode:'CE7',
        categoryGroupName:'카페',
        categoryName: '음식점 > 카페 > 커피전문점',
        distance:'',
        files: [],
        id:'12518512',
        phone: '02-336-7850',
        placeName: '앤트러사이트 합정점',
        placeUrl: 'http://place.map.kakao.com/12518512',
        roadAddressName: '서울 마포구 토정로5길 10',
        x: '126.918435148767',
        y: '37.5458137305902',
       }
    ],
    restroom: '어반플랜트 합정',
    }
  

  const [points, setPoints] = useState([])

  const dispatch = useDispatch();


  const myMap = useRef();

  console.log(initialState.place)


  

  
  useEffect(() => {

    const mapOption = { 
      center: new kakao.maps.LatLng(initialState.place[0].y, initialState.place[0].x), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(myMap.current, mapOption); // 지도를 생성합니다


    initialState.place.map((v,i)=>{
      points.push({y:v.y, x: v.x, place_name:v.placeName, phone:v.phone, files:v.files})
    })
    console.log(points)

    list(points)

  }, [])



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
      } else {
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
          {initialState.title}
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
          height: '55vh',
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
                  {initialState.regionCategory}
                </div>
                  {initialState.themeCategory.map((v,i)=>{
                    return(
                      <div className='themeCategory' key={i}>
                        {v}
                      </div>
                    )
                  })}
                <div className='priceCategory'>
                  {initialState.priceCategory}
                </div>
              </div>
          </div>
        </div>  

        {/* 검색목록과 선택한 목록 */}
          <div className='placeList'>
            {initialState.place.map((item, i) => (
              <div className='selectedPlace' key={i}>
                <div style={{ marginTop: '10px'}}>
                  <h3>{i + 1}. {item.placeName}</h3>
                  {item.roadAddressName ? (
                    <div>
                      <span>{item.roadAddressName}</span><br/>
                      <span>{item.addressName}</span>
                    </div>
                  ) : (
                    <span>{item.addressName}</span>
                  )}
                  <span>{item.phone}</span>
                </div>
              </div>
              ))}
          </div>

          {/* 사진업로드 */}
          <div className='imgSlide'>
            이미지 슬라이드 들어갈 공간입니다
            {/* <DetailImageSlide initialState={initialState}/> */}
          </div>

          <div className='txtPlace'>
            {initialState.content}
          </div>

        </div> 
    
        
        {/* <div className='imgUpload' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          <ImageSlide setImgFile={setImgFile} select={select} setSelect={setSelect}
          />
        </div> */}

        {/* 텍스트 입력 */}
        {/* <div className='txt' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          <textarea placeholder='내용을 입력해주세요' onChange={onContentHandler}/>
        </div> */}

        
      </>
  )
}

export default Detail