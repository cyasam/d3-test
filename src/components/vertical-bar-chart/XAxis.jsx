import React, { useContext, useEffect } from 'react';
import * as d3 from 'd3';
import { ChartContext } from './Chart';

const renderAxisBottom = ({ chartHeight, g, marginY }) => {
  const gBottom = g.append('g').classed('bottom', true);
  return gBottom.attr('transform', `translate(0, ${chartHeight - marginY})`);
};

const renderAxisTop = ({ g, marginY }) => {
  const gTop = g.append('g').classed('top', true);
  return gTop.attr('transform', `translate(0,  ${marginY})`);
};

function XAxis({ axisXPosition }) {
  const { xScale, chartWidth, chartHeight, marginY } = useContext(ChartContext);

  useEffect(() => {
    if (!chartWidth || !chartHeight || !xScale) return;

    const g = d3.select('g.group');

    if (axisXPosition === 'both') {
      renderAxisTop({ g, marginY }).call(d3.axisTop(xScale));
      renderAxisBottom({ chartHeight, g, marginY }).call(d3.axisBottom(xScale));
    } else if (axisXPosition === 'top') {
      renderAxisTop({ g, marginY }).call(d3.axisTop(xScale));
    } else {
      renderAxisBottom({ chartHeight, g, marginY }).call(d3.axisBottom(xScale));
    }
  }, [chartWidth, chartHeight, xScale]);

  return <g className="group x-axis" />;
}

export default XAxis;
