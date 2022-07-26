import React, { useEffect, useRef } from "react";
import "../../css/webShare.scss";
import close from "../../assets/close.png";
import urlshare from "../../assets/urlshare.png";
import kakaoshare from "../../assets/kakaoshare.png";

const WebShare = ({
  webShare,
  title,
  loveCount,
  postId,
  imgUrl,
  themeCategory,
  priceCategory,
  regionCategory,
}) => {
  const url = `http://localhost:3000/detail/${postId}`;

  const clip = (url) => {
    navigator.clipboard.writeText(url);
  };

  const shareKakao = () => {
    const themes = [];
    themeCategory.map((list) => {
      themes.push(list.themeCategory);
    });
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: `#${regionCategory} #${themes.join(
          " #"
        )} #${priceCategory}`,
        imageUrl: imgUrl[0],
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      social: {
        likeCount: loveCount,
      },
      buttons: [
        {
          title: "웹으로 보기",
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
            <img
              src={urlshare}
              alt="close"
              onClick={() => {
                clip(url);
                webShare();
              }}
            />
            <a className="kakao_share">
              <img
                src={kakaoshare}
                alt="close"
                onClick={() => {
                  shareKakao();
                  webShare();
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebShare;
