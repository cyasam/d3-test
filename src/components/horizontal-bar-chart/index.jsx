import React from 'react';
import Chart from './Chart';
import XAxis from './XAxis';
import YAxis from './YAxis';

function HorizontalBarChart({
  labels,
  dataset,
  axisYPosition = 'left',
  axisXPosition = 'bottom',
  marginX = 30,
  marginY = 30,
}) {
  return (
    <Chart
      labels={labels}
      dataset={dataset}
      marginX={marginX}
      marginY={marginY}
    >
      <XAxis axisXPosition={axisXPosition} />
      <YAxis axisYPosition={axisYPosition} />
    </Chart>
  );
}

export default HorizontalBarChart;
