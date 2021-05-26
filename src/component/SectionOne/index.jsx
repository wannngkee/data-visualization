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
        <p>
          Find Out the Thriving Industies and the Required Parking Spaces To
          Start With.
        </p>
      </div>
    </section>
  );
};

export default SectionOne;
