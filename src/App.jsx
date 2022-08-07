import { useState } from 'react';
import './App.css';
import HorizontalBarChart from './components/HorizontalBarChart';
import VerticalBarChart from './components/vertical-bar-chart';

const generateDataset = () => ({
  labels: [2016, 2017, 2018, 2019, 2020, 2021],
  data: [214549, 210771, 212538, 209857, 178545, 185217],
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
      <HorizontalBarChart labels={dataset.labels} dataset={dataset.data} />
    </div>
  );
}

export default App;
