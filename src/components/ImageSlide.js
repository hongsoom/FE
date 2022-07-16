import React, {useState, useRef, useEffect} from 'react';

import '../css/imageSlide.css';


// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
// import {faPlus} from '@fortawesome/free-solid-svg-icons'


const ImageSlide = ({setImgFile, select, setSelect, imgUrl, setImgUrl, setImgs, imgs}) => {

  const [place, setPlace] = useState();
  const [img, setImg] = useState(0)

  // 몇번째 슬라이드인지
  const [currentSlide, setCurrentSlide] = useState(0);

  
  // 이미지 슬라이드 움직이기
 const handleSlide = (currentSlide, direction, j) =>{

    if (currentSlide === imgUrl[j].imgUrl.length) {
      setCurrentSlide(0)
    } else if (currentSlide < 0) {
      setCurrentSlide(imgUrl[j].imgUrl.length - 1)
    }
    setCurrentSlide(currentSlide);

    const container = document.getElementById(`container${j}`)
    container.style.transition = 'all 0.5s ease-in-out';
    container.style.transform = `translateX(-${currentSlide}00%)`;
  }

  const handleSwipe = (direction, j) => {
    handleSlide(currentSlide + direction, direction, j);
    
  }

    // 업로드 이미지 url로 바꿔서 미리보기 띄우기
  const loadImg = (e, index) => {
    const file = e.target.files[0];
    imgs.push(file)
    // select[index].files.push(file)
    const Url = URL.createObjectURL(file)
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
  


  return (
    <div className='container'
    style={select.length !== 0 ? {display:'flex'}: {display:'none'}}
    >
      <div className='imgUploadTitle'>사진을 자랑할 장소를 선택해주세요</div>
        {/* 선택 장소 이름들 */}
        <div className='placeNames'>
          {select.map((v,i)=>{
            return(
              <div className='placeName' key={i}
              onClick={()=>{setPlace(v.place_name); setCurrentSlide(0)}}
              style={place === v.place_name ? {background:'#B6DCFF'}:{background:'#E4EFFF'}}
              >{v.place_name}</div>
            )
          })}
        </div>  

          
        <div className='imgWrap'>
          <div className='imageContainerPerPlaceWrap'>
            {imgUrl.map((l,j)=>{
              return(
                <div className='imageContainerPerPlace' key={j}
                style={place === l.place_name && l.imgUrl.length !== 0 ? {display:'flex'}: {display:'none'}}
                >

                    {/* 왼쪽 버튼 */}
                    <div className='prev'
                    onClick={() => handleSwipe(-1, j)}
                    style={currentSlide === 0 ? {display:'none'}:{display:'block'}}
                    >
                    <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                
                    {/* 이미지 들어가는 컨테이너 */}
                    <div className='slideContainer'
                    style={imgUrl.length !==0 ? {display:'flex'}: {display:'none'}}
                    >
                      <div className='imgContainer' id={`container${j}`}>
                      {l.imgUrl.map((v,i)=>{
                        return(
                      <div className='_img' key={i} style={{backgroundImage:`url(${v})`, backgroundSize:'cover', backgroundPosition:'center'}} />
                      )
                      })}
                      </div>
                    </div>
                    
                    {/* 오른쪽 버튼 */}
                    <div className='next'
                    onClick={() => handleSwipe(1, j)}
                    style={currentSlide === l.imgUrl.length-1 ? {display:'none'}:{display:'block'}}
                    >
                    <FontAwesomeIcon icon={faAngleRight}/>
                    </div>

                  </div>
              )
            })}
          </div>        
      </div>   
      {/* 사진 업로드 버튼 */}
        <div className='addButtonWrap'>
          {select.map((v,i)=>{
            return(
              <div className='addButton' key={i}
              style={place === v.place_name ? {display:'block'}:{display:'none'}}
              >
                <label htmlFor={`place_name_${i}`}>
                  {/* <FontAwesomeIcon icon={faPlus}/> */}
                    <div><b>{v.place_name}</b> 사진 추가하기</div>
                </label>
                <input type="file" id={`place_name_${i}`} name="uploadImg" accept="image/*" 
                onChange={(e)=>{loadImg(e, i)}}
                style={{display:'none'}}
                />
              </div> 
            )
          })}
          
        </div>
      
    </div>
  )
}

export default ImageSlide