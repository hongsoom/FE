import React from 'react'
import '../../css/post.scss'
import swal from "sweetalert";

import ImageSlide from "../imageSlide/ImageSlide";

// 아이콘
import logosky from "../../assets/logosky.png";
import trashwhite from "../../assets/trashwhite.png";

const PostSectionPerPlace = (props) => {
  const {select, setSelect, focus, setFocus, list, setImgUrl, imgUrl, imgs, setImgs, openPlaceModal, editdata} = props

  // 장소 선택 취소
  const onRemovePlace = (place) => {
    swal({
      title: "이 장소를 삭제할까요?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("목록에서 삭제되었습니다", {
          icon: "success",
        });
        if (select && select.length !== 0) {
          setFocus(select && select[0].place_name);
        }
        setSelect((pre) => {
          const newSelect = pre.filter((v, i) => {
            return place.place_name !== v.place_name;
          });
          list(newSelect);
          return newSelect;
        });
        setImgUrl((pre) => {
          const imgUrlList = pre.filter((v, i) => {
            return place.place_name !== v.place_name;
          });
          return imgUrlList;
        });
      } else {
        swal("삭제를 취소했습니다");
      }
    });
  };

  return(
    <>
  {/* 검색하고 선택한 장소가 없을 때 */}
  {select && select.length === 0 ? (
    <div className="sectionWrap">
      {/* 바뀌는 부분 */}
      <div className="sectionPerPlace">
        <div className="sectionPerPlaceWrap">
          {/* 사진업로드 */}
          <div className="imgUpload">
            {/* 사진업로드하는 장소 이름 */}
            <div className="imgUploadHeader">
              <div className="imgUploadTitle">
                <div className="titleTxtWrap">
                  <img src={logosky} alt="야너갈 로고"/>
                    최상단 검색창에서 장소를 검색해주세요!
                </div>
                <div className="clickInfo">
                  ❗여러 장소를 검색하고 선택할 수 있어요!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : focus && focus.length !== 0 ? (
    <div className="sectionWrap">
      {/* 검색해서 장소를 선택했고 핀을 클릭했을 때 */}
      {/* 바뀌는 부분 */}
      <div className="sectionPerPlace">
        {select &&
          select.map((l, j) => {
            return (
              <div
                className="sectionPerPlaceWrap"
                key={j}
                style={
                  focus === l.place_name
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                {/* 사진업로드 */}
                <div className="imgUpload">
                  {/* 사진업로드하는 장소 이름 */}
                  <div className="imgUploadHeader">
                    <div className="imgUploadTitle" onClick={openPlaceModal}>
                      <div className="titleTxtWrap">
                        <img src={logosky} alt="야너갈 로고" />
                        {l.place_name}
                      </div>
                      <div className="clickInfo">
                        ❗여러 장소를 검색하고 선택할 수 있어요!
                      </div>
                    </div>
                    <div
                      className="removePlaceButton"
                      onClick={() => {
                        onRemovePlace(l);
                      }}
                    >
                      <img src={trashwhite} alt="장소 삭제 버튼" />이 장소
                      삭제
                    </div>
                  </div>
                  <ImageSlide
                    select={select}
                    setSelect={setSelect}
                    imgUrl={imgUrl}
                    setImgUrl={setImgUrl}
                    setImgs={setImgs}
                    imgs={imgs}
                    l={l}
                    j={j}
                    focus={focus}
                    setFocus={setFocus}
                    editdata={editdata}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <div className="sectionWrap">
      {/* 검색해서 장소를 선택했지만 핀을 클릭하지 않았을 때 */}
      {/* 바뀌는 부분 */}
      <div className="sectionPerPlace">
        <div className="sectionPerPlaceWrap">
          {/* 사진업로드 */}
          <div className="imgUpload">
            {/* 사진업로드하는 장소 이름 */}
            <div className="imgUploadHeader">
              <div className="imgUploadTitle" onClick={openPlaceModal}>
                <div className="titleTxtWrap">
                  <img src={logosky} alt="야너갈 로고" />
                  {select && select[0] && select[0].place_name}
                </div>
                <div className="clickInfo">
                  ❗여러 장소를 검색하고 선택할 수 있어요!
                </div>
              </div>
              <div
                className="removePlaceButton"
                onClick={() => {
                  onRemovePlace(select && select[0]);
                }}
              >
                <img src={trashwhite} alt="장소 삭제 버튼" />이 장소 삭제
              </div>
            </div>
            <ImageSlide
              select={select}
              setSelect={setSelect}
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              setImgs={setImgs}
              imgs={imgs}
              l={select[0] && select[0]}
              j={0}
              focus={focus}
              setFocus={setFocus}
              editdata={editdata}
            />
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  )
}
export default PostSectionPerPlace