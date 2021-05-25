import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import * as d3 from "d3";
import { FaRegHandPointDown } from "react-icons/fa";
import Wave from "react-wavify";
import "./index.css";

const SectionFive = () => {
  const [value, setValue] = useState();
  useEffect(() => {
    d3.select(".sectionFive").on("mouseover", () => {
      d3.select(".guessBox")
        .attr("opacity", 0)
        .transition()
        .duration(3000)
        .style("opacity", 1);
    });
  });

  return (
    <section className="sectionFive">
      <div className="sectionTitle Five">
        <h1>Parking Spaces and Industries </h1>
        <h4 style={{ width: "70%" }}>
          A proper parking space is essential to attract and retain customers.
          Despite the development of public transport network, parking capacity
          still has significant impact on business establishments. <br />
        </h4>
        <h4 style={{ width: "70%" }}>
          In 2019, <b className="number">1%</b> increase in parking spaces will
          lead to <b className="number">4%</b> increase in establishment counts.
        </h4>
      </div>
      <div className="containerFive">
        <Wave
          style={{ width: "100vw", height: "60vh" }}
          mask="url(#mask)"
          fill="#a1cae2"
          opacity={0.7}
          options={{
            height: 0,
            amplitude: 25,
            speed: 0.15,
            points: 3,
          }}
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0" stopColor="#ddd" />
              <stop offset="0.5" stopColor="black" />
            </linearGradient>
            <mask id="mask">
              <rect
                x="0"
                y="0"
                width="2000"
                height="100vh"
                fill="url(#gradient)"
              />
            </mask>
          </defs>
        </Wave>
        <div className="guessBox">
          <h2 className="guess">🔍 Guess</h2>
          <h2 className="guess" style={{ marginBottom: 30 }}>
            {" "}
            Which industry needs the most parking spaces?
          </h2>
          <Radio.Group
            size="large"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          >
            <Radio.Button value="a" className="radiobtn">
              🏨 Accommodation and Food services
            </Radio.Button>
            <Radio.Button value="b" className="radiobtn">
              🖼 Arts and Recreation Services
            </Radio.Button>
            <Radio.Button value="c" className="radiobtn">
              ⛑ Public Administration and Safety
            </Radio.Button>
            <Radio.Button value="d" className="radiobtn">
              🚌 Transport, Postal and Warehousing
            </Radio.Button>
          </Radio.Group>
          {value && value === "c" && (
            <div className="response">
              <h3>👏🏼 That's Correct! Scroll down to discover more.</h3>
              <FaRegHandPointDown className="responseIcon" />
            </div>
          )}
          {value && value !== "c" && (
            <div className="response">
              <h3>😅 Wrong guess. Scroll down to discover more.</h3>
              <FaRegHandPointDown className="responseIcon" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionFive;
