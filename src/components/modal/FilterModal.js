import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import swal from "sweetalert";
import "../../css/filterModal.scss";

const size = 5;

const FilterModal = (props) => {
  const dispatch = useDispatch();

  const nextPage = useSelector((state) => state.post.paging?.next);

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

  const loadFilterPost = (nextPage) => {
    const region_ = checkHasIncode(region);
    const price_ = checkHasIncode(priceSelect);
    const theme_ = checkHasIncode(themesetting);
    dispatch(userAction.initPagingDB());
    dispatch(userAction.clearDB());
    dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
    dispatch(userAction.isFilterDB());
  };

  const loadMainPost = (nextPage) => {
    const region_ = checkHasIncode(keyword);
    const price_ = checkHasIncode(priceSelect);
    const theme_ = checkHasIncode(themesetting);
    dispatch(userAction.initPagingDB());
    dispatch(userAction.clearDB());
    dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
    dispatch(userAction.isFilterDB());
    setClick(true);
  };

  const loadSearchPost = (nextPage) => {
    const region_ = checkHasIncode(listRegion);
    const price_ = checkHasIncode(priceSelect);
    const theme_ = checkHasIncode(themesetting);
    dispatch(userAction.initPagingDB());
    dispatch(userAction.clearDB());
    dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
    dispatch(userAction.isFilterDB());
  };

  const initialFilterPost = (nextPage) => {
    if (themeSelect.length === 0 && priceSelect === "") {
      dispatch(userAction.initPagingDB());
      dispatch(userAction.clearDB());
      dispatch(userAction.isFilterDB());
      dispatch(userAction.regionGETDB(checkHasIncode(region), nextPage, size));
    }
  };

  const initialMainPost = (nextPage) => {
    if (themeSelect.length === 0 && priceSelect === "") {
      swal({
        title: "테마, 가격을 골라주세요!",
        icon: "warning",
        closeOnClickOutside: false,
      }).then(function () {
        dispatch(userAction.initPagingDB());
        dispatch(userAction.clearDB());
        dispatch(userAction.isFilterDB());
        dispatch(userAction.arrayGetDB(keyword, nextPage, size));
        setClick(false);
      });
    }
  };

  const initialSearchPost = (nextPage) => {
    if (themeSelect.length === 0 && priceSelect === "") {
      dispatch(userAction.initPagingDB());
      dispatch(userAction.clearDB());
      dispatch(userAction.isFilterDB());
      dispatch(userAction.keywordGetDB(checkHasIncode(list), nextPage, size));
    }
    if (themeSelect === [list]) {
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
                    initialMainPost();
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                    onClick();
                  }}
                >
                  취소
                </button>
                <button
                  className="filtermodal-search"
                  onClick={() => {
                    loadMainPost();
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                    onClick();
                  }}
                  disabled={
                    themeSelect.length === 0 && priceSelect === ""
                      ? true
                      : false
                  }
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
                    initialFilterPost();
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                    onClick();
                  }}
                >
                  취소
                </button>
                <button
                  className="filtermodal-search"
                  onClick={() => {
                    loadFilterPost();
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                    onClick();
                  }}
                  disabled={
                    themeSelect.length === 0 && priceSelect === ""
                      ? true
                      : false
                  }
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
                    initialSearchPost();
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                    onClick();
                  }}
                >
                  취소
                </button>
                <button
                  className="filtermodal-search"
                  onClick={() => {
                    loadSearchPost();
                    setPrice(priceSelect);
                    setTheme(themeSelect);
                    onClick();
                  }}
                  disabled={
                    themeSelect.length === 0 && priceSelect === ""
                      ? true
                      : false
                  }
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
