import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import swal from "sweetalert";
import "../../css/filterModal.scss";

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
  } = props;

  const is_region = region ? true : false;
  const is_list = list ? true : false;
  const is_keyword = keyword ? true : false;

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

  const filterPost = (nextPage) => {
    errorMessage();
    initialCondition();
    filtering();
  };

  const initialPost = (nextPage) => {
    cancelCondition();
    initialCondition();
  };

  const filtering = () => {
    if (is_list) {
      const region_ = checkHasIncode(listRegion);
      dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
      clean();
    }

    if (is_keyword) {
      const region_ = checkHasIncode(keyword);
      dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
      setClick(true);
      clean();
    }

    if (is_region) {
      const region_ = checkHasIncode(region);
      dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
      clean();
    }
  };

  const initialCondition = () => {
    if (
      (themeSelect.length === 0 && isFilter) ||
      (priceSelect === "" && isFilter) ||
      is_list
    ) {
      clean();
      setPrice(priceSelect);
      setTheme(themeSelect);
      dispatch(userAction.keywordGetDB(checkHasIncode(list), nextPage, size));
      onClick();
    }

    if (
      (themeSelect.length === 0 && isFilter) ||
      (priceSelect === "" && isFilter) ||
      is_keyword
    ) {
      clean();
      dispatch(userAction.arrayGetDB(keyword, nextPage, size));
      setClick(false);
      onClick();
    }

    if (
      (themeSelect.length === 0 && isFilter) ||
      (priceSelect === "" && isFilter) ||
      is_region
    ) {
      clean();
      setPrice(priceSelect);
      setTheme(themeSelect);
      dispatch(userAction.regionGETDB(checkHasIncode(region), nextPage, size));
      onClick();
    }
  };

  const cancelCondition = () => {
    if (
      (themeSelect.length === 0 && priceSelect === "" && isFilter === false) ||
      (themeSelect.length !== 0 && isFilter) ||
      (priceSelect !== "" && isFilter)
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
      <div className="filtermodal-box">
        <div className="filtermodal-container">
          <div className="filtermodal-content">
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
                      >
                        {price}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {keyword === "" && (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
