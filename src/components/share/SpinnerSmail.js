import React from "react";
import spinner from "../../assets/Spinner.gif";
import "../../css/spinnerSmail.css";

const Spinner = () => {
  return (
    <div className="spinnersmail-container">
      <img src={spinner} alt="로딩중" width="5%" />
    </div>
  );
};

export default Spinner;
