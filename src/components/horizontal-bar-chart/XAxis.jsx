import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ChartContext } from './Chart';

const renderAxisBottom = ({ element, chartHeight, marginX, marginY }) => {
  return element.attr(
    'transform',
    `translate(${marginX}, ${chartHeight - marginY})`
  );
};

const renderAxisTop = ({ element, marginX, marginY }) => {
  return element.attr('transform', `translate(${marginX},  ${marginY})`);
};

function XAxis({ axisXPosition }) {
  const { xScale, chartWidth, chartHeight, marginX, marginY } =
    useContext(ChartContext);

  const xAxisRef = useRef();
  const xAxisElement = d3.select(xAxisRef.current);

  useEffect(() => {
    if (chartWidth === 0 || chartHeight === 0) return;

    if (axisXPosition === 'both') {
      renderAxisTop({
        element: xAxisElement.select('.top'),
        marginX,
        marginY,
      }).call(d3.axisTop(xScale));
      renderAxisBottom({
        element: xAxisElement.select('.bottom'),
        chartHeight,
        marginX,
        marginY,
      }).call(d3.axisBottom(xScale));
    } else if (axisXPosition === 'top') {
      renderAxisTop({
        element: xAxisElement.select('.top'),
        marginX,
        marginY,
      }).call(d3.axisTop(xScale));
    } else {
      renderAxisBottom({
        element: xAxisElement.select('.bottom'),
        chartHeight,
        marginX,
        marginY,
      }).call(d3.axisBottom(xScale));
    }
  }, [chartHeight, xScale, marginX, marginY]);

  return (
    <g className="group x-axis" ref={xAxisRef}>
      <g className="top"></g>
      <g className="bottom"></g>
    </g>
  );
}

export default XAxis;
