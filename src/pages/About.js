import React from "react";
import "../css/about.scss";
import second from "../assets/second.png";
import third from "../assets/third.png";
import fourth from "../assets/fourth.png";
import fifth from "../assets/fifth.png";
import sixth from "../assets/sixth.png";
import seven from "../assets/seven.png";
//import manual from "../assets/manual.png";

const About = () => {
  return (
    <div className="about-container">
      <img src={second} alt="second" />
      <img src={third} alt="third" />
      <img src={fourth} alt="fourth" />
      <img src={fifth} alt="fifth" />
      <img src={sixth} alt="sixth" />
      <img src={seven} alt="seven" />
      {/*  <img src={manual} alt="manual" /> */}
    </div>
  );
};

export default About;
