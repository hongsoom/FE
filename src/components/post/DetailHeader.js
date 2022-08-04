import React from "react";
import "../../css/detail.scss";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deletePostDB } from "../../redux/module/post";

// 아이콘
import leftArrowBlack from "../../assets/leftArrowBlack.png";
import editblack from "../../assets/editblack.png";
import trash from "../../assets/trash.png";
import bronze from "../../assets/bronze.png";
import silver from "../../assets/silver.png";
import gold from "../../assets/gold.png";
import diamond from "../../assets/diamond.png";
import master from "../../assets/master.png";
import user from "../../assets/user.png";

import DetailPlaceModal from "../../components/modal/DetailPlaceModal"

const DetailHeader = (props) =>{
  const {data, userInfo, showPlaceModal, setShowPlaceModal, list, openPlaceModal, myMap, setFocus} = props
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams().id;

  // 메인으로 돌아가기 버튼
  const onClickLeftArrow = () => {
    navigate("/");
  };

  // 수정하러 가기
  const onModifyHandler = () => {
    navigate(`/write/${param}`);
  };

  // 길찾기 버튼
  const onKakaoTrafficHandler = () => {
    navigate(`/detail/${param}/kakaomap`, { state: { data: data } });
  };

  const closePlaceModal = () => {
    setShowPlaceModal(false);
  };

  // -------------- 게시글 데이터 삭제하기
  const onDeleteHandler = () => {
    swal({
      title: "삭제하시겠습니까?",
      text: "삭제시 등급 게이지가 줄어듭니다",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("삭제되었습니다!", {
          icon: "success",
        });
        dispatch(deletePostDB(param));
        navigate("/");
      } else {
        swal("취소되었습니다");
      }
    });
  };

  const checkAllFin = () =>{
    setShowPlaceModal(false)
    list(data.place)
  }

  return(
    <div className="detailHeader">
      <div className="detailHeaderWrap">
        <div className="detailUpperHeader">
          <div className="preIcon" onClick={onClickLeftArrow}>
            <img src={leftArrowBlack} alt="홈으로 이동" />
          </div>
          <div className="title">{data && data.title}</div>
          <div className="icons">
            {userInfo && data && userInfo.nickname === data.nickname ? (
              <>
                <div className="editIcon">
                  <img
                    src={editblack}
                    alt="수정하기"
                    onClick={onModifyHandler}
                  />
                </div>
                <div className="trashIcon">
                  <img src={trash} alt="삭제하기" onClick={onDeleteHandler} />
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="detailMiddleHeader">
          <div className="profile">
            <div className="profilePic">
              {data && data.userImgUrl ? (
                <img src={`${data.userImgUrl}`} alt="프로필 이미지" />
              ) : (
                <img src={user} alt="기본 프로필 이미지" />
              )}
            </div>
            <div className="myBadge">
              {data && data.grade === "BRONZE" ? (
                <img className="badge" src={bronze} alt="브론즈 뱃지" />
              ) : data && data.grade === "SILVER" ? (
                <img className="badge" src={silver} alt="실버 뱃지" />
              ) : data && data.grade === "GOLD" ? (
                <img className="badge" src={gold} alt="골드 뱃지" />
              ) : data && data.grade === "DIAMOND" ? (
                <img className="badge" src={diamond} alt="다이아몬드 뱃지" />
              ) : data && data.grade === "MASTER" ? (
                <img className="badge" src={master} alt="마스터 뱃지" />
              ) : null}
            </div>
            <div className="nick">
              {data && data.nickname && data.nickname}
            </div>
            <div className="profileTags">
              {data &&
                data.themeCategory.map((v, i) => {
                  return (
                    <div className="themeCategory" key={i}>
                      #{v.themeCategory}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="detailLowerHeader">
          <div className="modalButtons">
            <div className="regionButton">
              🗺 {data && data.regionCategory}
            </div>
            <div className="priceButton">💸 {data && data.priceCategory}</div>
            {/* 선택한 장소 확인하기 */}
            <div className="placeButton" onClick={openPlaceModal}>
              🔎 장소 리스트
              <div className="places">
                <DetailPlaceModal
                  data={data}
                  myMap={myMap}
                  showPlaceModal={showPlaceModal}
                  setFocus={setFocus}
                  closePlaceModal={closePlaceModal}
                  checkAllFin={checkAllFin}
                />
              </div>
            </div>
            <div className="kakaomapButton" onClick={onKakaoTrafficHandler}>
              길찾기
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default DetailHeader