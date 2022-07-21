import React, { useState } from 'react';
import '../css/editImageSlide.css';

import swal from 'sweetalert';
import { Swiper, SwiperSlide } from "swiper/react";

import closewhite from '../assets/closewhite.png'


const EditImageSlide = ({editdata, setImgFile, select, setSelect, imgUrl, setImgUrl, setNewImgFile, newImgFile, l, j, setAllImgUrl, allImgUrl}) => {

  const [place, setPlace] = useState();
  const [img, setImg] = useState('')

  console.log(allImgUrl)
  
  // ------------------- 업로드 이미지 url로 바꿔서 미리보기 띄우기
  const editLoadImg = (e, index) => {
    const file = e.target.files[0];
    newImgFile.push(file) // 파일들 자체 배열
    console.log(newImgFile) 
    console.log(imgUrl)
    const Url = URL.createObjectURL(file)
    imgUrl[index].imgUrl.push(Url)
    allImgUrl[index].imgUrl.push(Url)
    setImg(Url)
    select[index].imgCount = imgUrl[index].imgUrl.length
  }
  
  console.log(select)
  console.log(imgUrl)
  console.log(allImgUrl)

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
        <div className="writeImageContainerPerPlaceWrap">
        <Swiper 
        style={{
          width : "100%",
          height: "100%",
        }}
        className="categoryslide-imagecontainer"
        spaceBetween= {10}
        navigation
        slidesPerView={1}
        breakpoints={{
          300: {
              slidesPerView: 1
          }}}>
        {editdata&&allImgUrl&&allImgUrl[j].imgUrl.map((list, index) => 
        <SwiperSlide 
          style={{
            width : "343px",
            height: "256px",
            background: 'blue'
          }}
        className="categoryslide-imagecontent" key={index}>
            <img className='imgRemoveButton' src={closewhite} alt="이미지삭제버튼" style={{width:"12.73px",height:"12.73px"}}
            onClick={()=>{onRemoveHandler(j,index)}}
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
        onChange={(e)=>{editLoadImg(e, j)}}
        style={{display:'none'}}
        />
      </div> 
      
    </>
  )
}

export default EditImageSlide