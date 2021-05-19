import React, { useRef, useEffect, useState } from "react";
import { Checkbox } from "antd";
import * as d3 from "d3";
import areaMap from "../../data/areas.json";
import { max, stackOrderDescending, svg } from "d3";
import "./index.css";

const Map = () => {
  const svgRef = useRef();
  const width = 500;
  const height = 500;
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.attr("width", 500).attr("height", 500);
    let projection = d3.geoMercator().fitSize([width, height], areaMap);
    // .scale(300000)
    // .center([144.9631, -37.8136]);
    let geoGenerator = d3.geoPath().projection(projection);

    svg
      .selectAll("path")
      .data(areaMap.features)
      .join("path")
      .attr("class", "area")
      .attr("fill", "steelblue")
      .attr("stroke", "#fff")
      .attr("d", geoGenerator);
  }, []);
  return (
    <>
      <div id="tooltip-container" />
      <div className="map">
        <svg ref={svgRef}>
          {/* <g className="x-axis" />
          <g className="y-axis" /> */}
        </svg>
      </div>
    </>
  );
};

const SectionFour = () => {
  return (
    <>
      <section className="sectionFour">
        <div className="sectionTitle">
          <h1>Industry Distribution</h1>
          <p>A map walkthrough</p>
        </div>
        <div className="containerFour">
          <div className="left"></div>
          <Map />
          <div className="right"></div>
        </div>
      </section>
    </>
  );
};

export default SectionFour;
