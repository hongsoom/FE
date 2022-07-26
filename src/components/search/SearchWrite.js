import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/module/post";
import { useNavigate } from "react-router-dom";
import "../../css/searchWrite.scss";
import search from "../../assets/search.png";

const SearchWrite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const handleClick = () => {
    if (keyword === "") {
      alert("지역이나 테마를 검색해주세요!");
    }
    dispatch(userAction.initPagingDB());
    navigate("/search/" + keyword);
  };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      dispatch(userAction.initPagingDB());
      navigate("/search/" + value);
    }
  };

  return (
    <div className="searchWrite-content">
      <input
        type="text"
        placeholder="지역이나 테마를 검색해보세요"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyPress={(e) => searchEnter(e)}
      />
      <button onClick={handleClick}>
        <img src={search} alt="search" />
      </button>
    </div>
  );
};

export default SearchWrite;
