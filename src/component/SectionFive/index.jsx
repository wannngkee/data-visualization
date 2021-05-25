import React, { useRef, useEffect, useState } from "react";
import { Radio } from "antd";
import Wave from "react-wavify";
import "./index.css";

const SectionThree = () => {
  return (
    <section className="sectionFive">
      <div className="sectionTitle Five">
        <h1>Parking Spaces and Industries </h1>
        <p style={{ width: "70%" }}>
          A proper parking space is essential to attract and retain customers
          and it is also for the employee convenience. Despite the development
          of public transport network, parking capacity still has significant
          impact on business establishments. <br />
        </p>
        <h4 style={{ width: "70%" }}>
          In 2019, <b className="number">1%</b> increase in parking spaces will
          lead to <b className="number">4%</b> increase in establishment counts.
        </h4>
      </div>
      <div className="containerFive">
        <Wave
          style={{ width: "100vw", height: 400, marginTop: -35 }}
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
              <stop offset="0" stopColor="#eee" />
              <stop offset="0.5" stopColor="black" />
            </linearGradient>
            <mask id="mask">
              <rect
                x="0"
                y="0"
                width="2000"
                height="800"
                fill="url(#gradient)"
              />
            </mask>
          </defs>
        </Wave>
        <h2 className="guess" style={{ marginTop: -360 }}>
          🔍 Guess
        </h2>
        <h2 className="guess" style={{ marginBottom: 50 }}>
          {" "}
          Which industry needs the most parking spaces?
        </h2>
        <Radio.Group
          size="large"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Radio.Button value="a" className="radiobtn">
            Public Administration and Safety
          </Radio.Button>
          <Radio.Button value="b" className="radiobtn">
            Transport, Postal and Warehousing
          </Radio.Button>
          <Radio.Button value="c" className="radiobtn">
            Accommodation and Food services
          </Radio.Button>
          <Radio.Button value="d" className="radiobtn">
            Arts and Recreation Services
          </Radio.Button>
        </Radio.Group>
      </div>
    </section>
  );
};

export default SectionThree;
