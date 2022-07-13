import React, {useState, useRef, useEffect} from 'react';
import '../css/detailImageSlide.css'

// 아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
// import {faPlus} from '@fortawesome/free-solid-svg-icons'


const DetailImageSlide = (props) => {
  const {data} = props
  console.log(data)

  const [place, setPlace] = useState();

  // 몇번째 슬라이드인지
  const [currentSlide, setCurrentSlide] = useState(0);

  
  // 이미지 슬라이드 움직이기
 const handleSlide = (currentSlide, direction, j) =>{

    if (currentSlide === data && data.post.body.place[j].imgUrl.length) {
      setCurrentSlide(0)
    } else if (currentSlide < 0) {
      setCurrentSlide(data && data.post.body.place[j].imgUrl.length - 1)
    }
    setCurrentSlide(currentSlide);

    const container = document.getElementById(`container${j}`)
    container.style.transition = 'all 0.5s ease-in-out';
    container.style.transform = `translateX(-${currentSlide}00%)`;
  }

  const handleSwipe = (direction, j) => {
    handleSlide(currentSlide + direction, direction, j);
  }

  

  return (
    <div className='detailContainer'>
      
        {/* 선택 장소 이름들 */}
        <div className='detailPlaceNames'>
          {data && data.post.body.place.map((v,i)=>{
            return(
              <div className='detailPlaceName' key={i}
              onClick={()=>{setPlace(v.place_name); setCurrentSlide(0)}}
              style={place === v.place_name ? {background:'skyblue'}:{background:'#fff'}}
              >{v.place_name}</div>
            )
          })}
        </div>  

          
        <div className='detailImgWrap'>
          <div className='detailImageContainerPerPlaceWrap'>
            {data && data.post.body.place.map((l,j)=>{
              return(
                <div className='detailImageContainerPerPlace' key={j}
                style={place === l.place_name ? {display:'flex'}: {display:'none'}}
                >

                    {/* 왼쪽 버튼 */}
                    <div className='detailPrev'
                    onClick={() => handleSwipe(-1, j)}
                    style={currentSlide === 0 ? {display:'none'}:{display:'block'}}
                    >
                    <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                
                    {/* 이미지 들어가는 컨테이너 */}
                    <div className='detailSlideContainer'>
                      <div className='detailImgContainer' id={`container${j}`}>
                      {l.imgUrl && l.imgUrl.map((v,i)=>{
                        return(
                          <>
                          <div className='_detailImg' key={i} style={{backgroundImage:`url(${v})`, backgroundSize:'cover', backgroundPosition:'center'}}>
                            {i}
                          </div>
                          </>
                        )
                      })}
                      </div>
                    </div>
                    
                    {/* 오른쪽 버튼 */}
                    <div className='detailNext'
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
      
      
    </div>
  )
}

export default DetailImageSlide