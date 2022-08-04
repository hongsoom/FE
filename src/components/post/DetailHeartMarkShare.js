import React, {useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { clickBookmarkDB, clickLoveDB } from "../../redux/module/post";

import DetailWebShare from "../share/DetailWebShare";

import bookmark from "../../assets/bookmark.png";
import shareblack from "../../assets/shareblack.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const DetailHeartMarkShare = (props) => {
  const {data, param} = props
  const [shareMove, setShareMove] = useState(false);
  const dispatch = useDispatch();
  const Id = useSelector((state) => state.post.postId);

  const webShare = () => {
    setShareMove(!shareMove);
  };

  return(
    <>
    {shareMove ? (
      <DetailWebShare
        webShare={webShare}
        title={data && data.title}
        imgUrl={data && data.place[0] && data.place[0].imgUrl[0]}
        loveCount={data && data.loaveCount}
        postId={data && data.postId}
        regionCategory={data && data.regionCategory}
        priceCategory={data && data.priceCategory}
        themeCategory={data && data.themeCategory}
      />
      ) : null}
      {/* 좋아요 즐겨찾기 버튼 */}
      <div className="heartNbookmarkIcon">
        <div className="iconsWrap">
          <div
            className="heartIcon"
            onClick={() => dispatch(clickLoveDB(param))}
          >
            {data.loveStatus === true ? (
              <img src={heartFull} alt="heartFull" />
            ) : (
              <img src={heartEmpty} alt="heartEmpty" />
            )}
          </div>
          <div className="heartNum">{data && data.loveCount}</div>
          <div
            className="bookmarkIcon"
            onClick={() => dispatch(clickBookmarkDB(param))}
          >
            {data.postId === Id ? (
              data.bookmarkStatus === false ? (
                <img src={bookmark} alt="즐겨찾기 버튼" />
              ) : (
                <img src={bookmarkBlue} alt="즐겨찾기 완료" />
              )
            ) : data.bookmarkStatus === false ? (
              <img src={bookmark} alt="즐겨찾기 버튼" />
            ) : (
              <img src={bookmarkBlue} alt="즐겨찾기 완료" />
            )}
          </div>
          <div className="shareIcon" onClick={webShare}>
            <img src={shareblack} alt="공유하기 버튼" />
          </div>
        </div>
      </div>
    </>
  )
}
export default DetailHeartMarkShare