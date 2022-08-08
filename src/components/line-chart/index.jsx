import React from 'react';
import Chart from './Chart';
import XAxis from './XAxis';
import YAxis from './YAxis';

function LineChart({
  labels,
  dataset,
  axisXPosition = 'bottom',
  axisYPosition = 'left',
  marginX = 30,
  marginY = 30,
  lineColor,
}) {
  return (
    <Chart
      labels={labels}
      dataset={dataset}
      marginX={marginX}
      marginY={marginY}
      lineColor={lineColor}
    >
      <XAxis axisXPosition={axisXPosition} />
      <YAxis axisYPosition={axisYPosition} />
    </Chart>
  );
}

export default LineChart;
