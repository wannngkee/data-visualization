import React from "react";
import "./index.css";

const SectionOne = () => {
  return (
    <section className="sectionOne">
      <img
        className="backgroundImg"
        src="imgs/background.jpg"
        alt="melbourne city"
      />
      <div className="titleBlock">
        <h1>Plan Your Business in Melbourne</h1>
      </div>
      <div className="descBlock">
        <h4>
          Find Out the Thriving Industies and the Perfect Locations To Start
          With.
        </h4>
      </div>
    </section>
  );
};

export default SectionOne;
