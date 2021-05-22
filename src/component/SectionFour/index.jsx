import React, { useRef, useEffect, useState } from "react";
import { Button, Slider } from "antd";
import * as d3 from "d3";
import areaMap from "../../data/areas.json";
import { svg } from "d3";
import { FaRegHandPointRight } from "react-icons/fa";
import "./index.css";

const Map = (props) => {
  const { setArea, year } = props;
  const [selectedArea, setSelectedArea] = useState(null);
  const svgRef = useRef();
  const width = 400;
  const height = 400;
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.attr("width", 400).attr("height", 400);
    const projection = d3
      .geoMercator()
      .fitSize([width, height], areaMap)
      .precision(100);
    const geoGenerator = d3.geoPath().projection(projection);
    const allIndustries = Object.keys(areaMap.features[0].properties.data);

    const data = () => {
      const number = [];
      areaMap.features.forEach((feature) => {
        let total = 0;
        allIndustries.forEach((industry) => {
          total += feature.properties.data[industry][year];
        });
        number.push(total);
      });
      return number;
    };

    const areaTotal = (feature) => {
      let total = 0;
      allIndustries.forEach((industry) => {
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
        d3.select(".hoverhint").style("opacity", 0);
        setSelectedArea(selectedArea === feature ? null : feature);
        setArea([feature.properties.featurenam, areaTotal(feature)]);
      })
      .on("mouseout", (e, feature) => {
        d3.select(".hoverhint").style("opacity", 1);
      });
  }, [setArea, selectedArea, year]);
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
  const marks = {
    0: "2016",
    10: "2017",
    20: "2018",
    30: "2019",
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
        <div className="sectionTitle">
          <h1>Changes on Industry Distribution</h1>
          <p>A map walkthrough</p>
          <div className="interaction">
            <div className="hoverhint" style={{ opacity: show ? 1 : 0 }}>
              Slide to select a year{" "}
              <FaRegHandPointRight className="hoverIcon" />
            </div>
            <div
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <Slider
                max={30}
                style={{ width: 200 }}
                marks={marks}
                step={null}
                value={slider}
                tipFormatter={null}
                onChange={(value) => {
                  setSlider(value);
                }}
              />
            </div>
            <Button
              type="primary"
              ghost
              size="small"
              style={{ marginTop: 10 }}
              onClick={handleClick}
            >
              Auto Play
            </Button>
          </div>
        </div>
        {/* <div className="hoverhint">
          <FaRegHandPointDown
            className="hoverIcon"
            style={{ display: "inline-block" }}
          />
          Hover for more details
        </div> */}
        <div className="containerFour">
          <div className="left">
            <Map setArea={setArea} year={slider / 10} />
          </div>
          <div className="right">
            <div className="desc">
              {areaInfo.length > 0 ? (
                <>
                  <h3>
                    Area Name: <span className="number">{areaInfo[0]}</span>
                  </h3>
                  <h3>
                    Count Change Since 2015:{" "}
                    <span className="number">
                      {areaInfo[1] > 0 ? `+${areaInfo[1]}` : areaInfo[1]}
                    </span>
                  </h3>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionFour;
