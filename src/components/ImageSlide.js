import React, { useState } from 'react';

import '../css/imageSlide.css';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";



const ImageSlide = ({setImgFile, select, setSelect, imgUrl, setImgUrl, setImgs, imgs, l, j}) => {
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
  


  return (
    <>
      <div className="writeImageContainerPerPlaceWrap">
        <Swiper 
        styele={{
          width : "335px",
          height: "221px" 
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
          styele={{
            width : "335px",
            height: "221px"
          }}
        className="categoryslide-imagecontent" key={i}>
            <img src={list} alt="장소이미지"/>
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
  )
}

export default ImageSlide