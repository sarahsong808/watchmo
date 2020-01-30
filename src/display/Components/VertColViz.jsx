import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";
import React, { useRef, useEffect, useState } from "react";
import "../stylesheets/style.scss"
import TimeViz from './TimeViz';

/* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */


function VertColViz() {
    const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);
    const svgRef = useRef();
    /*The most basic SVG file contains the following format:
  
    --Size of the viewport (Think of this as the image resolution)
    --Grouping instructions via the element -- How should elements be grouped?
    --Drawing instructions using the shapes elements
    --Style specifications describing how each element should be drawn.*/
    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);

        // scales
        const xScale = scaleBand()
            .domain(data.map((value, index) => index))
            .range([0, 300])
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0, 150])
            .range([150, 0]);

        const colorScale = scaleLinear()
            .domain([25, 50, 75, 100, 125, 150])
            .range(["red", "yellow", "green", "blue", "purple", "pink"])
            .clamp(true);

        // create x-axis
        const xAxis = axisBottom(xScale).ticks(data.length);
        svg
            .select(".x-axis")
            .style("transform", "translateY(150px)")
            .call(xAxis);

        // create y-axis
        //location of bars, the higher the number, the higher the position on the graph

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(300px)")
            .call(yAxis);

        // draw the bars
        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1, -1)")
            .attr("x", (value, index) => xScale(index))
            .attr("y", -150)
            .attr("width", xScale.bandwidth())
            .on("mouseenter", (value, index) => {
                svg
                    .selectAll(".tooltip")
                    .data([value])
                    .join(enter => enter.append("text").attr("y", yScale(value) - 4))
                    .attr("class", "tooltip")
                    .text(value)
                    .attr("x", xScale(index) + xScale.bandwidth() / 2)
                    .attr("text-anchor", "middle")
                    .transition()
                    .attr("y", yScale(value) - 8)
                    .attr("opacity", 1);
            })
            .on("mouseleave", () => svg.select(".tooltip").remove())
            .transition()
            .attr("fill", colorScale)
            .attr("height", value => 150 - yScale(value));
    }, [data]);
    /*React fragments let you group a list of children without adding extra nodes to the DOM 
           because fragments are not rendered to the DOM. */
    return (
        <React.Fragment>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <button onClick={() => setData(data.map(value => value + 5))}>
                Update data
        </button>
            <button onClick={() => setData(data.filter(value => value < 35))}>
                Filter data
        </button>
            <button
                onClick={() => setData([...data, Math.round(Math.random() * 100)])}
            >
                Add data
        </button>
            <div>
                <TimeViz />
            </div>
        </React.Fragment>
    );
}


export default VertColViz;