import React, {useState} from 'react'
import '../../css/post.scss'

import ThemeModal from '../modal/ThemeModal'
import RegionModal from '../modal/RegionModal'
import PriceModal from '../modal/PriceModal'

const ModalButtons = (props) =>{
  const {region, theme, price, setRegion, setTheme, setPrice, selectedRegion, selectedTheme, selectedPrice} = props 

  const [showPriceModal, setShowPriceModal] = useState(false); // 비용모달
  const [showThemeModal, setShowThemeModal] = useState(false); // 테마모달
  const [showRegionModal, setShowRegionModal] = useState(false); // 지역모달

  // ---------------------------- 지역 모달 open / close
  const openRegionModal = () => {
    setShowRegionModal(true)
  }
  const closeRegionModal = () => {
    setShowRegionModal(false)
  }

  // ---------------------------- 테마 모달 open / close
  const openThemeModal = () => {
    setShowThemeModal(true)
  }
  const closeThemeModal = () => {
    setShowThemeModal(false)
  }
      
  // ---------------------------- 비용 모달 open / close
  const openPriceModal = () => {
    setShowPriceModal(true)
  }
  const closePriceModal = () => {
    setShowPriceModal(false)
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
            showRegionModal={showRegionModal}
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
              ⛱ 테마 {selectedTheme.length-1}개
            </div>
            :
            null
          }
        <div className='themes'>
          <ThemeModal theme={theme} selectedTheme={selectedTheme} setTheme={setTheme}
          showThemeModal={showThemeModal}
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
            showPriceModal={showPriceModal}
            closePriceModal={closePriceModal}
            />
          </div>    
      </div>

      {/* 일정선택 */}
      <div className='calendarButton'
      onClick={openPriceModal}>
        <div className='modalChoiceTitle'>🗓 일정 선택</div>
        <div className='calendars'>
          <PriceModal price={price} selectedPrice={selectedPrice} setPrice={setPrice}
          showPriceModal={showPriceModal}
          closePriceModal={closePriceModal}
          />
        </div>    
      </div>
    </div>
  )
}

export default ModalButtons