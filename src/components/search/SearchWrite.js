import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/searchWrite.css";
import search from "../../assets/search.png";

const SearchWrite = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleClick = () => {
    if (keyword === "") {
      alert("지역이나 테마를 검색해주세요!");
    }
    navigate("/" + keyword);
  };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      navigate("/" + value);
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
