import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import industry from "../../data/industry";
import { FaRegHandPointDown } from "react-icons/fa";
import "./index.css";

const data = industry
  .filter((item) => Array.isArray(item.entry))
  .sort((a, b) => b.growth - a.growth);

const BarChart = () => {
  const [lineData, setLineData] = useState([
    { year: 2016 },
    { year: 2017 },
    { year: 2018 },
    { year: 2019 },
  ]);
  const [industry, setIndustry] = useState();
  const svgRef = useRef();
  useEffect(() => {
    const margin = { top: 30, right: 20, bottom: 30, left: 30 };
    const width = 450 - margin.left - margin.right;
    const barHeight = 70;
    const height =
      Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;
    const svg = d3.select(svgRef.current);
    svg.attr("width", 450).attr("height", height).append("g");
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.growth)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);

    svg
      .append("g")
      .attr("class", "industryBar")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", (d, i) => yScale(i))
      .attr("width", 0)
      .attr("height", yScale.bandwidth())
      .on("mouseover", () => {
        d3.select(".hint").style("opacity", 1);
      })
      .on("click", (e, d) => {
        let newLineData = lineData;
        d.entry.forEach((e, i) => {
          newLineData[i]["entry"] = e;
        });
        d.exit.forEach((e, i) => {
          newLineData[i]["exit"] = e;
        });
        setLineData(newLineData);
        setIndustry(d.industry);
        d3.selectAll(".industryBar rect").attr("fill", "steelblue");
        d3.select(e.target).attr("fill", "#325288");
        d3.select(".lineChart").style("display", "block");
        d3.select(".linehover").style("opacity", 1);
      })
      .on("mouseout", () => {
        d3.select(".hint").style("opacity", 0);
      });

    svg
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", (d) => xScale(d.growth))
      .attr("y", (d, i) => yScale(i) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text((d) => d.growth * 100 + "%")
      .call((text) =>
        text
          .filter((d) => xScale(d.value) - xScale(0) < 20) // short bars
          .attr("dx", +4)
          .attr("fill", "black")
          .attr("text-anchor", "start")
      );

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(xScale).ticks(width / 80, d3.format("%")))
        .call((g) => g.select(".domain").remove());
    const yAxis = (g) =>
      g.attr("transform", `translate(${margin.left},0)`).call(
        d3
          .axisLeft(yScale)
          .tickFormat((i) => data[i].industry)
          .tickSizeOuter(0)
      );
    svg.select(".x-axis").call(xAxis);
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", 60)
      .attr("y", 0)
      .text("Growth Rate")
      .style("font-size", 10);
    svg.select(".y-axis").call(yAxis);

    // start animation when mouse hover on this section
    d3.select(".sectionThree").on("mouseover", () => {
      svg
        .selectAll("rect")
        .transition()
        .duration(800)
        .attr("width", (d) => xScale(d.growth) - xScale(0));
    });
    d3.select(".sectionThree").on("mouseout", () => {
      svg.selectAll("rect").transition().duration(800).attr("width", 0);
    });
  }, [lineData]);
  return (
    <>
      <div className="left">
        <svg ref={svgRef} className="barchart">
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <div className="lineChart">
        <LineChart lineData={lineData} industry={industry} />
      </div>
    </>
  );
};

const LineChart = (props) => {
  const { lineData, industry } = props;
  const svgRef = useRef();
  const length = Object.keys(lineData[0]).length;
  const [current, setCurrent] = useState();

  useEffect(() => {
    const margin = { top: 30, right: 0, bottom: 10, left: 30 };
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.top;
    const svg = d3.select(svgRef.current);

    svg
      .attr("width", 300)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (length > 1) {
      const xScale = d3
        .scaleBand()
        .domain(lineData.map((item) => item.year))
        .range([0, width]);

      const ymax = d3.max(lineData, (d) => d.entry);

      const yScale = d3.scaleLinear().domain([0, ymax]).range([height, 0]);

      const entryPath = d3
        .line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.entry))
        .curve(d3.curveMonotoneX);

      const exitPath = d3
        .line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.exit))
        .curve(d3.curveMonotoneX);

      svg
        .selectAll(".line-path1")
        .data([lineData])
        .join("path")
        .attr("class", "line-path1")
        .attr("transform", "translate(" + 32 + ",0)")
        .attr("d", entryPath)
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("stroke", "steelblue");
      svg
        .selectAll(".line-path2")
        .data([lineData])
        .join("path")
        .attr("class", "line-path2")
        .attr("transform", "translate(" + 32 + ",0)")
        .attr("d", exitPath)
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("stroke", "orange");

      const xAxis = d3.axisBottom().scale(xScale);
      const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickFormat((d) => d + "%");
      svg
        .select(".x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

      svg.select(".y-axis").call(yAxis);

      d3.select(".text1").remove();
      d3.select(".text2").remove();
      d3.select(".rect1").remove();
      d3.select(".rect2").remove();

      //legend
      svg
        .append("rect")
        .attr("class", "rect1")
        .attr("x", 0)
        .attr("y", height + margin.bottom + 32)
        .attr("width", 10)
        .attr("height", 10)
        .attr("rx", 3)
        .attr("ry", 3)
        .style("fill", "steelblue");

      svg
        .append("rect")
        .attr("class", "rect2")
        .attr("x", 78)
        .attr("y", height + margin.bottom + 32)
        .attr("width", 10)
        .attr("height", 10)
        .attr("rx", 3)
        .attr("ry", 3)
        .style("fill", "orange");
      svg
        .append("text")
        .attr("class", "text1")
        .attr("x", 12)
        .attr("y", height + margin.bottom + margin.top + 10)
        .text("entry rate ")
        .style("font-size", "10px");
      svg
        .append("text")
        .attr("class", "text2")
        .attr("x", 90)
        .attr("y", height + margin.bottom + margin.top + 10)
        .text("exit rate")
        .style("font-size", "10px");

      var mouseG = svg.append("g").attr("class", "mouse-over-effects");

      mouseG
        .append("path")
        .attr("class", "mouse-line")
        .style("stroke", "#aaa")
        .style("stroke-width", "2px")
        .style("opacity", "0");

      svg
        .append("rect")
        .attr("class", "overlay")
        .style("fill", "none")
        .attr("width", width - 35)
        .attr("height", height + 10)
        .style("opacity", 0)
        .style("fill", "red")
        .on("mouseover", () => {
          d3.select(".mouse-line").style("opacity", 1);
          d3.select(".linehover").style("opacity", 0);
        })
        .on("mouseout", () => {
          d3.select(".mouse-line").style("opacity", 0);
          d3.select(".linehover").style("opacity", 1);
        })
        .on("mousemove", (e) => mousemove(e));

      function mousemove(e) {
        const mouse = d3.pointer(e);
        const eachBand = xScale.step();
        const index = Math.round(mouse[0] / eachBand);
        const val = xScale.domain()[index];
        const data = lineData.find((obj) => obj.year === val);
        console.log(data);
        setCurrent(data);
        d3.select(".mouse-line").attr("d", function () {
          var d = "M" + mouse[0] + "," + height;
          d += " " + mouse[0] + "," + 0;
          return d;
        });
      }
    }
  }, [lineData, industry, length]);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="lineDesc" style={{ height: 50 }}>
          {current && (
            <>
              <span>
                Industry: {industry} <br />
              </span>
              <span>
                Entry rate:{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "#94b5c0",
                  }}
                >
                  {current.entry.toFixed(2)}%{" "}
                </span>
                <br />
                Exit rate:{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "#94b5c0",
                  }}
                >
                  {current.exit.toFixed(2)}%{" "}
                </span>
                <br />
                {current.entry - current.exit >= 0 ? "Grows " : "Drops "}
                {(current.entry - current.exit).toFixed(2)}% from{" "}
                {current.year - 1} to {current.year}
              </span>
            </>
          )}
        </div>
        <div className="linehover">
          <FaRegHandPointDown
            className="hoverIcon"
            style={{ marginRight: 5 }}
          />
          Hover for more details
        </div>
      </div>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </>
  );
};

const SectionThree = () => {
  return (
    <section className="sectionThree">
      <div className="sectionTitle">
        <h1>The Top 5 Thriving Industries</h1>
        <p>See how industries grow over the years</p>
      </div>
      <div className="hint">
        <FaRegHandPointDown className="icon" />
        Click for more details
      </div>
      <div className="containerThree">
        <BarChart />
      </div>
    </section>
  );
};

export default SectionThree;
