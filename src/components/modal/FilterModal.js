import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import swal from "sweetalert";
import "../../css/filterModal.scss";
import reset from "../../assets/reset.png";

const size = 5;

const FilterModal = (props) => {
  const dispatch = useDispatch();

  const nextPage = useSelector((state) => state.post.paging?.next);
  const isFilter = useSelector((state) => state.post.isFilter);

  const {
    onClick,
    setClick,
    keyword,
    region,
    list,
    listRegion,
    themeSelect,
    priceSelect,
    setThemeSelect,
    setPriceSelect,
    setPrice,
    setTheme,
    theme,
    price,
  } = props;

  const is_region = region ? true : false;
  const is_list = list ? true : false;
  const is_keyword = keyword === "" ? true : false;

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
  const backgroundRef = useRef(null);

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

  const price_ = checkHasIncode(priceSelect);
  const theme_ = checkHasIncode(themesetting);
  console.log("priceSelect", priceSelect);

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
      (themeSelect.length !== 0 && is_list) ||
      (priceSelect !== "" && is_list)
    ) {
      clean();
      console.log("priceSelect", priceSelect);
      console.log("themesetting", themesetting);
      const region_ = checkHasIncode(listRegion);
      dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
    }

    if (
      (themeSelect.length !== 0 && is_keyword) ||
      (priceSelect !== "" && is_keyword)
    ) {
      clean();
      setClick(true);
      const region_ = checkHasIncode(keyword);
      dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
    }

    if (
      (themeSelect.length !== 0 && is_region) ||
      (priceSelect !== "" && is_region)
    ) {
      clean();
      const region_ = checkHasIncode(region);
      dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
    }
  };

  const initialCondition = (nextPage) => {
    if (
      (themeSelect.length === 0 && isFilter && is_list) ||
      (priceSelect === "" && isFilter && is_list)
    ) {
      clean();
      dispatch(userAction.keywordGetDB(checkHasIncode(list), nextPage, size));
      onClick();
    }

    if (
      (themeSelect.length === 0 && isFilter && is_keyword) ||
      (priceSelect === "" && isFilter && is_keyword)
    ) {
      clean();
      dispatch(userAction.arrayGetDB(keyword, nextPage, size));
      setClick(false);
      onClick();
    }

    if (
      (themeSelect.length === 0 && isFilter && is_region) ||
      (priceSelect === "" && isFilter && is_region)
    ) {
      clean();
      dispatch(userAction.regionGETDB(checkHasIncode(region), nextPage, size));
      onClick();
    }
  };

  const cancelCondition = () => {
    if (
      (themeSelect.length === 0 && priceSelect === "" && isFilter === false) ||
      (themeSelect.length !== 0 && isFilter) ||
      (priceSelect !== "" && isFilter) ||
      (theme.includes(list) && isFilter === false)
    ) {
      onClick();
    }

    if (
      (themeSelect.length !== 0 && isFilter === false) ||
      (priceSelect !== "" && isFilter === false)
    ) {
      setPriceSelect("");
      setThemeSelect([]);
      onClick();
    }

    if (
      (theme.includes(list) && isFilter === false) ||
      (price.includes(list) && isFilter === false)
    ) {
      setPriceSelect(list);
      setThemeSelect([list]);
      onClick();
    }

    if (themeSelect.length === 0 && priceSelect === "" && isFilter) {
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
    if (themeSelect.length === 0 && priceSelect === "" && isFilter === false) {
      swal({
        title: "한가지를 꼭 골라주세요!",
        icon: "warning",
        closeOnClickOutside: false,
      });
      return;
    }
  };

  const filterReset = () => {
    setPriceSelect("");
    setThemeSelect([]);
    if (theme.includes(list) || price.includes(list)) {
      setPriceSelect(list);
      setThemeSelect([list]);
    }
  };

  const handleClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      onClick();
    }
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

  console.log(isFilter);

  return (
    <>
      <div className="filtermodal-box">
        <div className="filtermodal-container">
          <div
            className="filtermodal-content"
            ref={backgroundRef}
            onClick={handleClickBackground}
          >
            <div className="filtermodal-theme">
              <div className="filtermodal-themetitle">
                <p className="filtermodal-themes">테마</p>
                <p className="filtermodal-reset" onClick={filterReset}>
                  필터 초기화 <img src={reset} alt="reset" />
                </p>
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
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                  }}
                >
                  취소
                </button>
                <button
                  className="filtermodal-search"
                  onClick={() => {
                    filterPost();
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                    onClick();
                  }}
                >
                  선택 완료
                </button>
              </div>
            )}
            {is_region && (
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
