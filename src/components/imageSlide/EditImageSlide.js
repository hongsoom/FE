import React, { useState } from 'react';
import '../../css/editImageSlide.scss';

// 라이브러리
import imageCompression from 'browser-image-compression';
import { Swiper, SwiperSlide } from "swiper/react";

const EditImageSlide = ({editdata, setImgFile, select, setSelect, imgUrl, setImgUrl, setNewImgFile, newImgFile, l, j, setAllImgUrl, allImgUrl, focus}) => {
  
  // ------------------- 업로드 이미지 url로 바꿔서 미리보기 띄우기
  const editLoadImg = async (e, index) => {
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
      await setNewImgFile((pre)=>{
        const imgList = [...pre]
        imgList.push(resultFile)
        return imgList
      })
      
      const Url = URL.createObjectURL(compressedImage)
      imgUrl[index].imgUrl.push(Url)
      allImgUrl[index].imgUrl.push(Url)
      select[index].imgCount = imgUrl[index].imgUrl.length
      
    } catch (error) {

    }
  }
 

  return (
    <>
      {focus&&focus.length !== 0 ?
      <>
        <div className="writeImageContainerPerPlaceWrap"
        style={(newImgFile&&newImgFile.length !== 0)||(l&&l.modImgUrl&&l.modImgUrl.length !== 0) ? {display:"flex"}:{display:"none"}}
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
        {editdata&&allImgUrl&&allImgUrl[j]&&allImgUrl[j].imgUrl.map((list, index) => 
        <SwiperSlide 
          style={{
            width : "343px",
            height: "256px",
          }}
        className="write_categoryslide-imagecontent" key={index}>
           <img src={list} alt="장소이미지" style={{width:"343px"}}/>
        </SwiperSlide>
        )}
        </Swiper>
      </div>

      <div className='addButton' key={j}
      >
        <label htmlFor={`place_name_${j}`}>
          <div>{l.place_name} 사진 추가하기 📸</div>
        </label>
        <input type="file" id={`place_name_${j}`} name="uploadImg" accept="image/*" 
        onChange={(e)=>{editLoadImg(e, j)}}
        style={{display:'none'}}
        />
      </div> 
      </>
      :
      <>
      <div className="writeImageContainerPerPlaceWrap">
        {/* 지도에 장소핀은 있는데 아직 클릭은 하지 않았을 때 첫번째 장소 이미지 띄워주기 */}
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
        
        {editdata&&allImgUrl&&allImgUrl[j]&&allImgUrl[j].imgUrl.map((list, index) => 
        <SwiperSlide 
          style={{
            width : "343px",
            height: "256px",
          }}
        className="write_categoryslide-imagecontent" key={index}>
          <img src={list} alt="장소이미지" style={{width:"343px"}}/>
        </SwiperSlide>
        )}
        </Swiper>
      </div>

      
        <label className='addButton' htmlFor={`place_name_${j}`}>
          <div>{select&&select[0]&&select[0].place_name} 사진 추가하기 📸</div>
        <input type="file" id={`place_name_${j}`} name="uploadImg" accept="image/*" 
        onChange={(e)=>{editLoadImg(e, j)}}
        style={{display:'none'}}
        />
      </label>
      </>
      }
        
      
    </>
  )
}

export default EditImageSlide