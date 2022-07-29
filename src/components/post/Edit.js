import React, { useEffect, useState, useRef } from 'react'
import '../../css/post.scss'
import { useDispatch } from 'react-redux'
import { modifyPostDB } from '../../redux/module/post'

import instance from '../../shared/Request'
import swal from 'sweetalert';

// 컴포넌트
import ModalButtons from '../modal/ModalButtons'
import Kakaomap from '../kakaomap/Kakaomap';
import EditImageSlide from '../imageSlide/EditImageSlide'

// 라우터
import { useNavigate, useParams } from 'react-router-dom'

// 아이콘
import search from '../../assets/search.png'
import logosky from '../../assets/logosky.png'
import trashwhite from '../../assets/trashwhite.png'
import leftArrowBlack from '../../assets/leftArrowBlack.png'

// 카카오맵
const { kakao } = window

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myMap = useRef(); // 카카오맵 화면 ref
  const param = useParams().id; //수정할 게시글 번호
  const [loading, setLoading] = useState(false)
  const [editdata, setEditData] = useState([])

  // -------------- 게시글 한개 데이터 가져오기
  const getData = async (postId)=>{
    try {
      setEditData(null)
      setLoading(true)
      const response = await instance.get(`api/post/${postId}`);
      const newData = response.data.body
      setEditData(newData);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false)
  }

  useEffect(() => {
    getData(param); 
  }, [param]);

  const [place, setPlace] = useState(''); // 카카오맵 장소들
  const [Places, setPlaces] = useState([]) // 검색 결과 배열에 담아줌
  const [title, setTitle] = useState(editdata&&editdata.title); // 글 제목
  const [content, setContent] = useState(editdata&&editdata.content); // 콘텐트 텍스트 
  const [inputText, setInputText] = useState(''); // 검색창 검색 키워드
  const [select, setSelect] = useState([])  // 선택한 장소 배열에 담아줌
  const [allImgUrl, setAllImgUrl] = useState([]) // 장소별 기존 이미지 url과 새로운 이미지 url 모음
  const [imgUrl, setImgUrl] = useState([]) // 선택한 장소 이미지 갯수 카운트 배열
  const [focus, setFocus] = useState(); // 선택한 장소 핀 클릭 목록 포커스
  const [selectedRegion, setRegion] = useState(editdata&&editdata.regionCategory); // 지역 선택
  const [selectedTheme, setTheme] = useState([]); // 테마 선택
  const [selectedPrice, setPrice] = useState( editdata&&editdata.priceCategory ); // 비용 선택
  const [newImgFile, setNewImgFile] = useState([]); // 이미지 모두 파일
  
  const region = ['서울','대전','경기','세종','인천','대구','강원도','울산','충청도','광주','전라도','부산','경상도','제주도']
  const theme = ['힐링','맛집','애견동반','액티비티','호캉스']
  const price = ['10만원 이하', '10만원대', '20만원대','30만원대','40만원대','50만원 이상']

  const onClickLeftArrow = () => {
    navigate('/')
  }
  
  useEffect(()=>{
    if(editdata&&editdata.place){
    editdata&&editdata.place.map((v,i)=>{
      if(v.place_name !== imgUrl.place_name){
        imgUrl.push({
          place_name: v.place_name,
          imgUrl: []
        })
        return imgUrl
      }
      })
    }
    
    if(editdata&&editdata.place){
      editdata&&editdata.place.map((v,i)=>{
          select.push({
            address_name: v.address_name,
            category_group_code:v.category_group_code,
            category_group_name:v.category_group_name,
            category_name: v.category_name,
            distance: v.distance,
            imgCount: 0,
            modImgUrl: v.imgUrl,
            id: v.id,
            phone: v.phone,
            place_name: v.place_name,
            place_url: v.place_url,
            road_address_name: v.road_address_name,
            x:v.x,
            y:v.y,
          })
        return select
      })
    }
    list(select)

    if(editdata&&editdata.place){
      editdata&&editdata.place.map((v,i)=>{
        allImgUrl.push({
          place_name: v.place_name,
          imgUrl: v.imgUrl
        })
        return allImgUrl
      })
    }
    window.scrollTo(0, 0);
    
  },[dispatch, editdata])


  useEffect(()=>{
    setTitle(editdata&&editdata.title)
    setContent(editdata&&editdata.content)
    setRegion(editdata&&editdata.regionCategory)
    setPrice(editdata&&editdata.priceCategory)
    if(editdata&&editdata.themeCategory){
      editdata&&editdata.themeCategory.map((v,i)=>{
        selectedTheme.push(v.themeCategory)
        return selectedTheme
      })
    }
    
  },[dispatch, editdata])

  
  
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
    const searchList_wrap = document.getElementById('searchList_wrap')
    searchList_wrap.style.height='220px'
  };

  
  // ---------------------------- 적힌 콘텐트 텍스트 가져오기
  const onContentHandler = (e) => {
    setContent(e.target.value);
  };


  // ---------------------------- 첨부이미지 파일들 폼데이터로 담기
  const json = JSON.stringify(select)
  const blob = new Blob([json], { type: "application/json" })

  const editFormData = new FormData();
  newImgFile.forEach((v,i)=>{
    editFormData.append("imgUrl",v)
  })
  editFormData.append("title", title)
  editFormData.append("content", content)
  editFormData.append("regionCategory", selectedRegion)
  editFormData.append("themeCategory", selectedTheme)
  editFormData.append("priceCategory", selectedPrice)
  editFormData.append("places", blob)

  console.log(newImgFile)
  // formData.append(`${imgUrl[0]}`,)
  // localStorage.setItem('"token"') 
  // formData.append("imgUrl",imgs)

  
  for (let key of editFormData.keys()) {
    console.log(key, ":", editFormData.get(key));
  }
  
  // 검색 목록에서 장소 하나를 선택 클릭
  const onClickHandler = (__place) => {
    setFocus(__place)
    console.log(__place)
    const searchList_wrap = document.getElementById('searchList_wrap')
    searchList_wrap.style.height='0px'
  }
   

  // ---------------------------- 장소 선택하기
  const onSelectPlace = (e, i, item, place_name) => {
    if(e.target.checked){
      setSelect((pre)=>{
          const selectList = [...pre]
          const newData = {...Places[i], imgCount:0}
          selectList.push(newData)
          list(selectList)
          return selectList
      })
      setImgUrl((pre)=>{
        const imgUrlList = [...pre]
        const newData = {place_name: place_name, imgUrl:[]}
        imgUrlList.push(newData)
        return imgUrlList
      })
      setAllImgUrl((pre)=>{
        const imgUrlList = [...pre]
        const newData = {place_name: place_name, imgUrl:[]}
        imgUrlList.push(newData)
        return imgUrlList
      })
    }
  }

  // ----------------------------- 장소 선택 취소
  const onRemovePlace = (place) =>{
    swal({
      title: "이 장소를 삭제할까요?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal('목록에서 삭제되었습니다', {
          icon: "success",
        });
        if(select&&select.length !==0){
          setFocus(select&&select[0].place_name)
        }        
        setSelect((pre)=>{
          const newSelect = pre.filter((v,i)=>{
            return place.place_name !== v.place_name
          })
          list(newSelect)
          return newSelect
        })
        setImgUrl((pre)=>{
          const imgUrlList = pre.filter((v,i)=>{
            return place.place_name !== v.place_name
          })
          return imgUrlList
        })
        setAllImgUrl((pre)=>{
          const imgUrlList = pre.filter((v,i)=>{
            return place.place_name !== v.place_name
          })
          return imgUrlList
        })
      } else {
        swal("삭제를 취소했습니다");
      }
    });
  }

  // ---------------------------- 작성 완료 버튼
  const onHandlerEdit = () =>{
    if (select.length === 0){
      swal("장소를 검색하고 선택해주세요!");
    } else if (selectedRegion.length === 0){
      swal("지역을 선택해주세요!");
    } else if (selectedTheme.length === 0){
      swal("테마를 선택해주세요!");
    } else if (selectedPrice.length === 0){
      swal("비용을 선택해주세요!");
    } else if (title.length === 0){
      swal("제목을 적어주세요!");
    }
    else if (allImgUrl.length === 0 || newImgFile.lenght === 0){
      swal("사진을 첨부해주세요!");
    }
    else if (content.length < 10){
      swal("내용은 10자 이상 적어주세요!");
    } else if (selectedRegion.length !== 0 && selectedTheme.length !== 0 && selectedPrice.length !== 0 && select && content.length >= 10 && title){
      swal("수정 완료하시겠습니까?")
      .then((value) => {
        swal("수정이 완료되었습니다!");
        dispatch(modifyPostDB(editFormData, param))
        navigate('/')
      })
    } 
  }
    

  // ---------------------------- 서버로 보낼 데이터 콘솔에 찍어보기
  useEffect(()=>{
    console.log(
      "imgUrl" + newImgFile,
      "title:"+ title,
      "regionCategory:" +selectedRegion,
      "themeCategory:" +selectedTheme,
      "content:" +content,
      "priceCategory:" +selectedPrice,
      "place:" +select,      
    )
  },[content, select, selectedPrice, selectedRegion, selectedRegion])


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
      <div className='writeHeader'>
        <div className='writeHeaderWrap'>
          <div className='writeUpperHeader'>
            <div className='writePreIcon' onClick={onClickLeftArrow}>
              <img src={leftArrowBlack} alt="홈으로 이동"/>
            </div>

            <div className='writeSearchNresult'>
              {/* 검색창 */}
              <form className="inputForm" onSubmit={handleSubmit}>
                <input
                  placeholder="위치를 검색해주세요"
                  onChange={onChange}
                  value={inputText}
                />
                <button type="submit">
                  <img src={search} alt="검색 아이콘"/>
                </button>
              </form>

              {/* 검색목록*/}
              <div className='searchList_wrap' id='searchList_wrap' style={Places&&Places.length !==0 ? {height:'220px'}: {height:'0px', border:'none'}}>
                <div id="result-list">
                  {Places.map((item, i) => (
                    <label htmlFor={item.id} key={i}>
                    <div style={{ marginTop: '20px'}}>
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
                        checked={select.includes(item)? true : false}
                        onChange={(e)=>{ onClickHandler(item.place_name)
                          const place_name = item.place_name
                          onSelectPlace(e, i, item, place_name)
                        }} style={{display:'none'}}/>
                      </div>
                      </div>
                    </label>
                    
                  ))}
                  <div id="pagination"></div>
                </div>
              </div>
            </div>
          </div>

          <div className='writeLowerHeader'>
            <ModalButtons region={region} theme={theme} price={price} setRegion={setRegion} setTheme={setTheme} setPrice={setPrice} selectedRegion={selectedRegion} selectedTheme={selectedTheme} selectedPrice={selectedPrice} select={select} setFocus={setFocus} myMap={myMap}/>
          </div>
        </div>
      </div>


      {/* 움직이는 부분 */}
      <div className='contentWrap' id="contentWrap">

        <Kakaomap kakao={kakao} myMap={myMap} setPlaces={setPlaces} place={place}/>
        
        {/* 제목 */}
        <div className='writeTitleWrap'>
          <input type="text" onChange={onTitleHandler} defaultValue={editdata&&editdata.title} placeholder="코스 이름을 적어주세요"/>
        </div>

        {/* 검색하고 선택한 장소가 없을 때 */}
        {select.length === 0 ?
        <div className='sectionWrap'>
          {/* 바뀌는 부분 */}
          <div className='sectionPerPlace'>
            <div className="sectionPerPlaceWrap">        
              {/* 사진업로드 */}
              <div className='imgUpload'>
                {/* 사진업로드하는 장소 이름 */}
                <div className='imgUploadHeader'>
                  <div className='imgUploadTitle'>
                    <img src={logosky} alt="야너갈 로고"/>
                    장소를 검색해주세요!
                  </div>
                </div>
              </div>
            </div>
          </div>  

          {/* 텍스트 입력 */}
          <div className='writeTxt'
          >
            <textarea placeholder="코스에 대한 설명을 입력해주세요" defaultValue={editdata&&editdata.content} onChange={onContentHandler}/>
          </div>
          <button className='writeSubmit' onClick={onHandlerEdit}>수정 완료하기</button>
        </div> 

        :
        
        focus&&focus.length !== 0 ?
        <div className='sectionWrap'>
        {/* 검색해서 장소를 선택했고 핀을 클릭했을 때 */}
          {/* 바뀌는 부분 */}
          <div className='sectionPerPlace' >
            {select&&select.map((l,j)=>{
              return(
                <div className="sectionPerPlaceWrap" key={j} 
                style={focus === l.place_name ? {display:"block"} : {display:'none'}}
                >        
                  {/* 사진업로드 */}
                  <div className='imgUpload'>
                    {/* 사진업로드하는 장소 이름 */}
                    <div className='imgUploadHeader'>
                      <div className='imgUploadTitle'>
                        <img src={logosky} alt="야너갈 로고"/>
                        {l.place_name}
                      </div>
                      <div className='removePlaceButton'
                      onClick={()=>{onRemovePlace(l)}}
                      >
                        <img src={trashwhite} alt="장소 삭제 버튼"/>
                        이 장소 삭제
                      </div>    
                    </div>
                    <EditImageSlide editdata={editdata} select={select} setSelect={setSelect}
                    imgUrl={imgUrl} setImgUrl={setImgUrl} setNewImgFile={setNewImgFile} newImgFile={newImgFile}
                    l={l} j={j} allImgUrl={allImgUrl} setAllImgUrl={setAllImgUrl} focus={focus}
                    
                    />
                  </div>
                  
                </div>
              )
            })}
          </div>  

          {/* 텍스트 입력 */}
          <div className='writeTxt'>
            <textarea placeholder="코스에 대한 설명을 입력해주세요" defaultValue={editdata&&editdata.content} onChange={onContentHandler}/>
          </div>

          <button className='writeSubmit' onClick={onHandlerEdit}>수정 완료하기</button>
        </div> 
            
        :

        <div className='sectionWrap' id="sectionWrap">
          {/* 검색해서 장소를 선택했지만 핀을 클릭하지 않았을 때 */}
          {/* 바뀌는 부분 */}
          <div className='sectionPerPlace'>
            <div className="sectionPerPlaceWrap">        
              {/* 사진업로드 */}
              <div className='imgUpload'>
                {/* 사진업로드하는 장소 이름 */}
                <div className='imgUploadHeader'>
                  <div className='imgUploadTitle'>
                    <img src={logosky} alt="야너갈 로고"/>
                    {select&&select[0]&&select[0].place_name}
                  </div>
                  <div className='removePlaceButton'
                  onClick={()=>{onRemovePlace(select&&select[0])}}
                  >
                    <img src={trashwhite} alt="장소 삭제 버튼"/>
                    이 장소 삭제
                  </div>    
                </div>
                <EditImageSlide editdata={editdata} select={select} setSelect={setSelect}
                imgUrl={imgUrl} setImgUrl={setImgUrl} setNewImgFile={setNewImgFile} newImgFile={newImgFile}
                l={select&&select[0]} j={0} allImgUrl={allImgUrl} setAllImgUrl={setAllImgUrl} focus={focus}
                // style={newImgFile.length !== 0 ? {display:"block"}:{display:"none"}}
                />
              </div>
            </div>
          </div>  

          {/* 텍스트 입력 */}
          <div className='writeTxt'>
            <textarea placeholder="코스에 대한 설명을 입력해주세요" defaultValue={editdata&&editdata.content} onChange={onContentHandler}/>
          </div>
          <button className='writeSubmit' onClick={onHandlerEdit}
          >수정 완료하기</button>
        </div> 
        
        }
        
      </div>
    </>
  )
}

export default Edit