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
import editblack from '../assets/editblack.png'
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
  const myDetailMap = useRef();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [focus, setFocus] = useState('')
  

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

  console.log(data)

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
  
  useEffect(()=>{
    list(data&&data.place)
  }, [data])
    

  


  // 선택된 장소 목록이 들어있는 data.place 배열을 list 함수에 넣어준다.
  const list = (positions) => {
    if (positions&&positions.length !==0 ){
      const options = {
        center: new kakao.maps.LatLng(positions[positions.length-1].y, positions[positions.length-1].x),
        level: 7,
      }
      const map = new kakao.maps.Map(myDetailMap.current, options)

      for (var i = 0; i < positions.length; i ++) {
        // 마커를 생성
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(positions[i].y, positions[i].x),
            // position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            place_name : positions[i].place_name
        });
        displayMarker(positions[i] ,i)          
    }

    // 마커찍기 함수
    function displayMarker(_place, i) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(_place.y, _place.x),
        title : _place.place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      })
      
      kakao.maps.event.addListener(marker, 'click', function () {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true })
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + _place.place_name +  '<br/>' + _place.phone + `<a href= 	kakaomap://route?sp=37.537229,127.005515&ep=37.4979502,127.0276368&by=CAR style="color:blue" target="_blank">카카오길찾기</a></div>`)
        infowindow.open(map, marker)
        setFocus(_place.place_name)
        const clickedFinPlace = document.getElementById(`selectedPlace${i}`)
        clickedFinPlace.scrollIntoView({behavior:'smooth',block:'center'})
      })
    }
    } else {
      const options = {
        center: new kakao.maps.LatLng(37.5666805, 126.9784147),
        level: 4,
      }
      const map = new kakao.maps.Map(myDetailMap.current, options)
    }

  }

  


  


  
 
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
            <img src={editblack} alt="수정하기" onClick={onModifyHandler}/>
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
            <div className='profileTags'>
              <div className='themeNprice'>
                <div className='regionCategory'>
                  #{data && data.regionCategory}
                </div>
                  {data && data.themeCategory.map((v,i)=>{
                    return(
                      <div className='themeCategory' key={i}>
                        #{v.themeCategory}
                      </div>
                    )
                  })}
              </div>
              <div className='priceCategory'>
                {data && data.priceCategory}
              </div>
            </div>
          </div>
        </div>  

        {/* 지도 */}
          <div className='detail_map_wrap' ref={myDetailMap}
          >
          </div>

        {/* 검색목록과 선택한 목록 */}
          <div className='placeList'>
            {data && data.place.map((item, i) => (
              <div className='selectedPlace' id={`selectedPlace${i}`} key={i}
              style={focus === item.place_name ? {border:'1px solid #8ACEFF', borderRadius: '8px', boxSizing:'border-box', boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.1)'}:{border:'1px solid #fff',boxSizing:'border-box'}}
              onClick={() => window.open(`${item.place_url}`)}
              >
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
              {data&&data.loveCount}
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