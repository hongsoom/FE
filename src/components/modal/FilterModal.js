import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/module/post";
import "../../css/filterModal.scss";

const size = 5;

const FilterModal = (props) => {
  const dispatch = useDispatch();

  const nextPage = useSelector((state) => state.post.paging?.next);

  const {
    onClick,
    keyword,
    region,
    list,
    listRegion,
    themeSelect,
    priceSelect,
    setThemeSelect,
    setPriceSelect,
  } = props;

  const is_region = region ? true : false;
  const is_list = list ? true : false;

  const themes = ["힐링", "맛집", "애견동반", "액티비티", "호캉스"];
  const prices = [
    "10만원이하",
    "10만원대",
    "20만원대",
    "30만원대",
    "40만원대",
    "50만원이상",
  ];

  const [theme, setTheme] = useState("");

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

  const loadFilterPost = () => {
    const region_ = checkHasIncode(region);
    const price_ = checkHasIncode(priceSelect);
    const theme_ = checkHasIncode(theme);

    dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
  };

  const loadMainPost = () => {
    const region_ = checkHasIncode(keyword);
    const price_ = checkHasIncode(priceSelect);
    const theme_ = checkHasIncode(theme);

    dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
  };

  const loadSearchPost = () => {
    const region_ = checkHasIncode(listRegion);
    const price_ = checkHasIncode(priceSelect);
    const theme_ = checkHasIncode(theme);

    dispatch(userAction.filterGETDB(region_, price_, theme_, nextPage, size));
  };

  useEffect(() => {
    if (themeSelect.length > 0) {
      setTheme(themeSelect.toString());
    }

    if (themeSelect.length === 0) {
      setTheme("");
    }

    if (priceSelect === undefined) {
      setPriceSelect("");
    }
  }, [themeSelect, priceSelect]);

  useEffect(() => {
    dispatch(userAction.initPagingDB());
    dispatch(userAction.clearDB());
  }, [dispatch]);

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
                  onClick={() => {
                    loadMainPost();
                    onClick();
                  }}
                >
                  검색
                </button>
              </div>
            )}
            {is_region && (
              <div className="filtermodal-filterbutton">
                <button
                  onClick={() => {
                    loadFilterPost();
                    onClick();
                  }}
                >
                  검색
                </button>
              </div>
            )}
            {is_list && (
              <div className="filtermodal-filterbutton">
                <button
                  onClick={() => {
                    loadSearchPost();
                    onClick();
                  }}
                >
                  검색
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
