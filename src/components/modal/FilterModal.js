import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAction } from "../../redux/module/post";
import swal from "sweetalert";
import "../../css/filterModal.scss";
import reset from "../../assets/reset.png";

const size = 5;

const FilterModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nextPage = useSelector((state) => state.post.paging?.next);
  const isFilter = useSelector((state) => state.post.isFilter);

  const {
    onClick,
    keyword,
    list,
    regionSelect,
    themeSelect,
    priceSelect,
    setRegionSelect,
    setThemeSelect,
    setPriceSelect,
    setRegion,
    setPrice,
    setTheme,
    region,
    theme,
    price,
  } = props;

  const is_list = list ? true : false;
  const is_keyword = keyword === "" ? true : false;

  const areas = [
    "서울",
    "경기",
    "인천",
    "강원도",
    "충청도",
    "전라도",
    "경상도",
    "대전",
    "세종",
    "대구",
    "울산",
    "광주",
    "부산",
    "제주도",
  ];
  const themes = ["힐링", "맛집", "애견동반", "액티비티", "호캉스"];
  const prices = [
    "10만원 이하",
    "10만원대",
    "20만원대",
    "30만원대",
    "40만원대",
    "50만원 이상",
  ];

  const [themesetting, setThemeSetting] = useState("");

  const modalClick = useRef();

  const handlePayModalOff = (e) => {
    const clicked = e.target;

    if (clicked === modalClick.current) {
      onClick();
    } else {
      return;
    }
  };

  const checkHasIncode = (value) => {
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (value === undefined) {
      return (value = "");
    }

    if (value.match(check_kor)) {
      const encodeKeyword = encodeURI(value);
      return encodeKeyword;
    } else {
      return value;
    }
  };

  const region_ = checkHasIncode(regionSelect);
  const price_ = checkHasIncode(priceSelect);
  const theme_ = checkHasIncode(themesetting);

  const filterPost = (nextPage) => {
    errorMessage();
    filtering();
    initialCondition();
  };

  const initialPost = () => {
    cancelCondition();
  };

  const filtering = (nextPage) => {
    if (
      (regionSelect !== "" && is_list) ||
      (themeSelect.length !== 0 && is_list) ||
      (priceSelect !== "" && is_list)
    ) {
      clean();
      dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
    }

    if (
      (regionSelect !== "" && is_keyword) ||
      (themeSelect.length !== 0 && is_keyword) ||
      (priceSelect !== "" && is_keyword)
    ) {
      clean();
      dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
    }
  };

  const initialCondition = (nextPage) => {
    if (
      (region.includes(list) && isFilter && is_list) ||
      (theme.includes(list) && isFilter && is_list) ||
      (price.includes(list) && isFilter && is_list)
    ) {
      clean();
      dispatch(userAction.keywordGetDB(checkHasIncode(list), nextPage, size));
      onClick();
      return;
    }

    if (
      (regionSelect === "" && isFilter && is_keyword) ||
      (themeSelect.length === 0 && isFilter && is_keyword) ||
      (priceSelect === "" && isFilter && is_keyword)
    ) {
      clean();
      dispatch(userAction.arrayGetDB(keyword, nextPage, size));
      onClick();
      return;
    }

    if (
      (regionSelect === "" && isFilter) ||
      (themeSelect.length === 0 && isFilter) ||
      (priceSelect === "" && isFilter)
    ) {
      clean();
      navigate("/");
      return;
    }
  };

  const cancelCondition = () => {
    if (
      (regionSelect === "" &&
        themeSelect.length === 0 &&
        priceSelect === "" &&
        isFilter === false) ||
      (regionSelect !== "" && isFilter) ||
      (themeSelect.length !== 0 && isFilter) ||
      (priceSelect !== "" && isFilter) ||
      (theme.includes(list) && isFilter === false)
    ) {
      onClick();
    }

    if (
      (regionSelect !== "" && isFilter === false) ||
      (themeSelect.length !== 0 && isFilter === false) ||
      (priceSelect !== "" && isFilter === false)
    ) {
      setRegionSelect("");
      setPriceSelect("");
      setThemeSelect([]);
      onClick();
    }

    if (
      (region.includes(list) && isFilter === false) ||
      (theme.includes(list) && isFilter === false) ||
      (price.includes(list) && isFilter === false)
    ) {
      setRegionSelect(list);
      setPriceSelect(list);
      setThemeSelect([list]);
      onClick();
    }

    if (
      regionSelect === "" &&
      themeSelect.length === 0 &&
      priceSelect === "" &&
      isFilter
    ) {
      swal({
        title: "선택 완료를 눌러주세요!",
        icon: "warning",
        closeOnClickOutside: false,
      });
      return;
    }
  };

  const clean = () => {
    dispatch(userAction.initPagingDB());
    dispatch(userAction.clearDB());
    dispatch(userAction.isFilterDB());
  };

  const errorMessage = () => {
    if (
      regionSelect === "" &&
      themeSelect.length === 0 &&
      priceSelect === "" &&
      isFilter === false
    ) {
      swal({
        title: "한가지를 꼭 골라주세요!",
        icon: "warning",
        closeOnClickOutside: false,
      });
      return;
    }
  };

  const filterReset = () => {
    if (region.includes(list) && list) {
      setRegionSelect(list);
      setPriceSelect("");
      setThemeSelect([]);
      return;
    }

    if (theme.includes(list) && list) {
      setRegionSelect("");
      setPriceSelect("");
      setThemeSelect([list]);
      return;
    }

    if (price.includes(list) && list) {
      setRegionSelect("");
      setPriceSelect(list);
      setThemeSelect([]);
      return;
    }

    setRegionSelect("");
    setPriceSelect("");
    setThemeSelect([]);
  };

  useEffect(() => {
    if (themeSelect.length > 0) {
      setThemeSetting(themeSelect.toString());
    }

    if (themeSelect.length === 0) {
      setThemeSetting("");
    }

    if (priceSelect === undefined) {
      setPriceSelect("");
    }
  }, [themeSelect, priceSelect]);

  return (
    <>
      <div
        className="filtermodal-box"
        ref={modalClick}
        onClick={(e) => handlePayModalOff(e)}
      >
        <div className="filtermodal-container">
          <div className="filtermodal-content">
            <div className="filtermodal-region">
              <div className="filtermodal-regiontitle">
                <p className="filtermodal-regions">지역</p>
                <p className="filtermodal-reset" onClick={filterReset}>
                  필터 초기화 <img src={reset} alt="reset" />
                </p>
              </div>
              <div className="filtermodal-regionbutton">
                {areas.map((region, i) => {
                  return (
                    <div className="filtermodal-main-category-region" key={i}>
                      <button
                        key={i}
                        onClick={() => {
                          !regionSelect.includes(region)
                            ? setRegionSelect(region)
                            : setRegionSelect("");
                        }}
                        className={
                          regionSelect.includes(region)
                            ? "table_btn_s"
                            : "table_btn_ns"
                        }
                        disabled={region === list ? true : false}
                      >
                        {region}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="filtermodal-theme">
              <div className="filtermodal-themetitle">
                <p>테마</p>
              </div>
              <div className="filtermodal-themebutton">
                {themes.map((theme, i) => {
                  return (
                    <div className="filtermodal-main-category-theme" key={i}>
                      <button
                        key={i}
                        onClick={() => {
                          !themeSelect.includes(theme)
                            ? setThemeSelect((themeSelect) => [
                                ...themeSelect,
                                theme,
                              ])
                            : setThemeSelect(
                                themeSelect.filter((button) => button !== theme)
                              );
                        }}
                        className={
                          themeSelect.includes(theme)
                            ? "table_btn_s"
                            : "table_btn_ns"
                        }
                        disabled={theme === list ? true : false}
                      >
                        {theme}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="filtermodal-price">
              <div className="filtermodal-pricetitle">
                <p>가격</p>
              </div>
              <div className="filtermodal-pricebutton">
                {prices.map((price, i) => {
                  return (
                    <div className="filtermodal-main-category-price" key={i}>
                      <button
                        key={i}
                        onClick={() => {
                          !priceSelect.includes(price)
                            ? setPriceSelect(price)
                            : setPriceSelect("");
                        }}
                        className={
                          priceSelect.includes(price)
                            ? "table_btn_s"
                            : "table_btn_ns"
                        }
                        disabled={price === list ? true : false}
                      >
                        {price}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {is_keyword && (
              <div className="filtermodal-filterbutton">
                <button
                  className="filtermodal-cancel"
                  onClick={() => {
                    initialPost();
                  }}
                >
                  취소
                </button>
                <button
                  className="filtermodal-search"
                  onClick={() => {
                    setRegion(regionSelect);
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                    filterPost();
                    onClick();
                  }}
                >
                  선택 완료
                </button>
              </div>
            )}
            {is_list && (
              <div className="filtermodal-filterbutton">
                <button
                  className="filtermodal-cancel"
                  onClick={() => {
                    initialPost();
                  }}
                >
                  취소
                </button>
                <button
                  className="filtermodal-search"
                  onClick={() => {
                    setRegion(regionSelect);
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                    filterPost();
                    onClick();
                  }}
                >
                  선택 완료
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
