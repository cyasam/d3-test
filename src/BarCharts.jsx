import { useState } from 'react';
import HorizontalBarChart from './components/horizontal-bar-chart';
import VerticalBarChart from './components/vertical-bar-chart';
import { randomColor } from './utils';

const generateDataset = () => ({
  labels: [2016, 2017, 2018, 2019, 2020, 2021],
  data: [
    {
      value: 214549,
      color: randomColor(),
    },
    {
      value: 210771,
      color: randomColor(),
    },
    {
      value: 212538,
      color: randomColor(),
    },
    {
      value: 209857,
      color: randomColor(),
    },
    {
      value: 178545,
      color: randomColor(),
    },
    {
      value: 185217,
      color: randomColor(),
    },
  ],
});

function BarCharts() {
  const [dataset, setDataset] = useState(generateDataset());
  return (
    <div className="charts">
      <div className="vertical chart-container">
        <VerticalBarChart
          axisXPosition="both"
          axisYPosition="both"
          labels={dataset.labels}
          dataset={dataset.data}
          marginX={50}
        />
      </div>
      <div className="horizontal chart-container">
        <HorizontalBarChart
          axisXPosition="both"
          axisYPosition="both"
          labels={dataset.labels}
          dataset={dataset.data}
          marginX={50}
        />
      </div>
    </div>
  );
}

export default BarCharts;
