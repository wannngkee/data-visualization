import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import industry from "../../data/industry";
import { FaRegHandPointDown } from "react-icons/fa";
import "./index.css";

const SectionThree = () => {
  return (
    <section className="sectionFive">
      <div className="sectionTitle">
        <h1>Parking Spaces and Industries </h1>
        <p></p>
      </div>
      {/* <div className="hint">
        <FaRegHandPointDown className="icon" />
        Click for more details
      </div> */}
      <div className="containerFive"></div>
    </section>
  );
};

export default SectionThree;
