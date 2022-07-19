import React from "react";
import "../../css/webShare.css";
import close from "../../assets/close.png";
import urlshare from "../../assets/urlshare.png";
import kakaoshare from "../../assets/kakaoshare.png";

const WebShare = ({ webShare }) => {
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
            <img src={kakaoshare} alt="close" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebShare;
