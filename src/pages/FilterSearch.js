import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/module/post";
import Header from "../components/share/Header";
import FilterButton from "../components/filter/FilterButton";
import SearchPost from "../components/search/SearchPost";
import FilterPost from "../components/filter/FilterPost";
import SearchWrite from "../components/search/SearchWrite";
import "../css/category.css";

const size = 5;

const Category = () => {
  const dispatch = useDispatch();

  const keyword = useParams().keyword;

  const posts = useSelector((state) => state.post.contents);
  const last = useSelector((state) => state.post.last);
  const isLoading = useSelector((state) => state.post.isLoading);

  const [page, setPage] = useState(0);

  const [themeSelect, setThemeSelect] = useState([]);
  const [list, setList] = useState(keyword);
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [theme, setTheme] = useState("");

  const is_list = list ? true : false;

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
        size,
        page
      )
    );
  };

  const loadKeywordPost = () => {
    const keyword_ = checkHasIncode(region);
    dispatch(userAction.keywordGetDB(page, size, keyword_));
  };

  useEffect(() => {
    if (list) {
      loadKeywordPost();
    }

    if (region) {
      loadLatestPost();
    }
  }, []);

  useEffect(() => {
    if (themeSelect.length > 0) {
      setTheme(themeSelect.toString());
    }

    if (themeSelect.length === 0) {
      setTheme("");
    }
  }, [themeSelect]);

  useEffect(() => {
    if (
      keyword === "서울" ||
      keyword === "경기" ||
      keyword === "인천" ||
      keyword === "강원도" ||
      keyword === "충청도" ||
      keyword === "전라도" ||
      keyword === "경상도" ||
      keyword === "대전" ||
      keyword === "세종" ||
      keyword === "대구" ||
      keyword === "울산" ||
      keyword === "광주" ||
      keyword === "부산" ||
      keyword === "제주도"
    ) {
      setRegion(keyword);
    }
    return () => {
      dispatch(userAction.clearDB());
    };
  }, [keyword]);

  return (
    <>
      <Header />
      <SearchWrite />
      <FilterButton
        list={list}
        region={region}
        themeSelect={themeSelect}
        price={price}
        setThemeSelect={setThemeSelect}
        setPrice={setPrice}
      />
      <div className="category-container">
        <div className="category-content">
          <div className="category-category">
            {is_list ? (
              <SearchPost
                posts={posts}
                last={last}
                isLoading={isLoading}
                size={size}
                page={page}
                keyword={keyword}
              />
            ) : (
              <FilterPost
                posts={posts}
                last={last}
                isLoading={isLoading}
                size={size}
                page={page}
                region={region}
                theme={theme}
                price={price}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
