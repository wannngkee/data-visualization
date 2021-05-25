import React, { useRef, useEffect, useState } from "react";
import { Button, Slider, Select } from "antd";
import * as d3 from "d3";
import areaMap from "../../data/areas.json";
import { svg } from "d3";
import { FaRegHandPointRight } from "react-icons/fa";
import "./index.css";

const SectionSix = () => {
  const marks = {
    0: "2016",
    10: "2017",
    20: "2018",
    30: "2019",
  };
  const options = [
    { value: "Accommodation and Food services" },
    { value: "Administrative and Support Services" },
    { value: "Agriculture, Forestry and Fishing" },
    { value: "Arts and Recreation Services" },
    { value: "Construction" },
    {
      value: "Education and Training",
    },
    { value: "Electricity, Gas, Water and Waste Services" },
    { value: "Financial and Insurance Services" },
    { value: "Health Care and Social Assistance" },
    { value: "Information Media and Telecommunications" },
    { value: "Manufacturing" },
    { value: "Other Services" },
    {
      value: "Professional, Scientific and Technical Services",
    },
    { value: "Public Administration and Safety" },
    { value: "Rental, Hiring and Real Estate Services" },
    { value: "Retail Trade" },
    { value: "Transport, Postal and Warehousing" },
    { value: "Wholesale Trade" },
  ];

  return (
    <>
      <section className="sectionSix">
        <div className="sectionTitle" style={{ marginBottom: 0 }}>
          <h1>Necessary Parking Spaces</h1>
          <p>The mininum spaces needed for each industry to run successfully</p>
        </div>
        <div className="containerSix"></div>
      </section>
    </>
  );
};

export default SectionSix;
