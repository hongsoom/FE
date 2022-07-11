import React, { useEffect, useState, useRef } from 'react'
import '../css/searchPlace.css'
import '../css/mapContainer.css'

// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {} from '@fortawesome/free-solid-svg-icons'


// 컴포넌트
import ImageSlide from './ImageSlide'
import RegionModal from './RegionModal'
import PriceModal from './PriceModal'

// 라우터
import {useNavigate} from 'react-router-dom'

// 리덕스
import {useDispatch, useSelector} from 'react-redux'

// 리덕스 모듈
import { getPostListDB, getPostDB, addPostDB} from '../redux/module/post'
import { addImg } from '../redux/module/uploadImg'


// 카카오맵
const { kakao } = window

const MapContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myMap = useRef(); // 카카오맵 화면 ref
  const [place, setPlace] = useState(""); // 카카오맵 장소들
  const [Places, setPlaces] = useState([]) // 검색 결과 배열에 담아줌
  const [title, setTitle] = useState(''); // 글 제목
  const [content, setConent] = useState(''); // 콘텐트 텍스트 
  const [inputText, setInputText] = useState(""); // 검색창 검색 키워드
  const [select, setSelect] = useState([])  // 선택한 장소 배열에 담아줌
  const [imgUrl, setImgUrl] = useState([]) // 선택한 장소 이미지미리보기 url 넣을 배열
  const [focus, setFocus] = useState(); // 선택한 장소 핀 클릭 목록 포커스
  const [selectedRegion, setRegion] = useState(''); // 지역 선택
  const [selectedTheme, setTheme] = useState([]); // 테마 선택
  const [selectedPrice, setPrice] = useState(''); // 비용 선택
  const [selectedRestroom, setRestroom] = useState(''); // 선택한 베스트 화장실 선택
  const [restroomOption, setRestroomOption] = useState([]); // 화장실 특징
  const [showPriceModal, setShowPriceModal] = useState(false); // 비용모달
  const [showRegionModal, setShowRegionModal] = useState(false); // 지역모달
  const [grab, setGrab] = useState(null); // 드래그앤드롭

 
  const region = ['서울','대전','경기','세종','인천','대구','강원도','울산','충청도','광주','전라도','부산','경상도','제주도']
  const theme = ['힐링','맛집','애견동반','액티비티','호캉스']
  const price = ['10만원 이하', '10만원대', '20만원대','30만원대','40만원대','50만원 이상']
  const restroom = ['비번있음','깨끗함','휴지있음','화장대있음','칸 많음']


  // ---------------------------- 게시글 수정하기
  // const param = useParams().id;

  // ---------------------------- 게시글 데이터 가져오기
  // React.useEffect(() => {

  //   dispatch(getPostDB(param));

  // }, [dispatch]);

  
  // const data = useSelector((state) => state.post.post);
  // const is_edit = param ? true : false;
  // const edit_post = is_edit ? dataList && dataList.find(p=> p.postId === param) : null;
  // const is_login = localStorage.getItem("token");
  
  // console.log(data);


  // 수정 중 새로고침하면 데이터가 날아가므로 새로고침하면 강제 홈으로 이동
  // React.useEffect(()=> {
  //   if(is_edit && !edit_post){
  //     navigate(`/`)
  //   }
  // },[])

  
  // ---------------------------- 제목 가져오기
  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };


  // ---------------------------- 검색 창
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    if(!inputText.replace(/^\s+|\s+$/g, '')){
      alert('키워드를 입력해주세요')
      return false;
    }
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  const isFocusedPlace = (e) => {
    setFocus(e.target.value)
  }

  // ---------------------------- 지역 모달 open / close
  const openRegionModal = () => {
    setShowRegionModal(true)
  }
  const closeRegionModal = () => {
    setShowRegionModal(false)
  }

  // ---------------------------- 비용 모달 open / close
  const openPriceModal = () => {
    setShowPriceModal(true)
  }
  const closePriceModal = () => {
    setShowPriceModal(false)
  }
  

  // ---------------------------- 적힌 콘텐트 텍스트 가져오기
  const onContentHandler = (e) => {
    setConent(e.target.value);
  };
  

  // ---------------------------- 선택된 화장실 장소 가져오기
  const isCheckedRestroom = (e) =>{
    setRestroom(e.target.value)
  }
  

  // ---------------------------- 첨부이미지 파일들 폼데이터로 담기
  const formData = new FormData();
  formData.append("title", title)
  formData.append("content", content)
  formData.append("regionCategory", selectedRegion)
  formData.append("themeCategory", selectedTheme)
  formData.append("priceCategory", selectedPrice)
  formData.append("place", select)
  formData.append("restroom", selectedRestroom)
  formData.append("restroomOption", restroomOption)

  

  // ---------------------------- 작성 완료 버튼
  const onHandlerSubmit = () =>{
    dispatch(addPostDB(formData))
  }


  // ---------------------------- 드래그앤드롭
  const _onDragOver = e =>{
    e.preventDefault();
  }
  const _onDragStart = e =>{
    setGrab(e.target)

    e.target.classList.add("grabbing");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  }
  const _onDragEnd = e =>{
    e.target.classList.remove("grabbing");
    e.dataTransfer.dropEffect = "move";
  }
  const _onDrop = e =>{
    let grabPosition = Number(grab.dataset.position);
    let targetPostion = Number(e.target.dataset.position);

    let _select =[...select];
    _select[grabPosition] = _select.splice(targetPostion, 1, _select[grabPosition])[0];
    setSelect(_select);
  }




  // ---------------------------- 서버로 보낼 데이터 콘솔에 찍어보기
  useEffect(()=>{
    console.log(
      "title:"+ title,
      "regionCategory:" +selectedRegion,
      "themeCategory:" +selectedTheme,
      "content:" +content,
      "priceCategory:" +selectedPrice,
      "place:" +select,
      "restroom:" + selectedRestroom
    )
  },[content, select])



  
  // ---------------------------- 카카오맵 불러오기
  useEffect(() => {
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
        alert('검색 결과가 존재하지 않습니다.');
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

  }, [place])

 
  
  // ---------------------------- 선택된 장소만 마커 찍어주기

    // 선택된 장소 목록이 들어있는 select 상태배열을 list 함수에 넣어줬다.
    const list = (positions) => {
      if (positions.length !==0 ){
        const options = {
          center: new kakao.maps.LatLng(positions[positions.length-1].y, positions[positions.length-1].x),
          level: 5,
        }
        const map = new kakao.maps.Map(myMap.current, options)
  
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
          position: new kakao.maps.LatLng(_place.y, _place.x)
        })
        
        kakao.maps.event.addListener(marker, 'click', function () {
          var infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true })
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + _place.place_name +  '<br/>' + _place.phone + '</div>')
          infowindow.open(map, marker)
          setFocus(_place.place_name)
          const clickedFinPlace = document.getElementById(`finPlace${i}`)
          clickedFinPlace.scrollIntoView({behavior:'smooth',block:'center'})
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

    
    // 핀 누르면 해당 목록 하이라이트
    const finFocus = (el) => {
      if (select.length !==0 ){
        const options = {
          center: new kakao.maps.LatLng(el.y, el.x),
          level: 3,
        }
        const map = new kakao.maps.Map(myMap.current, options)
  
        for (var i = 0; i < select.length; i ++) {
          // 마커를 생성
          var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new kakao.maps.LatLng(select[i].y, select[i].x),
              // position: positions[i].latlng, // 마커를 표시할 위치
              title : select[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              place_name : select[i].place_name
          });
          displayMarker(select[i] , i)          
      }
  
      // 마커찍기 함수
      function displayMarker(_place , i) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(_place.y, _place.x)
        })
        
        kakao.maps.event.addListener(marker, 'click', function () {
          var infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true })
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + _place.place_name +  '<br/>' + _place.phone + '</div>')
          infowindow.open(map, marker)
          setFocus(_place.place_name)
          const clickedFinPlace = document.getElementById(`finPlace${i}`)
          clickedFinPlace.scrollIntoView({behavior:'smooth',block:'center'})
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
    <div className='map_wrap'>

      {/* 카카오맵 */}
      <div
        ref={myMap}
        style={{
          width:'100vw',
          height: '100vh',
          position: 'absolute'
        }}
        >
      </div>

      


      {/* 검색창 */}
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="장소를 입력하세요"
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      
      {/* 제목 */}
      <div className='titleWrap'>
        <div className='titleTitle'>
          코스 제목을 적어주세요
        </div>
          <input type="text" onChange={onTitleHandler}/>
        
      </div>


      <div className='contentWrap'>
        {/* 검색목록과 선택한 목록 */}
        <div className='selectNselected'>
        {/* 검색목록*/}
          <div className='searchList_wrap' style={Places.length !== 0 ? {display:'block'}: {display:'none'}}>
            <div id="result-list">
              {Places.map((item, i) => (
                <div key={i} style={{ marginTop: '20px'}}>
                  <span>{i + 1}</span>
                  <div>
                    <h3>{item.place_name}</h3>
                    {item.road_address_name ? (
                      <div>
                        <span>{item.road_address_name}</span><br/>
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
                          const newData = {...Places[i], files:[]}
                          selectList.push(newData)
                          list(selectList)
                          return selectList
                        })
                        setImgUrl((pre)=>{
                          const imgUrlList = [...pre]
                          const newData = {place_name:item.place_name, imgUrl:[]}
                          imgUrlList.push(newData)
                          dispatch(addImg(imgUrlList))
                          return imgUrlList
                        })
                      } else{
                        setSelect((pre)=>{
                          const selectList = pre.filter((v,i)=>{
                            return item.place_name !== v.place_name
                          })
                          list(selectList)
                          return selectList
                        })
                        setImgUrl((pre)=>{
                          const imgUrlList = pre.filter((v,i)=>{
                            return item.place_name !== v.place_name
                          })
                          return imgUrlList
                        })
                      }
                    }} style={{display:'none'}}/>
                  </div>
                  <label htmlFor={item.id}>
                  {select.includes(item)?  
                  <div style={{width:'60px', background:'skyblue', textAlign:'center',marginTop:'5px', cursor:'pointer'}}>취소하기</div>
                  :
                  <div style={{width:'60px', background:'#ddd', textAlign:'center',marginTop:'5px', cursor:'pointer'}}>선택하기</div>
                  }
                  </label>
                </div>
              ))}
              
              <div id="pagination"></div>
            </div>
          </div>
          
          <div className='selectedList'>
            {select.map((item, i) => (
              <div className='selected' id={`finPlace${i}`} key={i}
                draggable
                data-position={i}
                onDragOver={_onDragOver}
                onDragStart={_onDragStart}
                onDragEnd={_onDragEnd}
                onDrop={_onDrop}
                style={focus === item.place_name ? {background:'skyblue', color:'#fff'}:{background:'rgba(255, 255, 255, 0.85)', color:'#222'}}
                onClick={()=>{finFocus(item)}}
              >
                <input type="radio" name="selectedPlace" value={item.place_name} id={item.place_name}
                onChange={isFocusedPlace}/>
                <label htmlFor={item.place_name}>
                  <div style={{ marginTop: '5px'}} 
                  >
                    <span>{i + 1}</span>
                    <div>
                      <h3>{item.place_name}</h3>
                      {item.road_address_name ? (
                        <div>
                          <span>{item.road_address_name}</span><br/>
                          <span>{item.address_name}</span>
                        </div>
                      ) : (
                        <span>{item.address_name}</span>
                      )}
                      <span>{item.phone}</span>
                    </div>

                  </div>
                </label>
              </div>
              ))}
          </div>
        </div> 
      
        

        {/* 테마선택 */}
        <div className='theme' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
        <div className='choiceTitle'>테마 선택하기</div>
          <div className='themeWrap'> 
          {theme.map((v,i)=>{
            return(
              <div className='themes' key={i}
              style={selectedTheme.includes(v) ? {background:'skyblue', border:'1px solid #ccc'}: {border:'1px solid #ccc'}}>
                <input type="checkbox" name="theme" value={v} id={v}
                onChange={(e)=>{
                  if (e.target.checked){
                  setTheme((pre)=>{
                    const newData=[...pre];
                    newData.push(v)
                    return newData
                  })
                   }else{
                    setTheme((pre)=>{
                      const newData = pre.filter((l,i)=>{
                        return l !== v
                        })
                        return newData
                    })
                   }
                  }}
                />
                <label htmlFor={v}>
                  {v}
                </label>
              </div>
            )
          })}
         </div>
        </div>

        <div className='regionNprice'
        style={select.length !==0 ? {display:'flex'}:{display:'none'}}
        >
          {/* 지역선택 */}
          <div className='region'
          onClick={openRegionModal}
          >
            <div className='choiceTitle'>지역 선택하기</div>
            <div className='regions'
            style={selectedRegion ? {display:'block'}: {display:'none'}}
            >{selectedRegion}</div>
              <RegionModal region={region} selectedRegion={selectedRegion} setRegion={setRegion}
              showRegionModal={showRegionModal}
              closeRegionModal={closeRegionModal}
              />
          </div>

          {/* 비용선택 */}
          <div className='price'
          onClick={openPriceModal}
          >
            <div className='choiceTitle'>비용 선택하기</div>
            <div className='prices'
            style={selectedPrice ? {display:'block'}: {display:'none'}}
            >{selectedPrice}</div>
            <PriceModal price={price} selectedPrice={selectedPrice} setPrice={setPrice}
            showPriceModal={showPriceModal}
            closePriceModal={closePriceModal}
            />
          </div>
        </div>

        {/* 화장실 */}
        <div className='restroom' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
        <div className='choiceTitle'>어디에서 화장실을 이용하셨나요?<br/> 여러 화장실을 가보셨다면 베스트 화장실을 추천해주세요!</div>
          <div className='restroomWrap'>
            {select.map((v,i)=>{
              return(
                <div className='selectBestRestroom' key={i}
                style={selectedRestroom === v.place_name ? {background:'skyblue'}: {border:'1px solid #ccc'}}
                >
                  <input type="radio" name="restroom" value={v.place_name} id={v+i}
                  onChange={isCheckedRestroom}
                  />
                  <label htmlFor={v+i}>
                  {v.place_name}
                  </label>
                </div>
              )
            })}
          </div>
          <hr/>
          <div className='choiceTitle'>화장실은 어땠나요?</div>
            <div className="restroomOptionsWrap">
            {restroom.map((v,i)=>{
              return(
                <div className="restroomOptions" key={i}
                style={restroomOption.includes(v) ? {background:'skyblue'}: {border:'1px solid #ccc'}}>
                  <input type="checkbox" name="restroomOtion" value={v} id={v}
                  onChange={(e)=>{
                    if(e.target.checked){
                      setRestroomOption((pre)=>{
                        const restroomList = [...pre]
                        restroomList.push(v)
                        return restroomList
                      })
                    }else{
                      setRestroomOption((pre)=>{
                        const restroomList = pre.filter((l,j)=>{
                          return l !== v
                        })
                        return restroomList
                      })
                    }
                  }
                  }/>
                  <label htmlFor={v}>
                  {v}
                  </label>
                </div> 
              )
            })}
            </div>
          </div> 

        {/* 사진업로드 */}
        <div className='imgUpload' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          
          <ImageSlide select={select} setSelect={setSelect} imgUrl={imgUrl} setImgUrl={setImgUrl}
          />
          
        </div>

        {/* 텍스트 입력 */}
        <div className='txt' style={select.length !==0 ? {display:'block'}: {display:'none'}}>
          <textarea placeholder="코스에 대한 설명을 입력해주세요" onChange={onContentHandler}/>
        </div>

        <button className='submit' onClick={onHandlerSubmit}
        style={select.length !==0 && selectedRegion && selectedTheme ? {display:'block'}: {display:'none'}}
        >작성완료</button>
      </div>
  </div>
  )
}

export default MapContainer