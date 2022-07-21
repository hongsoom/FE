import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/module/post";
import Header from "../components/share/Header";
import FilterButton from "../components/filter/FilterButton";
import FilterPost from "../components/filter/FilterPost";
import SearchWrite from "../components/search/SearchWrite";
import "../css/filter.css";

const size = 5;

const FilterSearch = () => {
  const dispatch = useDispatch();

  const keyword = useParams().keyword;

  const posts = useSelector((state) => state.post.contents);
  const isLoading = useSelector((state) => state.post.isLoading);
  const nextPage = useSelector((state) => state.post.paging?.start);
  const lastPage = useSelector((state) => state.post.paging?.next);

  const [themeSelect, setThemeSelect] = useState([]);
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState(keyword);
  const [theme, setTheme] = useState("");

  const checkHasIncode = (value) => {
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (value.match(check_kor)) {
      const encodeKeyword = encodeURI(value);
      return encodeKeyword;
    } else {
      return value;
    }
  };

  const loadLatestPost = () => {
    dispatch(
      userAction.filterGETDB(
        checkHasIncode(region),
        checkHasIncode(price),
        checkHasIncode(theme),
        nextPage,
        size
      )
    );
  };

  useEffect(() => {
    if (themeSelect.length > 0) {
      setTheme(themeSelect.toString());
    }

    if (themeSelect.length === 0) {
      setTheme("");
    }
  }, [themeSelect]);

  useEffect(() => {
    setRegion(keyword);

    loadLatestPost();

    return () => {
      dispatch(userAction.clearDB());
    };
  }, [keyword]);

  return (
    <>
      <Header />
      <SearchWrite />
      <FilterButton
        region={region}
        themeSelect={themeSelect}
        setThemeSelect={setThemeSelect}
        price={price}
        setPrice={setPrice}
      />
      <div className="filter-container">
        <div className="filter-content">
          <div className="filter-category">
            <FilterPost
              posts={posts}
              isLoading={isLoading}
              size={size}
              nextPage={nextPage}
              lastPage={lastPage}
              region={checkHasIncode(region)}
              theme={checkHasIncode(theme)}
              price={checkHasIncode(price)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSearch;
