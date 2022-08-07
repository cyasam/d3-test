import React, { useContext, useEffect } from 'react';
import * as d3 from 'd3';
import { ChartContext } from './Chart';

const renderAxisBottom = ({ chartHeight, marginY }) => {
  const gBottom = d3.select('g.group .bottom');
  return gBottom.attr('transform', `translate(0, ${chartHeight - marginY})`);
};

const renderAxisTop = ({ marginY }) => {
  const gTop = d3.select('g.group .top');
  return gTop.attr('transform', `translate(0,  ${marginY})`);
};

function XAxis({ axisXPosition }) {
  const { xScale, chartWidth, chartHeight, marginY } = useContext(ChartContext);

  useEffect(() => {
    if (!xScale) return;
    if (chartWidth === 0 || chartHeight === 0) return;

    if (axisXPosition === 'both') {
      renderAxisTop({ marginY }).call(d3.axisTop(xScale));
      renderAxisBottom({ chartHeight, marginY }).call(d3.axisBottom(xScale));
    } else if (axisXPosition === 'top') {
      renderAxisTop({ marginY }).call(d3.axisTop(xScale));
    } else {
      renderAxisBottom({ chartHeight, marginY }).call(d3.axisBottom(xScale));
    }
  }, [chartHeight, xScale]);

  return (
    <g className="group x-axis">
      <g className="top"></g>
      <g className="bottom"></g>
    </g>
  );
}

export default XAxis;
