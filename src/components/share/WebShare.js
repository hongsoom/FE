import React from "react";
import swal from "sweetalert";
import "../../css/webShare.scss";
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
  const url = `https://yaneogal.site/detail/${postId}`;

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
          <div className="webshare-share">
            <img
              className="webshare-url"
              src={urlshare}
              alt="close"
              onClick={() => {
                clip(url);
                swal({
                  title: "링크가 복사되었습니다!",
                  icon: "success",
                  closeOnClickOutside: false,
                }).then(function () {
                  webShare();
                });
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
          <div className="webshare-button">
            <button onClick={webShare}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebShare;
