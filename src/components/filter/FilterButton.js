import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/module/post";
import FilterModal from "../modal/FilterModal";
import filter from "../../assets/filter.png";
import "../../css/filterButton.scss";

const FilterButton = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recommendList, keyword, list, filtercontents, isFilter } = props;

  const [regionSelect, setRegionSelect] = useState("");
  const [themeSelect, setThemeSelect] = useState([]);
  const [priceSelect, setPriceSelect] = useState("");
  const [modal, setModal] = useState(false);
  const [region, setRegion] = useState("");
  const [theme, setTheme] = useState([]);
  const [price, setPrice] = useState("");

  const is_keyword = keyword === "" ? true : false;
  const is_region = region ? true : false;
  const is_price = price ? true : false;
  const is_theme = theme.length !== 0 ? true : false;

  useEffect(() => {
    setRegionSelect("");
    setThemeSelect([]);
    setPriceSelect("");
    if (
      list === "서울" ||
      list === "경기" ||
      list === "인천" ||
      list === "강원도" ||
      list === "충청도" ||
      list === "전라도" ||
      list === "경상도" ||
      list === "대전" ||
      list === "세종" ||
      list === "대구" ||
      list === "울산" ||
      list === "광주" ||
      list === "부산" ||
      list === "제주도"
    ) {
      setRegionSelect(list);
      setRegion(list);
    }

    if (
      list === "힐링" ||
      list === "맛집" ||
      list === "애견동반" ||
      list === "액티비티" ||
      list === "호캉스"
    ) {
      setThemeSelect([list]);
      setTheme([list]);
    }

    if (
      list === "10만원 이하" ||
      list === "10만원대" ||
      list === "20만원대" ||
      list === "30만원대" ||
      list === "40만원대" ||
      list === "50만원 이상"
    ) {
      setPriceSelect(list);
      setPrice(list);
    }
  }, [list]);

  useEffect(() => {
    if (filtercontents.length === 0 && is_keyword && isFilter === false) {
      setRegion("");
      setTheme([]);
      setPrice("");
    }
  }, [isFilter]);

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <FilterModal
          onClick={onClick}
          list={list}
          keyword={keyword}
          regionSelect={regionSelect}
          setRegionSelect={setRegionSelect}
          themeSelect={themeSelect}
          setThemeSelect={setThemeSelect}
          priceSelect={priceSelect}
          setPriceSelect={setPriceSelect}
          setRegion={setRegion}
          setTheme={setTheme}
          setPrice={setPrice}
          region={region}
          theme={theme}
          price={price}
        />
      )}
      <div className="filterbutton-box">
        {is_keyword ? (
          <>
            <div className="filterbutton-container">
              <div className="filterbutton-content">
                <div className="filterbutton-button">
                  {is_region || is_price || is_theme ? (
                    <>
                      {is_region && (
                        <button className="filterbutton-region">
                          #{region}
                        </button>
                      )}
                      {theme.map((list, i) => (
                        <button key={i} className="filterbutton-theme">
                          #{list}
                        </button>
                      ))}
                      {is_price && (
                        <button className="filterbutton-price">#{price}</button>
                      )}
                    </>
                  ) : (
                    <>
                      {recommendList.map((list, i) => (
                        <button
                          className="filterbutton-theme"
                          key={i}
                          onClick={() => {
                            navigate("/search/" + `${list}`);
                            dispatch(userAction.initPagingDB());
                          }}
                        >
                          #{list}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="filterbutton-container">
              <div className="filterbutton-content">
                <div className="filterbutton-button">
                  <>
                    <button
                      className={
                        list === price || theme.includes(list)
                          ? "filterbutton-none"
                          : list === region
                          ? "filterbutton-region"
                          : "filterbutton-keyword"
                      }
                    >
                      #{list}
                    </button>

                    {theme.map((list, i) => (
                      <button key={i} className="filterbutton-theme">
                        #{list}
                      </button>
                    ))}
                    {is_price && (
                      <button className="filterbutton-price">#{price}</button>
                    )}
                  </>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="filterbutton-filter">
          <button
            onClick={() => {
              onClick();
            }}
          >
            <img src={filter} alt="filter" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterButton;
