import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ChartContext } from './Chart';

const renderAxisYLeft = ({ element, marginX, marginY }) => {
  return element.attr('transform', `translate(${marginX}, ${marginY})`);
};

const renderAxisYRight = ({ element, chartWidth, marginX, marginY }) => {
  return element.attr(
    'transform',
    `translate(${chartWidth - marginX}, ${marginY})`
  );
};

function YAxis({ axisYPosition }) {
  const { yScale, chartWidth, chartHeight, marginX, marginY } =
    useContext(ChartContext);

  const yAxisRef = useRef();
  const yAxisElement = d3.select(yAxisRef.current);

  useEffect(() => {
    if (chartWidth === 0 || chartHeight === 0) return;

    if (axisYPosition === 'both') {
      renderAxisYLeft({
        element: yAxisElement.select('.left'),
        marginX,
        marginY,
      }).call(d3.axisLeft(yScale));

      renderAxisYRight({
        element: yAxisElement.select('.right'),
        chartWidth,
        marginX,
        marginY,
      }).call(d3.axisRight(yScale));
    } else if (axisYPosition === 'right') {
      renderAxisYRight({
        element: yAxisElement.select('.right'),
        chartWidth,
        marginX,
        marginY,
      }).call(d3.axisRight(yScale));
    } else {
      renderAxisYLeft({
        element: yAxisElement.select('.left'),
        marginX,
        marginY,
      }).call(d3.axisLeft(yScale));
    }
  }, [chartWidth, chartHeight, yScale]);

  return (
    <g className="group y-axis" ref={yAxisRef}>
      <g className="left"></g>
      <g className="right"></g>
    </g>
  );
}

export default YAxis;
