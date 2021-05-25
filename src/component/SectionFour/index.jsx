import React, { useRef, useEffect, useState } from "react";
import { Button, Slider, Select } from "antd";
import * as d3 from "d3";
import areaMap from "../../data/areas.json";
import { svg } from "d3";
import { FaRegHandPointRight } from "react-icons/fa";
import legend from "./legend.png";
import "./index.css";

const allIndustries = Object.keys(areaMap.features[0].properties.data);
const Map = (props) => {
  const { setArea, year, industries } = props;
  const [selectedArea, setSelectedArea] = useState(null);
  const svgRef = useRef();
  const width = 400;
  const height = 380;
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);
    const projection = d3
      .geoMercator()
      .fitSize([width, height], areaMap)
      .precision(100);
    const geoGenerator = d3.geoPath().projection(projection);

    const data = () => {
      const number = [];
      areaMap.features.forEach((feature) => {
        let total = 0;
        industries.forEach((industry) => {
          total += feature.properties.data[industry][year];
        });
        number.push(total);
      });
      return number;
    };

    const areaTotal = (feature) => {
      let total = 0;
      industries.forEach((industry) => {
        total += feature.properties.data[industry][year];
      });
      return total;
    };

    const extent = d3.extent(data());

    const colorScale = d3
      .scaleLinear()
      .domain([extent[0], -50, -20, 0, 10, 20, 50, 100, 150, extent[1]])
      .range([
        "#ce1212",
        "#fc8d59",
        "#fee0d2",
        "#f6f6f6",
        "#82badb",
        "#59a1cf",
        "#3787c0",
        "#2166ac",
        "#0b4d94",
        "#08306b",
      ]);

    svg
      .selectAll("path")
      .data(areaMap.features)
      .join("path")
      .attr("class", "area")
      .attr("fill", (feature) => colorScale(areaTotal(feature)))
      .attr("stroke", "#333")
      .attr("d", (feature) => geoGenerator(feature))
      .on("mouseover", (e, feature) => {
        setSelectedArea(selectedArea === feature ? null : feature);
        setArea([feature.properties.featurenam, areaTotal(feature)]);
      });
  }, [setArea, selectedArea, year, industries]);
  return (
    <>
      <svg ref={svgRef} />
    </>
  );
};

const SectionFour = () => {
  const [areaInfo, setArea] = useState([]);
  const [slider, setSlider] = useState(0);
  const [show, setShow] = useState(false);
  const [selection, setSelection] = useState(allIndustries);
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

  const totalChange = () => {
    let total = 0;
    areaMap.features.forEach((feature) => {
      allIndustries.forEach((industry) => {
        total += feature.properties.data[industry][slider / 10];
      });
    });
    return total;
  };
  const handleClick = () => {
    setSlider(0);
    let count = 0;
    let timer = setInterval(() => {
      setSlider((pre) => pre + 10);
      count++;
      if (count === 3) {
        clearInterval(timer);
      }
    }, 500);
  };
  return (
    <>
      <section className="sectionFour">
        <div className="sectionTitle" style={{ marginBottom: 0 }}>
          <h1>Changes on Industry Distribution</h1>
          <p>A map walkthrough</p>
        </div>
        <div className="containerFour">
          <div className="left" style={{ marginRight: 50 }}>
            <div
              className="interaction"
              onMouseOver={() => setShow(true)}
              onMouseOut={() => setShow(false)}
            >
              <div className="hoverhint" style={{ opacity: show ? 1 : 0 }}>
                Slide to select a year{" "}
                <FaRegHandPointRight className="hoverIcon" />
              </div>
              <Slider
                max={30}
                style={{ width: 200, marginRight: 40, marginLeft: -120 }}
                marks={marks}
                step={null}
                value={slider}
                tipFormatter={null}
                onChange={(value) => {
                  setSlider(value);
                }}
              />
              <Button
                type="primary"
                ghost
                size="small"
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  borderColor: "#04009a",
                  color: "#04009a",
                }}
                onClick={handleClick}
              >
                Auto Play
              </Button>
            </div>
            <Map setArea={setArea} year={slider / 10} industries={selection} />
            <div className="legend">
              Decrease
              <img
                src={legend}
                alt="legend"
                style={{
                  width: 200,
                  height: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
              Increase
            </div>
          </div>
          <div className="right" style={{ marginTop: 30 }}>
            <div
              className="desc"
              style={{
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  visibility: areaInfo.length > 0 ? "visible" : "hidden",
                }}
              >
                <h3>
                  Area Name: <span className="number">{areaInfo[0]}</span>
                </h3>
                <h3>
                  Count Change Since 2015:{" "}
                  <span className="number">
                    {areaInfo[1] > 0 ? `+${areaInfo[1]}` : areaInfo[1]}
                  </span>
                </h3>
              </div>
              <h3>
                Overall Change:{" "}
                <span className="number">
                  {totalChange() > 0 ? "+" + totalChange() : totalChange()}
                </span>
              </h3>
            </div>
            <div
              style={{ color: "#04009a", fontWeight: "bold", marginBottom: 5 }}
            >
              Selected Industries
            </div>
            <div style={{ display: "flex" }}>
              <Button
                style={{
                  flex: 1,
                  fontSize: 11,
                  color: "#04009a",
                }}
                onClick={() => {
                  setSelection([]);
                }}
              >
                Clear All
              </Button>
              <Button
                style={{
                  flex: 1,
                  fontSize: 11,
                  color: "#04009a",
                }}
                onClick={() => {
                  setSelection(allIndustries);
                }}
              >
                Select All
              </Button>
              <Button
                style={{
                  flex: 1,
                  fontSize: 11,
                  color: "#04009a",
                }}
                onClick={() => {
                  setSelection([
                    "Construction",
                    "Education and Training",
                    "Electricity, Gas, Water and Waste Services",
                    "Rental, Hiring and Real Estate Services",
                    "Public Administration and Safety",
                  ]);
                }}
              >
                Select Top 5
              </Button>
            </div>
            <div className="selections">
              <Select
                mode="multiple"
                size="large"
                value={selection}
                options={options}
                onChange={(value) => {
                  setSelection(value);
                }}
                style={{
                  width: 520,
                  fontSize: 11,
                  backgroundColor: "transparent",
                }}
              ></Select>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionFour;
