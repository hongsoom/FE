import React, { useEffect, useState } from "react";
import "../../css/mypage.scss";

const UserLevelGaugeBar = (props) => {
  const { userInfo } = props;

  const [minPoint, setMinPoint] = useState("");
  const [gap, setGap] = useState("");
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    setMinPoint(() => {
      if (
        (userInfo && userInfo.grade === "NORMAL") ||
        (userInfo && userInfo.grade === null)
      ) {
        return 0;
      } else if (userInfo && userInfo.grade === "BRONZE") {
        return 10;
      } else if (userInfo && userInfo.grade === "SILVER") {
        return 50;
      } else if (userInfo && userInfo.grade === "GOLD") {
        return 200;
      } else if (userInfo && userInfo.grade === "DIAMOND") {
        return 400;
      } else if (userInfo && userInfo.grade === "MASTER") {
        return 600;
      }
    });
    setGap(() => {
      if (
        (userInfo && userInfo.grade === "NORMAL") ||
        (userInfo && userInfo.grade === null)
      ) {
        return 10;
      } else if (userInfo && userInfo.grade === "BRONZE") {
        return 40;
      } else if (userInfo && userInfo.grade === "SILVER") {
        return 150;
      } else if (userInfo && userInfo.grade === "GOLD") {
        return 200;
      } else if (userInfo && userInfo.grade === "DIAMOND") {
        return 200;
      } else if (userInfo && userInfo.grade === "MASTER") {
        return 200;
      }
    });
  }, [userInfo]);

  useEffect(() => {
    setPercentage(() => {
      return ((userInfo && userInfo.totalPoint - minPoint) / gap) * 100;
    });
  }, [gap, minPoint, percentage, userInfo]);

  return (
    <div className="myLevelGauge">
      <div
        className="myLevelGaugeWrap"
        style={
          (userInfo && userInfo.grade === "NORMAL") ||
          (userInfo && userInfo.grade === null)
            ? { width: "212px" }
            : { width: "164px" }
        }
      >
        <div
          className="myLevelGaugeFill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
export default UserLevelGaugeBar;
