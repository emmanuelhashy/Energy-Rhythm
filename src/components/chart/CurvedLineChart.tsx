import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import type { DataPoint, LineChartProps } from "../../utils/types";
import { parsedData } from "../../utils/helper";

const margin = { top: 40, right: 40, bottom: 40, left: 60 };

const LineChart: React.FC<LineChartProps> = ({
  data,
  highlights,
  width = 400,
  height = 800,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Modified scales for vertical time axis
    const y = d3
      .scaleTime()
      .domain([
        d3.min(parsedData(data), (d) => d.time) as Date,
        d3.max(parsedData(data), (d) => d.time) as Date,
      ])
      .range([0, innerHeight]);

    const x = d3.scaleLinear().domain([0, 1]).nice().range([0, innerWidth]);

    // Modified line generator for vertical orientation
    const line = d3
      .line<DataPoint>()
      .x((d) => x(d.level))
      .y((d) => y(d.time))
      .curve(d3.curveBasis);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Modified axes
    const yAxis = d3
      .axisLeft(y)
      .ticks(24)
      .tickFormat((domainValue) => {
        // domainValue can be Date or NumberValue
        if (domainValue instanceof Date) {
          return d3.timeFormat("%-I:%M %p")(domainValue);
        }
        // fallback for NumberValue
        return domainValue.toString();
      });

    const yAxisGroup = g.append("g").attr("transform", `translate(0,0)`);

    yAxisGroup.call(yAxis).selectAll("text").style("font-size", "14px");
    yAxisGroup.select(".domain").remove();

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickFormat((d) => `${(Number(d) * 100).toFixed(0)}%`)
      )
      .selectAll("text")
      .style("font-size", "14px");

    // Add axis labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left - 30)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .text("Time of Day")
      .attr("fill", "white");

    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom + 2)
      .attr("text-anchor", "middle")
      .text("Energy Level")
      .attr("fill", "white");

    // Create gradient definitions
    const defs = svg.append("defs");

    // Create linear gradient
    const gradient = defs
      .append("linearGradient")
      .attr("id", "energy-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("x2", innerWidth);

    // Add color stops based on energy levels
    const colorStops = [
      { offset: 0, color: "#B7148E", threshold: 0 }, // Purple for low
      { offset: 0.3, color: "#DC8F69", threshold: 0.3 }, // Orange for medium
      { offset: 0.6, color: "#256EFF", threshold: 0.6 }, // Blue for high
    ];

    gradient
      .selectAll("stop")
      .data(colorStops)
      .enter()
      .append("stop")
      .attr("offset", (d) => `${d.offset * 100}%`)
      .attr("stop-color", (d) => d.color);

    // Create and animate the path with gradient
    const path = g
      .append("path")
      .datum(parsedData(data))
      .attr("fill", "none")
      .attr("stroke", "url(#energy-gradient)")
      .attr("stroke-width", 10)
      .attr("d", line);

    // Get the total length of the path
    const totalLength = path.node()?.getTotalLength() || 0;

    // Animate the path
    path
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

  }, [data, highlights, height, width]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="overflow-visible text-md"
      />
    </div>
  );
};

export default LineChart;
