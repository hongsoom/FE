import React, { useState } from 'react';

import '../css/imageSlide.css';
import swal from 'sweetalert';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import closewhite from '../assets/closewhite.png'
import AddPicSign from '../assets/AddPicSign.png'


const ImageSlide = ({setImgFile, select, setSelect, imgUrl, setImgUrl, setImgs, imgs, l, j, focus}) => {
  SwiperCore.use([Navigation]);
  const [place, setPlace] = useState();
  const [img, setImg] = useState(0)

 

    // 업로드 이미지 url로 바꿔서 미리보기 띄우기
  const loadImg = (e, index) => {
    const file = e.target.files[0];
    // imgs라는 배열 안에 첨부파일 모두 넣음
    imgs.push(file)
    const Url = URL.createObjectURL(file)
    // imgs라는 배열 안에 선택한 장소와 해당 첨부이미지넣음
    imgUrl[index].imgUrl.push(Url)
    setImg(Url)
    console.log(img)
    select[index].imgCount = imgUrl[index].imgUrl.length

      // setSelect((pre)=>{
      //   const selectList = [...pre]
      //   const newData = {...Places[i], imgCount:""}
      //   selectList.push(newData)
      //   return selectList
      // })
    
    console.log(select)
    console.log(imgUrl[index].imgUrl.length)
  }
  
  console.log(imgs)
  console.log(imgUrl)


  // ------------------- 사진 삭제하기
  const onRemoveHandler = (j,index) =>{
    swal({
      title: "사진을 삭제할까요?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal('사진이 삭제되었습니다', {
          icon: "success",
        });
        
        
      } else {
        swal("삭제를 취소했습니다");
      }
    });
  }
  


  return (
    <>
    {focus&&focus.length !== 0 ?
      <>
      <div className="writeImageContainerPerPlaceWrap"
      style={imgUrl&&imgUrl[j]&&imgUrl[j].imgUrl.length !== 0? {display:"flex"}:{display:"none"}}
      >
        <Swiper 
        style={{
          width : "100%",
          height: "256px",
        }}
        className="categoryslide-imagecontainer"
        spaceBetween= {10}
        navigation
        slidesPerView={1}
        breakpoints={{
          300: {
              slidesPerView: 1
          }}}>
        {imgUrl[j].imgUrl.map((list, i) => 
        <SwiperSlide 
          style={{
            width : "343px",
            height: "256px"
          }}
        className="write_categoryslide-imagecontent" key={i}>
           <img className='imgRemoveButton' src={closewhite} alt="이미지삭제버튼" style={{width:"12.73px",height:"12.73px"}}
           onClick={()=>{onRemoveHandler(j,i)}}
           />
           <img src={list} alt="장소이미지" style={{width:"343px"}}/>
        </SwiperSlide>
        )}
        </Swiper>
      </div>

      <div className='addButton' key={j}>
        <label htmlFor={`place_name_${j}`}>
          <div><b>{l.place_name}</b> 사진 추가하기</div>
        </label>
        <input type="file" id={`place_name_${j}`} name="uploadImg" accept="image/*" 
        onChange={(e)=>{loadImg(e, j)}}
        style={{display:'none'}}
        />
      </div> 
    </>

    :

    <>
    <div className="writeImageContainerPerPlaceWrap">
      <Swiper 
      style={{
        width : "100%",
        height: "256px",
      }}
      className="categoryslide-imagecontainer"
      spaceBetween= {10}
      navigation
      slidesPerView={1}
      breakpoints={{
        300: {
            slidesPerView: 1
        }}}>
      {imgUrl[j].imgUrl.map((list, i) => 
      <SwiperSlide 
        style={{
          width : "343px",
          height: "256px"
        }}
      className="write_categoryslide-imagecontent" key={i}>
         <img className='imgRemoveButton' src={closewhite} alt="이미지삭제버튼" style={{width:"12.73px",height:"12.73px"}}
         onClick={()=>{onRemoveHandler(j,i)}}
         />
         <img src={list} alt="장소이미지" style={{width:"343px"}}/>
      </SwiperSlide>
      )}
      </Swiper>
    </div>

    <div className='addButton' key={j}>
      <label htmlFor={`place_name_${j}`}>
        <div><b>{l.place_name}</b> 사진 추가하기</div>
      </label>
      <input type="file" id={`place_name_${j}`} name="uploadImg" accept="image/*" 
      onChange={(e)=>{loadImg(e, j)}}
      style={{display:'none'}}
      />
    </div> 
  </>
  }
</>
  )
}

export default ImageSlide