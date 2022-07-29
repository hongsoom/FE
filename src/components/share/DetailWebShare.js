import React from "react";
import swal from "sweetalert";
import "../../css/detailWebShare.scss";
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
  const url = `http://yaneogal.site/detail/${postId}`;

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
    <div className="detail_webshare-box">
      <div className="detail_webshare-container">
        <div className="detail_webshare-content">
          <div className="detail_webshare-share">
            <img
              className="detail_webshare-url"
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
          <div className="detail_webshare-button">
            <button onClick={webShare}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebShare;
