import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear, hsl, lab, darker, schemeCategory10 } from "d3";
import React, { useRef, useEffect, useState } from "react";
import "../stylesheets/style.scss"

/* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */


function TimeViz() {
    const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);
    // const [time, setTime] = useState([{ name: "Query 1", labelOffset: 60, value: function (t) { return d3.hsl(t, 1, 0.5); } },
    // ]);

    const svgRef = useRef();
    /*The most basic SVG file contains the following format:
  
    --Size of the viewport (Think of this as the image resolution)
    --Grouping instructions via the element -- How should elements be grouped?
    --Drawing instructions using the shapes elements
    --Style specifications describing how each element should be drawn.*/
    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        //range in the scales control how long the axis line is on the graph
        const xScale = scaleLinear().domain([0, data.length - 1]).range([0, 300]);


        const yScale = scaleLinear()
            //domain is the complete set of values and the range is the set of resulting values of a function
            .domain([0, 150])
            .range([150, 0]);

        // let z = schemeCategory10();
        //calling the xAxis function with current selection
        const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);
        svg.select('.x-axis').style('transform', "translateY(150px)").call(xAxis)
        //ticks are each value in the line
        const yAxis = axisRight(yScale).ticks(data.length).tickFormat(index => index + 0.01);
        svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);
        //initialize a line to the value of line 
        //x line is rendering xscale and y is rendering yscale
        const newLine = line().x((value, index) => xScale(index)).y(yScale).curve(curveCardinal);
        //select all the line elements you find in the svg and synchronize with data provided
        //wrap data in another array so d3 doesn't generate a new path element for every element in data array
        //join creates a new path element for every new piece of data
        //class line is to new updating path elements
        let g = svg
            .selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("d", newLine)
            .attr("fill", "none")
            .attr("stroke", "blue");
//adding label to each line -- coming back here
    //     g.append("text")
    //         .attr("x", () => setTime(time.map(d => d.labelOffset)) ;
    // })
    //     .attr("dy", -5)
    //     .style("fill", function (d, i) { return lab(z(i)).darker(); })
    //     .append("textPath")
    //     .text(function (d) { return d.name; });
},
//rerender data here
[data]);
return (
    <React.Fragment>
        <svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" /></svg>
        <br />
        <button onClick={() => setData(data.map(value => value + 5))}>
            Update Data </button>

    </React.Fragment >
)
}

export default TimeViz;


             //time will be populated depending on setTime function
    // const [time, setTime] = useState([{name: "Query 1", labelOffset: 60, value: function (t) { return d3.hsl(t, 1, 0.5); } },
    // {name: "Query 2", labelOffset: 20, value: function (t) { return d3.hcl(t, 1, 0, 5); } },
    // {name: "Query 3", labelOffset: 40, value: d3.scaleRainbow().domain([0, 360]) }]);
    // .map(function (color) {
    //     return color.deltas = d3.range(0, 360, 3).map(function (x) {
    //         return {
    //             input: x,
    //             delta: delta(color.value(x - 10), color.value(x + 10))
    //         };
    //     }), color;
    // });