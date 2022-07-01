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
  const prevSlide = () => {
    setCurrentSlide(currentSlide-1)
   
  }

  // 다음 사진보기 버튼
  const nextSlide = () => {
    setCurrentSlide(currentSlide+1)
  }

  useEffect(()=>{
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  },[currentSlide])

  const loadFile = () => {
    const file = uploadfile.current.files[0];

    // 이미지 소스 가져와서 배경 이미지로 넣기
    const imgUrl = URL.createObjectURL(file)

    setImg((pre)=>{
      const imgList = [...pre]
      imgList.push({id:img.length, url: imgUrl})
      return imgList
    })

    // setImg((pre)=>{
    //   const imgList = [...pre]
    //   imgList.push(file)
    //   return imgList
    // })

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

    <div style={{display:'flex'}}>
      <div className='prev' onClick={prevSlide}
      style={currentSlide === 0 ? {display:'none'}:{display:'block'}}>
          <FontAwesomeIcon icon={faAngleLeft}/>
      </div>
      <div className='slideContainer'>
        
        <div className='imgContainer' ref={slideRef}>
          {img.map((v,i)=>{
            return(
              <div key={i} style={{backgroundImage:`url(${v.url})`, backgroundSize:'cover',backgroundPosition:'center', width:'280px', flexShrink:'0'}} />
             
            )
          })}
        </div>
        
      </div>
      <div className='prev' onClick={nextSlide}
      style={currentSlide === img.length-1 ? {display:'none'}:{display:'block'}}>
          <FontAwesomeIcon icon={faAngleRight}/>
        </div>
    </div>
    </div>
  )
}

export default ImageSlide