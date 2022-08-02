import React from 'react'
import '../../css/detail.scss'

import DetailImageSlide from '../imageSlide/DetailImageSlide'

const DetailSectionPerPlace = (props)=>{
  const {data, logosky, focus, openPlaceModal} = props

  return(
    <div className="detailSectionWrap">
      {/* 장소마다 바뀌는 부분 시작 */}
      <div className="sectionPerPlace">
        {data &&
          data.place.map((l, j) => {
            return (
              <div
                className="sectionPerPlaceWrap"
                key={j}
                style={
                  focus === l.place_name
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <div className="imgUpload">
                  {/* 사진업로드하는 장소 이름 */}
                  <div className="imgUploadHeader">
                    <div className="imgUploadTitle" onClick={openPlaceModal}>
                      <div className="titleTxtWrap">
                        <img src={logosky} alt="야너갈 로고" />
                        {focus&&focus.length !==0 ?
                        <>
                        {l.place_name}
                        </>
                        :
                        <>
                        {l[0] && l[0].place_name}
                        </>
                        }
                        
                      </div>
                      <div className="clickInfo">
                          클릭시 모든 장소를 확인할 수 있어요!
                      </div>
                    </div>
                  </div>
                  {focus&&focus.length !==0 ?
                  <DetailImageSlide
                    data={data}
                    focus={focus}
                    l={l}
                    j={j}
                  />
                  :
                  <DetailImageSlide
                    data={data}
                    l={data && data.place[0]}
                    j={0}
                  />
                  }
                </div>
              </div>
            );
          })}
      </div>
      {/* 장소마다 바뀌는 부분 끝  */}
    </div>
  )
}

export default DetailSectionPerPlace