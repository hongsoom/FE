import React, { useState } from "react";
import MapContainer from "./MapContainer";

import '../css/searchPlace.css'


const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
      setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <div className="searchWrap">
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="장소를 입력하세요"
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      <MapContainer searchPlace={place} />
    </div>
  );
};

export default SearchPlace;