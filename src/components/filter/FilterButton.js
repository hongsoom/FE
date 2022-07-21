import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import filter from "../../assets/filter.png";
import "../../css/filterButton.css";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";

const FilterButton = (props) => {
  const navigate = useNavigate();

  const { recommendList, keyword, region, list } = props;

  const [themeSelect, setThemeSelect] = useState([]);
  const [price, setPrice] = useState("");
  const [modal, setModal] = useState(false);
  const [click, setClick] = useState(false);

  const is_keyword = recommendList ? true : false;
  const is_price = price ? true : false;
  const is_region = region ? true : false;
  const is_list = list ? true : false;

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal ? (
        <FilterModal
          onClick={onClick}
          list={list}
          region={region}
          keyword={keyword}
          themeSelect={themeSelect}
          setThemeSelect={setThemeSelect}
          priceSelect={price}
          setPriceSelect={setPrice}
        />
      ) : null}
      {is_keyword === true ? (
        <>
          <div className="filterbutton-container">
            <div className="filterbutton-content">
              <div className="filterbutton-button">
                {click ? (
                  <>
                    {themeSelect.map((list, i) => (
                      <button key={i}>#{list}</button>
                    ))}

                    {is_price ? <button>#{price}</button> : null}
                  </>
                ) : (
                  <>
                    {recommendList.map((list, i) => (
                      <button
                        key={i}
                        onClick={() => navigate("/filter/" + `${list}`)}
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
                {is_region ? (
                  <button>#{region}</button>
                ) : (
                  <button>#{list}</button>
                )}
                {themeSelect.map((list, i) => (
                  <button key={i}>#{list}</button>
                ))}

                {is_price ? <button>#{price}</button> : null}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="filterbutton-filter">
        <button
          onClick={() => {
            onClick();
            setClick(true);
          }}
        >
          <img src={filter} alt="filter" />
        </button>
      </div>
    </>
  );
};

export default FilterButton;
