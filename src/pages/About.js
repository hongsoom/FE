import React from "react";
import "../css/about.scss";
import first from "../assets/first.png";
import second from "../assets/second.png";
import third from "../assets/third.png";
import fourth from "../assets/fourth.png";
import fifth from "../assets/fifth.png";
import sixth from "../assets/sixth.png";

const About = () => {
  return (
    <div className="about-container">
      <img src={first} alt="first" />
      <img src={second} alt="second" />
      <img src={third} alt="third" />
      <img src={fourth} alt="fourth" />
      <img src={fifth} alt="fifth" />
      <img src={sixth} alt="sixth" />
    </div>
  );
};

export default About;
