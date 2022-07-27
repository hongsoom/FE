import React from "react";
import "../../css/mypage.scss";
import user from "../../assets/user.png";

const MyProfile = (props) => {
  const { myInfo } = props;
  console.log(myInfo);
  return (
    <div className="myProfile">
      <div className="myProfilePic">
        <div className="myProfilePicCircle">
          {myInfo.userImgUrl === null ? (
            <img src={user} alt="프로필 기본이미지" />
          ) : (
            <img src={myInfo && myInfo.userImgUrl} alt="프로필 이미지" />
          )}
        </div>
      </div>

      <div className="myProfileTxt">
        <div className="myProfileTxtTitle">
          <div className="myProfileName">{myInfo && myInfo.nickname}</div>
        </div>
        <div className="myProfileTxtDetail">{myInfo && myInfo.userInfo}</div>
      </div>
    </div>
  );
};

export default MyProfile;
