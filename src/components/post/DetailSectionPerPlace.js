import React from 'react'
import '../../css/detail.scss'

import DetailImageSlide from '../imageSlide/DetailImageSlide'

import logosky from '../../assets/logosky.png'
const DetailSectionPerPlace = (props)=>{
  const {data, focus, openPlaceModal} = props

  return(
    <>
    {focus && focus.length !== 0 ? (
      <div className="detailSectionWrap">
        {/* 핀을 클릭했을 때 */}
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
                    <div className="imgUploadHeader">
                      <div
                        className="imgUploadTitle"
                        onClick={openPlaceModal}
                      >
                        <div className="titleTxtWrap">
                          <img src={logosky} alt="야너갈 로고" />
                          {l.place_name}
                        </div>
                        <div className="clickInfo">
                          클릭시 모든 장소를 확인할 수 있어요!
                        </div>
                      </div>
                    </div>
                    <DetailImageSlide
                      data={data}
                      focus={focus}
                      l={l}
                      j={j}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        {/* 장소마다 바뀌는 부분 끝  */}
      </div>
    ) : (
      <div className="detailSectionWrap">
        {/* 핀을 클릭하지 않았을 때 */}
        <div className="sectionPerPlace">
          <div className="sectionPerPlaceWrap">
            <div className="imgUpload">
              <div className="imgUploadHeader">
                <div className="imgUploadTitle" onClick={openPlaceModal}>
                  <div className="titleTxtWrap">
                    <img src={logosky} alt="야너갈 로고" />
                    {data && data.place[0] && data.place[0].place_name}
                  </div>
                  <div className="clickInfo">
                    클릭시 모든 장소를 확인할 수 있어요!
                  </div>
                </div>
              </div>
              {/* 사진업로드 */}
              <div className="imgSlide">
                <DetailImageSlide
                  data={data}
                  l={data && data.place[0]}
                  j={0}
                />
              </div>
            </div>
          </div>
        </div>
        {/* 장소마다 바뀌는 부분 끝  */}
      </div>
    )}
    </>
  )
}

export default DetailSectionPerPlace