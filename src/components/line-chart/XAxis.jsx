import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ChartContext } from './Chart';

const renderAxisBottom = ({ element, chartHeight, marginY }) => {
  return element.attr('transform', `translate(0, ${chartHeight - marginY})`);
};

const renderAxisTop = ({ element, marginY }) => {
  return element.attr('transform', `translate(0,  ${marginY})`);
};

function XAxis({ axisXPosition }) {
  const { xScale, chartWidth, chartHeight, marginY } = useContext(ChartContext);

  const xAxisRef = useRef();
  const xAxisElement = d3.select(xAxisRef.current);

  useEffect(() => {
    if (chartWidth === 0 || chartHeight === 0) return;

    if (axisXPosition === 'both') {
      renderAxisTop({
        element: xAxisElement.select('.top'),
        marginY,
      }).call(d3.axisTop(xScale));

      renderAxisBottom({
        element: xAxisElement.select('.bottom'),
        chartHeight,
        marginY,
      }).call(d3.axisBottom(xScale));
    } else if (axisXPosition === 'top') {
      renderAxisTop({
        element: xAxisElement.select('.top'),
        marginY,
      }).call(d3.axisTop(xScale));
    } else {
      renderAxisBottom({
        element: xAxisElement.select('.bottom'),
        chartHeight,
        marginY,
      }).call(d3.axisBottom(xScale));
    }
  }, [chartHeight, xScale]);

  return (
    <g className="group x-axis" ref={xAxisRef}>
      <g className="top"></g>
      <g className="bottom"></g>
    </g>
  );
}

export default XAxis;
