import React, { useRef, useEffect, useState } from "react";
import { Checkbox } from "antd";
import * as d3 from "d3";
import businessData from "../../data/business.json";
import { max, stackOrderDescending, svg } from "d3";
import "./index.css";

const CheckboxGroup = Checkbox.Group;

const colors = {
  "Accommodation and Food services": "#1f77b4",
  "Administrative and Support Services": "#4e79a7",
  "Agriculture, Forestry and Fishing": "#bab0ab",
  "Arts and Recreation Services": "#d9d574",
  Construction: "#af7aa1",
  "Education and Training": "#9467bd",
  "Electricity, Gas, Water and Waste Services": "#9c755f",
  "Financial and Insurance Services": "#76b7b2",
  "Health Care and Social Assistance": "#59a14f",
  "Information Media and Telecommunications": "#aec7e8",
  Manufacturing: "#ffbb78",
  "Other Services": "#f28e2c",
  "Professional, Scientific and Technical Services": "#edc949",
  "Public Administration and Safety": "#17becf",
  "Rental, Hiring and Real Estate Services": "#9edae5",
  "Retail Trade": "#e15759",
  "Transport, Postal and Warehousing": "#e377c2",
  "Wholesale Trade": "#ff9da7",
};

const BarChart = (props) => {
  const { keys, colors } = props;
  const svgRef = useRef();
  const margin = { top: 20, right: 160, bottom: 35, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.attr("width", 500).attr("height", 500);
    const stackGenerator = d3.stack().keys(keys).order(stackOrderDescending);
    const layers = stackGenerator(businessData.data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];
    const totalList = businessData.data.map((item) => {
      let total = 0;
      keys.forEach((key) => {
        total += item[key];
      });
      return { year: item.year, total: total };
    });
    console.log(totalList);
    // scales
    const xScale = d3
      .scaleBand()
      .domain(businessData.data.map((d) => d.year))
      .range([0, width * 1.5])
      .padding(0.25);

    const yScale = d3.scaleLinear().domain(extent).range([height, 0]);

    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .style("opacity", 1)
      .attr("x", (sequence) => xScale(sequence.data.year))
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]))
      .on("mouseover", (event, d) => {
        const industry = Object.keys(d.data).find(
          (key) => d.data[key] === d[1] - d[0]
        );
        const count = d[1] - d[0];
        d3.select("#tooltip-container")
          .style("display", "inline-block")
          .html(`<b>Industry:</b> ${industry} <br/><b>Count:</b> ${count}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 700 + "px");
      })
      .on("mouseout", (event, d) => {
        d3.select("#tooltip-container").style("display", "none");
      });

    // axes
    const xAxis = d3.axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0,${height} )`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    const text = svg.selectAll(".text").data(totalList, (d) => d.year);
    text.exit().remove();
    text
      .enter()
      .append("text")
      .attr("class", "text")
      .attr("text-anchor", "middle")
      .merge(text)
      // .join(totalList)
      .attr("x", (d) =>
        d.total > 0 ? xScale(d.year) + xScale.bandwidth() / 2 : 0
      )
      .attr("y", (d) => (d.total > 0 ? yScale(d.total) - 5 : 0))
      .text((d) => (d.total > 0 ? d.total : null));
  }, [colors, keys, height, width]);

  return (
    <>
      <div id="tooltip-container">
        <p id="tooltip-text">Tooltip text</p>
      </div>
      <div className="chart">
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};

const SectionTwo = () => {
  const allKeys = Object.keys(colors);
  const [checkedList, setCheckedList] = useState(Object.keys(colors));
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = useState(true);
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < allKeys.length);
    setCheckAll(list.length === checkedList.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? allKeys : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return (
    <>
      <section className="sectionTwo">
        <div className="sectionTitle">
          <h1>Business Market Overview</h1>
          <p>From 2015 - 2019</p>
        </div>
        <div className="container">
          <div className="left">
            <BarChart keys={checkedList} colors={colors} />
          </div>
          <div className="right">
            <div className="text">
              <h2>Average growth rate: </h2>
              <h2>Average survival years: </h2>
            </div>
            <div className="options">
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                All Industries
              </Checkbox>
              <hr />
              <CheckboxGroup
                // options={allKeys}
                value={checkedList}
                onChange={onChange}
              >
                {allKeys.map((key, index) => (
                  <div>
                    <Checkbox key={index} value={key}>
                      {key}
                    </Checkbox>
                  </div>
                ))}
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionTwo;
