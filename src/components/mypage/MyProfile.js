import React from "react";
import "../../css/mypage.scss";


const MyProfile = (props) => {
  const {myInfo} = props

  return(
    <div className="myProfile">
      <div className="myProfilePic">
        <div className="myProfilePicCircle">
          <img src={myInfo && myInfo.userImgUrl} alt="프로필 이미지" />
        </div>
      </div>

      <div className="myProfileTxt">
        <div className="myProfileTxtTitle">
          <div className="myProfileName">{myInfo && myInfo.nickname}</div>
          
        </div>
        <div className="myProfileTxtDetail">
          {myInfo && myInfo.userInfo}
        </div>
      </div>
    </div>
  )
}

export default MyProfile