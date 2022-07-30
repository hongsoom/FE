import React, { useEffect, useState } from "react";
import "../../css/mypage.scss";

const MyLevelGaugeBar = (props) => {
  const { myInfo, userInfo } = props;

  const [minPoint, setMinPoint] = useState("");
  const [gap, setGap] = useState("");
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    setMinPoint(() => {
      if (
        (myInfo && myInfo.grade === "NORMAL") ||
        (myInfo && myInfo.grade === null)
      ) {
        return 0;
      } else if (myInfo && myInfo.grade === "BRONZE") {
        return 10;
      } else if (myInfo && myInfo.grade === "SILVER") {
        return 50;
      } else if (myInfo && myInfo.grade === "GOLD") {
        return 200;
      } else if (myInfo && myInfo.grade === "DIAMOND") {
        return 400;
      } else if (myInfo && myInfo.grade === "MASTER") {
        return 600;
      }
    });
    setGap(() => {
      if (
        (myInfo && myInfo.grade === "NORMAL") ||
        (myInfo && myInfo.grade === null)
      ) {
        return 10;
      } else if (myInfo && myInfo.grade === "BRONZE") {
        return 40;
      } else if (myInfo && myInfo.grade === "SILVER") {
        return 150;
      } else if (myInfo && myInfo.grade === "GOLD") {
        return 200;
      } else if (myInfo && myInfo.grade === "DIAMOND") {
        return 200;
      } else if (myInfo && myInfo.grade === "MASTER") {
        return 200;
      }
    });
  }, [myInfo]);

  useEffect(() => {
    setPercentage(() => {
      return ((myInfo && myInfo.totalPoint - minPoint) / gap) * 100;
    });
  }, [gap, minPoint, percentage]);

  return (
    <div className="myLevelGauge">
      {}
      <div
        className="myLevelGaugeWrap"
        style={
          (myInfo && myInfo.grade === "NORMAL") ||
          (myInfo && myInfo.grade === null)
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
export default MyLevelGaugeBar;
