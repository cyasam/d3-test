import { useState } from 'react';
import './App.css';
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

function App() {
  const [dataset, setDataset] = useState(generateDataset());

  return (
    <div className="charts">
      <VerticalBarChart
        axisXPosition="both"
        axisYPosition="both"
        labels={dataset.labels}
        dataset={dataset.data}
        marginX={50}
      />
      <HorizontalBarChart
        axisXPosition="both"
        axisYPosition="both"
        labels={dataset.labels}
        dataset={dataset.data}
        marginX={50}
      />
    </div>
  );
}

export default App;
