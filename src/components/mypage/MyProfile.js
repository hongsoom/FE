import React, { useState } from "react";
import "../../css/mypage.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

// 컴포넌트
import LevelGuideModal from "../modal/LevelGuideModal";
import MyLevelGaugeBar from "./MyLevelGaugeBar";
import UserLevelGaugeBar from "./UserLevelGaugeBar";

// 아이콘
import user from "../../assets/user.png";
import bronze from "../../assets/bronze.png";
import silver from "../../assets/silver.png";
import gold from "../../assets/gold.png";
import diamond from "../../assets/diamond.png";
import master from "../../assets/master.png";

const MyProfile = (props) => {
  const { myInfo, userInfo, is_userId } = props;

  const [showLevelGuideModal, setShowLevelGuideModal] = useState(false); // 레벨가이드 모달

  // 레벨 가이드 모달 open / close
  const openLevelGuideModal = () => {
    setShowLevelGuideModal(true);
  };
  const closeLevelGuideModal = () => {
    setShowLevelGuideModal(false);
  };

  return (
    <>
      {is_userId ? (
        <>
          <div className="myProfile">
            <div className="myProfileDetail">
              <div className="myProfilePic">
                <div className="myProfilePicCircle">
                  {userInfo && userInfo.userImgUrl === null ? (
                    <img src={user} alt="프로필 기본이미지" />
                  ) : (
                    <img
                      src={userInfo && userInfo.userImgUrl}
                      alt="프로필 이미지"
                    />
                  )}
                </div>
              </div>
              <div className="myProfileTxt">
                <div className="myProfileName">
                  {userInfo && userInfo.nickname}
                </div>
                <div className="myLevel">
                  <div className="myBadge">
                    {userInfo && userInfo.grade === "BRONZE" ? (
                      <img src={bronze} alt="브론즈 뱃지" />
                    ) : userInfo && userInfo.grade === "SILVER" ? (
                      <img src={silver} alt="실버 뱃지" />
                    ) : userInfo && userInfo.grade === "GOLD" ? (
                      <img src={gold} alt="골드 뱃지" />
                    ) : userInfo && userInfo.grade === "DIAMOND" ? (
                      <img src={diamond} alt="다이아몬드 뱃지" />
                    ) : userInfo && userInfo.grade === "MASTER" ? (
                      <img src={master} alt="마스터 뱃지" />
                    ) : null}
                  </div>
                  <div
                    className="myLevelDetail"
                    style={
                      (userInfo && userInfo.grade === "NORMAL") ||
                      (userInfo && userInfo.grade === null)
                        ? { marginLeft: "0px" }
                        : { marginLeft: "8px" }
                    }
                  >
                    <div className="myLevelDetailUpper">
                      <div className="myLevelName">
                        {(userInfo && userInfo.grade === "NORMAL") ||
                        (userInfo && userInfo.grade === null)
                          ? "장소를 추천하면 뱃지가 생겨요!"
                          : userInfo && userInfo.grade === "BRONZE"
                          ? "5등급 브론즈"
                          : userInfo && userInfo.grade === "SILVER"
                          ? "4등급 실버"
                          : userInfo && userInfo.grade === "GOLD"
                          ? "3등급 골드"
                          : userInfo && userInfo.grade === "DIAMOND"
                          ? "2등급 다이아몬드"
                          : userInfo && userInfo.grade === "MASTER"
                          ? "1등급 마스터"
                          : null}
                      </div>
                      <div
                        className="myLevelGuide"
                        onClick={openLevelGuideModal}
                      >
                        <LevelGuideModal
                          closeLevelGuideModal={closeLevelGuideModal}
                          showLevelGuideModal={showLevelGuideModal}
                        />
                        <FontAwesomeIcon icon={faCircleQuestion} className="levelGuideButton"/>
                      </div>
                    </div>
                    <UserLevelGaugeBar userInfo={userInfo} />
                  </div>
                </div>
              </div>
            </div>
            <div className="myProfileTxtDetail">
              <div className="myProfileTxtWrap">
                {userInfo && userInfo.userInfo}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="myProfile">
            <div className="myProfileDetail">
              <div className="myProfilePic">
                <div className="myProfilePicCircle">
                  {myInfo && myInfo.userImgUrl === null ? (
                    <img src={user} alt="프로필 기본이미지" />
                  ) : (
                    <img
                      src={myInfo && myInfo.userImgUrl}
                      alt="프로필 이미지"
                    />
                  )}
                </div>
              </div>
              <div className="myProfileTxt">
                <div className="myProfileName">{myInfo && myInfo.nickname}</div>
                <div className="myLevel">
                  <div className="myBadge">
                    {myInfo && myInfo.grade === "BRONZE" ? (
                      <img src={bronze} alt="브론즈 뱃지" />
                    ) : myInfo && myInfo.grade === "SILVER" ? (
                      <img src={silver} alt="실버 뱃지" />
                    ) : myInfo && myInfo.grade === "GOLD" ? (
                      <img src={gold} alt="골드 뱃지" />
                    ) : myInfo && myInfo.grade === "DIAMOND" ? (
                      <img src={diamond} alt="다이아몬드 뱃지" />
                    ) : myInfo && myInfo.grade === "MASTER" ? (
                      <img src={master} alt="마스터 뱃지" />
                    ) : null}
                  </div>
                  <div
                    className="myLevelDetail"
                    style={
                      (myInfo && myInfo.grade === "NORMAL") ||
                      (myInfo && myInfo.grade === null)
                        ? { marginLeft: "0px" }
                        : { marginLeft: "8px" }
                    }
                  >
                    <div className="myLevelDetailUpper">
                      <div className="myLevelName">
                        {(myInfo && myInfo.grade === "NORMAL") ||
                        (myInfo && myInfo.grade === null)
                          ? "장소를 추천하면 뱃지가 생겨요!"
                          : myInfo && myInfo.grade === "BRONZE"
                          ? "5등급 브론즈"
                          : myInfo && myInfo.grade === "SILVER"
                          ? "4등급 실버"
                          : myInfo && myInfo.grade === "GOLD"
                          ? "3등급 골드"
                          : myInfo && myInfo.grade === "DIAMOND"
                          ? "2등급 다이아몬드"
                          : myInfo && myInfo.grade === "MASTER"
                          ? "1등급 마스터"
                          : null}
                      </div>
                      <div
                        className="myLevelGuide"
                        onClick={openLevelGuideModal}
                      >
                        <LevelGuideModal
                          closeLevelGuideModal={closeLevelGuideModal}
                          showLevelGuideModal={showLevelGuideModal}
                        />
                        <FontAwesomeIcon icon={faCircleQuestion} className="levelGuideButton"/>
                      </div>
                    </div>
                    <MyLevelGaugeBar myInfo={myInfo} />
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
        </>
      )}
    </>
  );
};

export default MyProfile;
