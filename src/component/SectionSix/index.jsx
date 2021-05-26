import React, { useRef, useState } from "react";
import parking from "../../data/parking";
import { useSprings, animated } from "react-spring";
import * as d3 from "d3";
import "./index.css";

// const width = 400;

const Chart = (props) => {
  const { dataset, width, handleClick, sort } = props;
  const tooltipRef = useRef();
  const height = width;
  const num_bars = 18;
  const angle = (2 * Math.PI) / num_bars;
  const inner_radius = 20;
  const max_radius = width / 2;
  const domain = [15, 105];
  const layout = d3
    .arc()
    .startAngle((d) => d.i * angle)
    .endAngle((d) => (d.i + 1) * angle)
    .innerRadius(inner_radius);

  const scale = d3
    .scaleLinear()
    .domain(domain)
    .range([inner_radius, max_radius]);
  const radialBarSprings = useSprings(
    dataset.length,
    dataset.map((item, i) => {
      const outerRadius = Math.max(inner_radius + 0.1, scale(item.space));
      const path = layout({ i, outerRadius });
      const color = d3.interpolatePuBu(item.space / 105);
      const value = item;
      return {
        to: {
          path,
          color,
          value,
        },
        from: {
          path,
          color,
          value,
        },
        delay: i * 250,
      };
    })
  );
  return (
    <>
      <div className="chartContainer">
        <svg
          className="chart"
          style={{ width: width, height: height, marginBottom: 25 }}
        >
          <g
            className="g"
            style={{
              transform: `translate(${width / 2.5}px, ${height / 2.5}px)`,
            }}
          >
            <circle
              className="circle"
              r={max_radius}
              stroke="#aaa"
              fill="none"
            />
            {radialBarSprings.map((props, i) => (
              <animated.path
                className="path"
                key={i}
                d={props.path}
                fill={props.color}
                stroke="#fff"
                onMouseOver={(e, value) => {
                  const info = props.value.animation.to;
                  if (info) {
                    d3.select(tooltipRef.current)
                      .style("display", "block")
                      .html(
                        `<b>Industry:</b> <span class="number">${
                          info.industry
                        }</span> <br/><b>Parking Spaces:</b> <span class="number">${
                          info.space / 10
                        }</span>`
                      );
                  }
                }}
                onMouseLeave={() => {
                  d3.select(tooltipRef.current).style("display", "none");
                }}
              >
                <animateTransform
                  className="animation"
                  attributeName="transform"
                  begin="0s"
                  dur="20s"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  repeatCount="indefinite"
                />
              </animated.path>
            ))}
            <animated.text
              className="sort"
              transform="translate(-12, 5)"
              onClick={handleClick}
            >
              {sort ? "reset" : "sort"}
            </animated.text>
          </g>
        </svg>
        <div
          className="tooltip"
          ref={tooltipRef}
          style={{
            marginTop: sort ? -100 : 0,
          }}
        />
      </div>
    </>
  );
};

const SectionSix = () => {
  const data1 = parking.map((item) => ({
    industry: item.industry,
    space: item.space * 10,
  }));

  const data2 = parking
    .map((item) => ({
      industry: item.industry,
      space: item.space * 10,
    }))
    .sort((a, b) => a.space - b.space);

  const datasets = [data1, data2];
  const [currentDataset, setDataset] = useState(datasets[0]);
  const [width, setWidth] = useState(400);
  const [sort, setSort] = useState(false);
  const handleClick = () => {
    setSort(!sort);
    if (!sort) {
      setDataset(datasets[1]);
      setWidth(560);
      d3.select(".g")
        .transition()
        .duration(2000)
        .attr("transform", `translate(${width / 2.5},${width})`);
      d3.select(".circle").transition().duration(2000).attr("opacity", "0");
      d3.selectAll(".animation").attr("to", "0,0,0");
    } else {
      setDataset(datasets[0]);
      setWidth(400);
      d3.select(".g")
        .transition()
        .duration(2000)
        .attr("transform", `translate(${width / 2.5},${width / 2.5})`);

      d3.select(".circle").transition().duration(2000).attr("opacity", "1");
      d3.selectAll(".animation")
        .transition()
        .duration(3000)
        .attr("to", "360,0,0");
    }
  };

  return (
    <>
      <section className="sectionSix">
        <div className="sectionTitle" style={{ marginBottom: 0 }}>
          <h1>Necessary Parking Spaces</h1>
          <p>The mininum spaces needed for each industry to run successfully</p>
        </div>
        <div className="containerSix">
          <Chart
            dataset={currentDataset}
            width={width}
            handleClick={handleClick}
            sort={sort}
          />
        </div>
      </section>
    </>
  );
};

export default SectionSix;
