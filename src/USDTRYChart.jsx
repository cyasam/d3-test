import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Watch } from 'react-loader-spinner';
import LineChart from './components/line-chart';

const generateDataset = (data) => ({
  labels: Object.keys(data),
  data: Object.keys(data).map((key) => data[key]['TRY']),
});

function USDTRYChart() {
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState();
  const color = '#FF5733';

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('apikey', import.meta.env.VITE_APIKEY);

      const response = await axios.get(
        'https://api.apilayer.com/exchangerates_data/timeseries?start_date=2021-08-08&end_date=2022-08-08',
        {
          headers: {
            'Content-Type': 'application/json',
            apikey: myHeaders.get('apikey'),
          },
        }
      );

      setLoading(false);

      setDataset(generateDataset(response.data.rates));
    };

    fetchExchangeRate();
  }, []);

  if (loading)
    return (
      <div className="loading">
        <Watch color={color} />
      </div>
    );

  if (!dataset) return null;

  return (
    <div className="charts">
      <div className="line chart-container">
        <LineChart
          lineColor={color}
          axisYPosition="both"
          labels={dataset.labels}
          dataset={dataset.data}
        />
      </div>
    </div>
  );
}

export default USDTRYChart;
