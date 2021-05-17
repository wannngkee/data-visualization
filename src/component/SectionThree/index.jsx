import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import industry from "../../data/industry";
import "./index.css";

const data = industry
  .filter((item) => Array.isArray(item.entry))
  .sort((a, b) => b.growth - a.growth);

const BarChart = () => {
  const svgRef = useRef();
  useEffect(() => {
    const margin = { top: 30, right: 0, bottom: 30, left: 30 };
    const width = 450 - margin.left - margin.right;
    const barHeight = 70;
    const height =
      Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;
    const svg = d3.select(svgRef.current);
    svg
      .attr("width", 450)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
      .attr("class", "bar")
      .attr("fill", "steelblue")
      .style("opacity", 0.9)
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", (d, i) => yScale(i))
      .attr("width", 0)
      .attr("height", yScale.bandwidth())
      .on("mouseover", (e, d) => {
        console.log(d);
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
  }, []);
  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </>
  );
};

const LineChart = () => {
  const lineData = [
    {
      year: 2016,
      entry: 20.5,
      exist: 13,
    },
    {
      year: 2017,
      entry: 31.7,
      exist: 17,
    },
    {
      year: 2018,
      entry: 17.5,
      exist: 15,
    },
    {
      year: 2019,
      entry: 24.3,
      exist: 23,
    },
  ];
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 30, right: 0, bottom: 10, left: 30 };
    const width = 350 - margin.left - margin.right;
    const height = 350 - margin.top - margin.top;
    const svg = d3.select(svgRef.current);

    // const parseTime = d3.timeFormat("%Y");
    // lineData.forEach((d) => {
    //   d.year = parseTime(d.year);
    // });
    svg
      .attr("width", 350)
      .attr("height", 350)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3
      .scaleBand()
      .domain(lineData.map((item) => item.year))
      .range([0, width]);

    const ymax = d3.max(lineData, (d) => d.entry);

    const yScale = d3.scaleLinear().domain([0, ymax]).range([height, 0]);

    const entryPath = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.entry));
    // .curve(d3.curveMonotoneX);

    const existPath = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.exist));
    // .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(lineData)
      .attr("class", "line-path")
      .attr("transform", "translate(" + 50 + ",0)")
      .attr("d", entryPath)
      .attr("fill", "none")
      .attr("stroke-width", 3)
      .attr("stroke", "steelblue");

    svg
      .append("path")
      .datum(lineData)
      .attr("class", "line-path")
      .attr("transform", "translate(" + 50 + ",0)")
      .attr("d", existPath)
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

    //legend
    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", height + margin.bottom + 32)
      .attr("width", 10)
      .attr("height", 10)
      .attr("rx", 3)
      .attr("ry", 3)
      .style("fill", "steelblue");
    svg
      .append("rect")
      .attr("x", 78)
      .attr("y", height + margin.bottom + 32)
      .attr("width", 10)
      .attr("height", 10)
      .attr("rx", 3)
      .attr("ry", 3)
      .style("fill", "orange");
    svg
      .append("text")
      .attr("x", 12)
      .attr("y", height + margin.bottom + margin.top + 10)
      .text("entry rate ")
      .style("font-size", "10px");
    svg
      .append("text")
      .attr("x", 90)
      .attr("y", height + margin.bottom + margin.top + 10)
      .text("exist rate")
      .style("font-size", "10px");
  }, []);
  return (
    <>
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
        <p>See the trend from how industries grow</p>
      </div>
      <div className="containerThree">
        <div className="left">
          <BarChart />
        </div>
        <div className="right">
          <LineChart />
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
