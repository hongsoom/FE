import React, { useState } from 'react';
import '../css/editImageSlide.css';


import { Swiper, SwiperSlide } from "swiper/react";



const EditImageSlide = ({editdata, setImgFile, select, setSelect, imgUrl, setImgUrl, setNewImgFile, newImgFile, l, j}) => {

  const [place, setPlace] = useState();
  const [img, setImg] = useState(0)

  
  // 업로드 이미지 url로 바꿔서 미리보기 띄우기
  const editLoadImg = (e, index) => {
    const file = e.target.files[0];
    newImgFile.push(file)
    console.log(newImgFile)
    console.log(imgUrl)
    const Url = URL.createObjectURL(file)
    imgUrl[index].imgUrl.push(Url)
    select[index].imgCount = imgUrl[index].imgUrl.length
  }
  
  return (
    <>
      <div className="writeImageContainerPerPlaceWrap">
        <Swiper 
        styele={{
          width : "343px",
          height: "256px"
        }}
        className="categoryslide-imagecontainer"
        spaceBetween= {0}
        navigation
        slidesPerView={1}
        breakpoints={{
          300: {
              slidesPerView: 1
          }}}>
        {editdata&&editdata.place&&editdata.place[j]&&editdata.place[j].imgUrl&&editdata.place[j].imgUrl.map((list, i) => 
        <SwiperSlide 
          styele={{
            width : "343px",
            height: "256px"
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
        onChange={(e)=>{editLoadImg(e, j)}}
        style={{display:'none'}}
        />
      </div> 
    </>
  )
}

export default EditImageSlide