import React, { useEffect, useState, useRef } from 'react'
import '../css/detail.css'
import instance from '../shared/Request'

import DetailImageSlide from '../components/DetailImageSlide'
import Comment from "../components/comment/Comment"

import { useDispatch, useSelector} from 'react-redux'
import { useParams, useNavigate } from "react-router-dom";
import { deletePostDB } from "../redux/module/post"
import { userAction} from '../redux/module/user'


// 아이콘
import leftArrowBlack from '../assets/leftArrowBlack.png'
import edit from '../assets/edit.png'
import trash from '../assets/trash.png'
import heartpink from '../assets/heartpink.png'
import bookmark from '../assets/bookmark.png'
import shareblack from '../assets/shareblack.png'
import talk from '../assets/talk.png'

// 카카오맵
const { kakao } = window

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams().id;
  const [points, setPoints] = useState([])
  const myMap = useRef();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  

  // -------------- 게시글 데이터 가져오기
  const getData = async (postId)=>{
    try {
      setData(null)
      setLoading(true)
      const response = await instance.get(`api/post/${postId}`);
      const newData = response.data.body
      setData(newData);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false)
  }
  
  useEffect(() => {
    getData(param); 
  }, [param]);

 // ------------------------------------

 // 로그인한 사람과 글쓴이가 일치하는지 여부 확인

 useEffect(() => {
  dispatch(userAction.myInfoDB()); 
  }, []);

  const userInfo = useSelector(state=> state.user.myinfo)
  

 // -------------- 게시글 데이터 삭제하기
  const onDeleteHandler = () => {
    dispatch(deletePostDB(param))
  }

  // ------------- 수정하기
  const onModifyHandler = () => {
    navigate(`/write/${param}`)
  }
  

    

  // ----------------------- 카카오맵 
  useEffect(() => {

    // ------------------ 맨 처음 지도 초기화
    const mapOption = { 
      center: new kakao.maps.LatLng(data&&data.place[0].y, data && data.place[0].x), // 지도의 중심좌표
      level: 6 // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(myMap.current, mapOption); // 지도를 생성합니다
    // const bounds = new kakao.maps.LatLngBounds(); // 핀 위치 재조정 변수


    // // ------------------ 장소마다 위도,경도,이름,전화번호 points에 저장
    // data && data.post.body.place.map((v,i)=>{
    //   return(
    //     points.push({y:v.y, x:v.x, place_name:v.place_name, phone:v.phone})
    //   )
    // })

    // // ------------------ points에 있는 위도,경도를 핀에 꽂음
    // points.forEach(point => {
    //   bounds.extend(new kakao.maps.LatLng(point.lat, point.lng))
    // });

    // ------------------ 모든 위도,경도를 핀에 꽂음
    for (var i = 0; i < data&& data.place.length; i ++) {
      // 마커를 생성
      var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(toString(data.place[i].y), toString(data.place[i].x)),
          // position: positions[i].latlng, // 마커를 표시할 위치
          title :  data.place[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          place_name : data.place[i].place_name
      });

      // 마커찍기 함수
      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(toString(place.y), toString(place.x))
        })
        
        kakao.maps.event.addListener(marker, 'click', function () {
          var infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true })
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name +  '<br/>' + place.phone + '</div>')
          infowindow.open(map, marker)
        })
      }

      displayMarker(data.place[i])
      marker.setMap(map);
  }

    // list(points)

  }, [data])


  // ----------------------- 카카오맵에 장소 핀 꽂아 보여주기
  // const list = (positions) => {
  //   if (positions.length !==0 ){
  //     const options = {
  //       center: new kakao.maps.LatLng(toString(positions[positions.length-1].y), toString(positions[positions.length-1].x)),
  //       level: 5,
  //     }
  //     const map = new kakao.maps.Map(myMap.current, options)

  //     }
  //       else {
  //       const options = {
  //         center: new kakao.maps.LatLng(37.5666805, 126.9784147),
  //         level: 4,
  //       }
  //       const map = new kakao.maps.Map(myMap.current, options)

  //     }
      
  //   }


  
 
  const onClickLeftArrow = () => {
    navigate('/')
  }


  return (
    <>
      {/* 헤더 */}
      <div className='detailHeader'>
        <div className='preIcon' onClick={onClickLeftArrow}>
          <img src={leftArrowBlack} alt="홈으로 이동"/>
        </div>
        <div className='title'>
          {data && data.title}
        </div>
        {userInfo&&data&& (userInfo.nickname === data.nickname) ? (
          <>
          <div className='editIcon'>
            <img src={edit} alt="수정하기" onClick={onModifyHandler}/>
          </div>
          <div className='trashIcon'>
            <img src={trash} alt="삭제하기" onClick={onDeleteHandler}/>
          </div>
        </>
        ):null}
        

      </div>

      

      {/* 프로필 / 장소목록 / 사진슬라이드 / 댓글 */}
      <div className='contentsWrap'>
        <div className='profile'>
          <div className='profilePic'>
            {data&&data.userImgUrl ?
              <img src={`${data.userImgUrl}`} alt="프로필 이미지"/>:
              null
            }
          </div>
          <div className='txtWrap'>
            <div className='nick'>
              {data&&data.nickname&& data.nickname}
            </div>
            <div className='themeNprice'>
                <div className='regionCategory'>
                  {data && data.regionCategory}
                </div>
                  {data && data.themeCategory.map((v,i)=>{
                    return(
                      <div className='themeCategory' key={i}>
                        {v.themeCategory}
                      </div>
                    )
                  })}
                <div className='priceCategory'>
                  {data && data.priceCategory}
                </div>
              </div>
          </div>
        </div>  

        {/* 지도 */}
          <div className='detail_map_wrap' ref={myMap}
          >
          </div>

        {/* 검색목록과 선택한 목록 */}
          <div className='placeList'>
            {data && data.place.map((item, i) => (
              <div className='selectedPlace' key={i}>
                <div>
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
            <DetailImageSlide data={data}/>
          </div>

          {/* 좋아요 즐겨찾기 버튼 */}
          <div className='heartNbookmarkIcon'>
            <div className='heartIcon'>
              <img src={heartpink} alt="좋아요 버튼"/>
            </div>
            <div className='heartNum'>
              1004
            </div>
            <div className='bookmarkIcon'>
              <img src={bookmark} alt="즐겨찾기 버튼"/>
            </div>
            <div className='shareIcon'>
              <img src={shareblack} alt="즐겨찾기 버튼"/>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className='txtPlace'>
            <img src={talk} alt="말풍선"/>
            {data && data.content}
          </div>

          <div className='commentPlace'>
            <Comment param={param}/>
          </div>
        </div> 
      
    </>
  )
}

export default Detail