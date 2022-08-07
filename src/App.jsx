import { useState } from 'react';
import './App.css';
import HorizontalBarChart from './components/HorizontalBarChart';
import VerticalBarChart from './components/VerticalBarChart';

const generateDataset = () => [
  {
    year: 2016,
    value: 214549,
  },
  {
    year: 2017,
    value: 210771,
  },
  {
    year: 2018,
    value: 212538,
  },
  {
    year: 2019,
    value: 209857,
  },
  {
    year: 2020,
    value: 178545,
  },
  {
    year: 2021,
    value: 185217,
  },
];

function App() {
  const [dataset, setDataset] = useState(generateDataset());

  return (
    <div className="charts">
      <VerticalBarChart dataset={dataset} marginLeft={50} />
      <HorizontalBarChart dataset={dataset} marginBottom={30} />
    </div>
  );
}

export default App;
