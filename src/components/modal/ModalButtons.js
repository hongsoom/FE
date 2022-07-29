import React, {useState} from 'react'
import '../../css/post.scss'
import swal from 'sweetalert';

import ThemeModal from '../modal/ThemeModal'
import RegionModal from '../modal/RegionModal'
import PriceModal from '../modal/PriceModal'
import PlaceModal from "../modal/PlaceModal"

const ModalButtons = (props) =>{
  const {region, theme, price, setRegion, setTheme, setPrice, selectedRegion, selectedTheme, selectedPrice, setSelect, select, myInfo, setFocus, myMap} = props 

  const [showPriceModal, setShowPriceModal] = useState(false); // 비용모달
  const [showThemeModal, setShowThemeModal] = useState(false); // 테마모달
  const [showRegionModal, setShowRegionModal] = useState(false); // 지역모달
  const [showPlaceModal, setShowPlaceModal] = useState(false); // 지역모달

  // ---------------------------- 지역 모달 open / close
  const openRegionModal = () => {
    setShowRegionModal(true)
  }
  const closeRegionModal = () => {
    setShowRegionModal(false)
  }
  const cancelRegionModal = () =>{
    setShowRegionModal(false)
    setRegion('')
  }

  // ---------------------------- 테마 모달 open / close
  const openThemeModal = () => {
    setShowThemeModal(true)
  }
  const closeThemeModal = () => {
    setShowThemeModal(false)
  }
  const cancelThemeModal = () =>{
    setShowThemeModal(false)
    setTheme([])
  }
      
  // ---------------------------- 비용 모달 open / close
  const openPriceModal = () => {
    setShowPriceModal(true)
  }
  const closePriceModal = () => {
    setShowPriceModal(false)
  }
  const cancelPriceModal = () =>{
    setShowPriceModal(false)
    setPrice('')
  }

  // ---------------------------- 선택 장소 목록 모달 open / close
  const openPlaceModal = () => {
    if(select&&select.length !== 0){
      setShowPlaceModal(true)
    } else{
      swal("아직 선택한 장소가 없습니다!");
    }
  }
  const closePlaceModal = () => {
    setShowPlaceModal(false)
  }


  return(
      <div className='modalButtons'>

        {/* 지역선택 */}
        <div className='regionButton'onClick={openRegionModal}>
        {selectedRegion?
          <div className='modalChoiceTitle'>🗺 {selectedRegion&&selectedRegion}</div>
          :
          <div className='modalChoiceTitle'>🗺 지역 선택</div>
          }
          
          <div className='regions'>
            <RegionModal region={region} selectedRegion={selectedRegion} setRegion={setRegion}
            showRegionModal={showRegionModal} cancelRegionModal={cancelRegionModal}
            closeRegionModal={closeRegionModal}
            />
          </div>  
        </div>

        {/* 테마선택 */}
        <div className='themeButton' onClick={openThemeModal}>
          {selectedTheme.length === 0 ?

            <div className='modalChoiceTitle'>
              ⛱ 테마 선택
            </div>
            :
            selectedTheme.length === 1 ?
            <div className='modalChoiceTitle'>
              ⛱ {selectedTheme[0]}
            </div>
            :
            selectedTheme.length > 1 ?
            <div className='modalChoiceTitle'>
              ⛱ 테마 {selectedTheme.length}개
            </div>
            :
            null
          }
        <div className='themes'>
            <ThemeModal theme={theme} selectedTheme={selectedTheme} setTheme={setTheme}
            showThemeModal={showThemeModal} cancelThemeModal={cancelThemeModal}
            closeThemeModal={closeThemeModal}
            />
        </div>    
      </div>

      {/* 비용선택 */}
      <div className='priceButton' onClick={openPriceModal}>
        {selectedPrice ?
        <div className='modalChoiceTitle'>💸 {selectedPrice&&selectedPrice}</div>
        :
        <div className='modalChoiceTitle'>💸 비용 선택</div>
        }
        
          <div className='prices'>
            <PriceModal price={price} selectedPrice={selectedPrice} setPrice={setPrice}
            showPriceModal={showPriceModal} cancelPriceModal={cancelPriceModal}
            closePriceModal={closePriceModal}
            />
          </div>    
      </div>

      {/* 선택한 장소 확인하기 */}
      <div className='placeButton' onClick={openPlaceModal}>
        <div className='modalChoiceTitle'>선택 장소 확인</div>
          <div className='places'>
            <PlaceModal setSelect={setSelect} select={select} myMap={myMap}
            showPlaceModal={showPlaceModal}
            closePlaceModal={closePlaceModal} myInfo={myInfo} setFocus={setFocus}
            />
          </div>    
      </div>

    </div>
  )
}
export default ModalButtons
