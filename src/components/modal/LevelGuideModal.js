import React from 'react'
import '../../css/levelGuideModal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

import bronze from "../../assets/bronze.png";
import silver from "../../assets/silver.png";
import gold from "../../assets/gold.png";
import diamond from "../../assets/diamond.png"
import master from "../../assets/master.png"


const LevelGuideModal = (props) => {
  const {showLevelGuideModal, closeLevelGuideModal} = props

  return(
    <div className={showLevelGuideModal ? 'openModal levelGuideWrap' : 'levelGuideWrap'}>
      {showLevelGuideModal ?
      <div className='background' onClick={closeLevelGuideModal}>
        <div className='levelGuide_wrap' onClick={e => e.stopPropagation()}>
          <section>
            <div className="closeButton" onClick={closeLevelGuideModal}>
              <FontAwesomeIcon icon={faCircleXmark} className="levelGuideClose"/>
            </div>
            <div className="likeInfo">
              <div className="likeInfoTitle">
              댓글
              </div>
              <div className="likeInfoDetail">
                <div>댓글 작성 (5점)</div>
              </div>
            </div>
            <div className="postInfo">
              <div className="postInfoTitle">
              게시글
              </div>
              <div className="postInfoDetail">
                <div>게시글 작성 (50점)</div>
                <div className='subInfo'>게시글을 삭제하면 점수가 회수됩니다</div>
              </div>
            </div>
            <div className="levelPointInfo">
              <div className='levelPoints'>
                <div className='levelPointsUpper'>
                  5-4등급 : 50점
                </div>
                3-2등급 : 400점
              </div>
              <div className='levelPoints'>
                <div className='levelPointsUpper'>
                4-3등급 : 200점
                </div>
                2-1등급 : 600점
              </div>
            </div>
            <div className="levelBadgeGuide">
              <div className="levelBadgeGuideWrap">
                <div className="bronzeWrap">
                  <div className='bronzeBadge'>
                    <img src={bronze} alt="브론즈 뱃지"/>
                  </div>
                  <div className='bronzeBadgeName'>
                    5등급<br/>
                    브론즈
                  </div>
                </div>
                <div className="silverWrap">
                  <div className='silverBadge'>
                    <img src={silver} alt="실버 뱃지"/>
                  </div>
                  <div className='silverBadgeName'>
                    4등급<br/>
                    실버
                  </div>
                </div>
                <div className="goldWrap">
                  <div className='goldBadge'>
                    <img src={gold} alt="골드 뱃지"/>
                  </div>
                  <div className='goldBadgeName'>
                    3등급<br/>
                    골드
                  </div>
                </div>
                <div className="diamondWrap">
                  <div className='diamondBadge'>
                    <img src={diamond} alt="다이아몬드 뱃지"/>
                  </div>
                  <div className='diamondBadgeName'>
                    2등급<br/>
                    다이아
                  </div>
                </div>
                <div className="masterWrap">
                  <div className='masterBadge'>
                    <img src={master} alt="마스터 뱃지"/>
                  </div>
                  <div className='masterBadgeName'>
                    1등급<br/>
                    마스터
                  </div>
                </div>
              </div>
            </div>
            
          </section>
      </div>
      </div> : null}
    </div>
  )
}
export default LevelGuideModal