import React, { useEffect } from "react";
import "../../css/webShare.css";
import close from "../../assets/close.png";
import urlshare from "../../assets/urlshare.png";
import kakaoshare from "../../assets/kakaoshare.png";

const WebShare = ({ webShare }) => {
  const url = window.location.href;
  useEffect(() => {
    initKakao();
  }, []);

  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(`${process.env.REACT_APP_KAKAO_KEY}`);
      }
    }
  };

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "딸기 치즈 케익",
        description: "#케익 #딸기 #삼평동 #카페 #분위기 #소개팅",
        imageUrl:
          "http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        {
          title: "앱으로 보기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <div className="webshare-box">
      <div className="webshare-container">
        <div className="webshare-content">
          <div className="webshare-title">
            <p>공유하기</p>
            <img src={close} alt="close" onClick={webShare} />
          </div>
          <div className="webshare-share">
            <img src={urlshare} alt="close" />
            <img src={kakaoshare} alt="close" onClick={shareKakao} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebShare;
