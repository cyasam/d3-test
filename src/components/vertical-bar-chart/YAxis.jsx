import React, { useContext, useEffect } from 'react';
import * as d3 from 'd3';
import { ChartContext } from './Chart';

const renderAxisYLeft = ({ g, marginX }) => {
  const gLeft = d3.select('g.group .left');
  return gLeft.attr('transform', `translate(${marginX}, 0)`);
};

const renderAxisYRight = ({ g, chartWidth, marginX }) => {
  const gRight = d3.select('g.group .right');
  return gRight.attr('transform', `translate(${chartWidth - marginX}, 0)`);
};

function YAxis({ axisYPosition }) {
  const { yScale, chartWidth, chartHeight, marginX } = useContext(ChartContext);

  useEffect(() => {
    if (!chartWidth || !chartHeight || !yScale) return;

    const g = d3.select('g.group');

    if (axisYPosition === 'both') {
      renderAxisYLeft({ g, marginX }).call(d3.axisLeft(yScale));
      renderAxisYRight({ g, chartWidth, marginX }).call(d3.axisRight(yScale));
    } else if (axisYPosition === 'right') {
      renderAxisYRight({ g, chartWidth, marginX }).call(d3.axisRight(yScale));
    } else {
      renderAxisYLeft({ g, marginX }).call(d3.axisLeft(yScale));
    }
  }, [chartWidth, chartHeight, yScale]);

  return (
    <g className="group y-axis">
      <g className="left"></g>
      <g className="right"></g>
    </g>
  );
}

export default YAxis;
