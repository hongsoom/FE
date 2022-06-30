import React, {useState, useRef, useEffect} from 'react';
import '../css/ImageSlide.css'

// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'


const ImageSlide = () => {
  const [img, setImg] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const uploadfile = useRef();
  console.log(img)

  // 이전 사진보기 버튼
  const nextSlide = () => {
    
  }

  // 다음 사진보기 버튼
  const prevSlide = () => {

  }



  const loadFile = () => {
    const file = uploadfile.current.files[0];
    // const newImage = document.createElement("div");

    // 이미지 소스 가져와서 배경 이미지로 넣기
    const imgUrl = URL.createObjectURL(file)
    console.log(imgUrl)
    // newImage.style.backgroundImage = `url(${URL.createObjectURL(file)})`
    // slideRef.current.appendChild(newImage);

    // setImg(imgUrl)
    setImg((pre)=>{
      const imgList = [...pre]
      imgList.push(imgUrl)
      return imgList
    })
  }


  return (
    <div className='container'>
      <div className='plusIcon'>
        <label htmlFor='uploadImg'>
          <FontAwesomeIcon icon={faPlus}/>
        </label>
        <input type="file" id="uploadImg" name="uploadImg" accept="image/*" ref={uploadfile}
        onChange={loadFile}
        style={{display:'none'}}
        />
      </div>
      
      <div className='slideContainer'>
        <div className='prev' onClick={prevSlide}>
          <FontAwesomeIcon icon={faAngleLeft}/>
        </div>
        
        <div className='imgContainer' ref={slideRef}>
          {img.map((v,i)=>{
            return(
              <div className='img' style={{backgroundImage:`url(${v})`}} key={i}></div>
            )
          })}
          
        </div>
        <div className='prev' onClick={nextSlide}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </div>
      </div>
    </div>
  )
}

export default ImageSlide