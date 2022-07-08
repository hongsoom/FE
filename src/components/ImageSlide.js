import React, {useState, useRef, useEffect} from 'react';
import '../css/ImageSlide.css'

// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
// import {faPlus} from '@fortawesome/free-solid-svg-icons'


const ImageSlide = ({setImgFile, select, setSelect}) => {

  const [img, setImg] = useState([]);
  const [place, setPlace] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const uploadfile = useRef();

  // 이전 사진보기 버튼
  const prevSlide = () => {
    setCurrentSlide(currentSlide-1)
  }

  // 다음 사진보기 버튼
  const nextSlide = () => {
    setCurrentSlide(currentSlide+1)
  }

  useEffect(()=>{
    if(select.length !== 0) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  },[currentSlide]);


  // 첨부한 이미지 blob url 상태 배열(img) / 파일자체 상태 배열(imgFile) 만들기
  const loadFile = () => {
    const file = uploadfile.current.files[0];


    // 이미지 소스 가져와서 배경 이미지로 넣기
    const imgUrl = URL.createObjectURL(file)

    // setImg((pre)=>{
    //   const imgList = [...pre]
    //   imgList.push({id:img.length, url: imgUrl})
    //   return imgList
    // })

    setImgFile((pre)=>{
      const imgList = [...pre]
      imgList.push(file)
      return imgList
    })

  }



  


  return (
    <div className='container'>
      
        {/* 선택 장소 이름들 */}
        <div className='placeNames'>
          {select.map((v,i)=>{
            return(
              <div className='placeName' key={i}
              onClick={()=>{setPlace(v.place_name)}}
              style={place === v.place_name ? {background:'skyblue'}:{background:'#fff'}}
              >{v.place_name}</div>
            )
          })}
        </div>  

          
        <div className='imgWrap'>
          <div className='imageContainerPerPlaceWrap'>
            {select.map((l,j)=>{
              return(
                <div className='imageContainerPerPlace' key={j}
                style={place === l.place_name ? {display:'flex'}: {display:'none'}}
                >

                    {/* 왼쪽 버튼 */}
                    <div className='prev' onClick={prevSlide}
                    style={currentSlide === 0 ? {display:'none'}:{display:'block'}}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                    </div>
                
                    {/* 이미지 들어가는 컨테이너 */}
                    <div className='slideContainer'>
                      <div className='imgContainer' ref={slideRef}>
                      {img.map((v,i)=>{
                        return(
                      <div className='_img' key={i} style={{backgroundImage:`url(${v.url})`, backgroundSize:'cover', backgroundPosition:'center'}} />
                      )
                      })}
                      </div>
                    </div>
                    
                    {/* 오른쪽 버튼 */}
                    <div className='prev' onClick={nextSlide}
                    style={currentSlide === img.length-1 ? {display:'none'}:{display:'block'}}>
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
                onChange={(e)=>{
                  const file = e.target.files[0];
                  select[i].files.push(file)
                  console.log(select[i].files)
                  const imgUrl = URL.createObjectURL(file)
                  setImg((pre)=>{
                    const imgList = [...pre]
                    imgList.push({id:img.length, url: imgUrl})
                    return imgList
                  })
                }}
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