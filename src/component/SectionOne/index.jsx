import React from "react";
import backgroundImg from "./imgs/background.jpg";
import "./index.css";

const SectionOne = () => {
  return (
    <section className="sectionOne">
      <img className="backgroundImg" src={backgroundImg} alt="melbourne city" />
      <div className="titleBlock">
        <h1>Plan Your Business in Melbourne</h1>
      </div>
      <div className="descBlock">
        <p>
          Find Out the Thriving Industries and the Required Parking Spaces to
          Start With.
        </p>
      </div>
    </section>
  );
};

export default SectionOne;
