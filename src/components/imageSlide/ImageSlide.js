import React from 'react';
import '../../css/imageSlide.scss';

// 라이브러리
import imageCompression from 'browser-image-compression';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// 컴포넌트
import AddButton from "./AddButton"

const ImageSlide = ({setSelect, select, setImgUrl, imgUrl, setImgs, imgs, l, j, setFocus, focus}) => {
  SwiperCore.use([Navigation]);
 
 const loadImg = async (e, index) => {
    const file = e.target.files[0];

    const options = {
      maxSizeMb: 1,
      maxWidthOrHeight: 400,
    }
    try{
      const compressedImage = await imageCompression(file, options);
      const resultFile = new File([compressedImage], compressedImage.name, {
        type: compressedImage.type,
      });

      // imgs라는 배열 안에 첨부파일 모두 넣음
      await setImgs((pre)=>{
        const imgList = [...pre]
        imgList.push(resultFile)
        return imgList
      })
      
      const Url = URL.createObjectURL(compressedImage)
      imgUrl[index].imgUrl.push(Url)
      select[index].imgCount = imgUrl[index].imgUrl.length
      
    } catch (error) {

    }
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
          <img src={list} alt="장소이미지" style={{width:"343px"}}/>
        </SwiperSlide>
        )}
        </Swiper>
      </div>
      <AddButton j={j} l={l} loadImg={loadImg}/> 
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
         <img src={list} alt="장소이미지" style={{width:"343px"}}/>
      </SwiperSlide>
      )}
      </Swiper>
    </div>
    <AddButton j={j} l={l} loadImg={loadImg}/>    
  </>
  }
</>
  )
}

export default ImageSlide