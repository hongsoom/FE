import React, {useState} from "react";
import "../../css/mypage.scss";

// 컴포넌트
import LevelGuideModal from "../modal/LevelGuideModal"
import MyLevelGaugeBar from "./MyLevelGaugeBar";

// 아이콘
import user from "../../assets/user.png";
import levelGuide from "../../assets/levelGuide.png"
import bronze from "../../assets/bronze.png";
import silver from "../../assets/silver.png";
import gold from "../../assets/gold.png";
import diamond from "../../assets/diamond.png"
import master from "../../assets/master.png"


const MyProfile = (props) => {
  const { myInfo } = props;

  const [showLevelGuideModal, setShowLevelGuideModal] = useState(false); // 레벨가이드 모달

  // 레벨 가이드 모달 open / close
  const openLevelGuideModal = () => {
    setShowLevelGuideModal(true)
  }
  const closeLevelGuideModal = () => {
    setShowLevelGuideModal(false)
  }


  return (
    <div className="myProfile">
      <div className="myProfileDetail">
        <div className="myProfilePic">
          <div className="myProfilePicCircle">
            {myInfo&&myInfo.userImgUrl === null ? (
              <img src={user} alt="프로필 기본이미지" />
            ) : (
              <img src={myInfo && myInfo.userImgUrl} alt="프로필 이미지" />
            )}
          </div>
        </div>
        <div className="myProfileTxt">
            <div className="myProfileName">
              {myInfo && myInfo.nickname}
            </div>
            <div className="myLevel">
              <div className="myBadge">
                {myInfo&&myInfo.grade === 'BRONZE' ? 
                  <img src={bronze} alt="브론즈 뱃지"/>
                  :
                  myInfo&&myInfo.grade === 'SILVER' ? 
                  <img src={silver} alt="실버 뱃지"/>
                  :
                  myInfo&&myInfo.grade === 'GOLD' ? 
                  <img src={gold} alt="골드 뱃지"/>
                  :
                  myInfo&&myInfo.grade === 'DIA' ? 
                  <img src={diamond} alt="다이아몬드 뱃지"/>
                  :
                  myInfo&&myInfo.grade === 'MASTER' ? 
                  <img src={master} alt="마스터 뱃지"/>
                  :
                  null
                }
              </div>
              <div className="myLevelDetail">
                <div className="myLevelDetailUpper">
                  <div className="myLevelName">
                  {myInfo&&myInfo.grade === 'BRONZE' ? 
                  '5등급 브론즈'
                  :
                  myInfo&&myInfo.grade === 'SILVER' ? 
                  '4등급 실버'
                  :
                  myInfo&&myInfo.grade === 'GOLD' ? 
                  '3등급 골드'
                  :
                  myInfo&&myInfo.grade === 'DIA' ? 
                  '2등급 다이아몬드'
                  :
                  myInfo&&myInfo.grade === 'MASTER' ? 
                  '1등급 마스터'
                  :
                  null
                }
                  </div>
                  <div className="myLevelGuide"
                  onClick={openLevelGuideModal}
                  >
                    <LevelGuideModal closeLevelGuideModal={closeLevelGuideModal} showLevelGuideModal={showLevelGuideModal}
                    />
                    <img className="levelGuideButton" src={levelGuide} alt="레벨 가이드 버튼"/>
                  </div>
                </div>
                <MyLevelGaugeBar myInfo={myInfo}/>
              </div>  
            </div>
        </div>
      </div>
      <div className="myProfileTxtDetail">
        <div className="myProfileTxtWrap">
        {myInfo && myInfo.userInfo}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
