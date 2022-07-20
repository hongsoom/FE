import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import filter from "../../assets/filter.png";

const FilterButton = (props) => {
  const navigate = useNavigate();

  const {
    recommendList,
    keyword,
    region,
    themeSelect,
    price,
    setThemeSelect,
    setPrice,
  } = props;

  const is_List = recommendList ? true : false;
  const is_price = price ? true : false;
  const is_region = region ? true : false;

  const [modal, setModal] = useState(false);

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal ? (
        <FilterModal
          onClick={onClick}
          region={region}
          themeSelect={themeSelect}
          setThemeSelect={setThemeSelect}
          priceSelect={price}
          setPriceSelect={setPrice}
        />
      ) : null}
      {is_List === true ? (
        <>
          <div className="main-click">
            <div className="main-button">
              {recommendList.map((list, i) => (
                <button
                  key={i}
                  onClick={() => navigate("/filter/" + `${list}`)}
                >
                  #{list}
                </button>
              ))}
            </div>
            <div className="main-filter">
              <button onClick={onClick}>
                <img src={filter} alt="filter" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="category-click">
            <div className="category-button">
              {is_region ? (
                <button>#{region}</button>
              ) : (
                <button>#{keyword}</button>
              )}
              {themeSelect.map((list, i) => (
                <button key={i}>#{list}</button>
              ))}

              {is_price ? <button>#{price}</button> : null}
            </div>
            <div className="category-filter">
              <button onClick={onClick}>
                <img src={filter} alt="filter" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterButton;
