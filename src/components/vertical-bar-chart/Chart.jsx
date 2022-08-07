import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useMeasure } from 'react-use';

const initChart = ({ dataset, labels }) => {
  const calcXDomain = () => {
    return labels;
  };

  const calcYDomain = () => {
    return [
      0,
      d3.max(dataset, function (d) {
        return d.value;
      }),
    ];
  };

  const handleData = () => {
    return Array(dataset.length)
      .fill(0)
      .map((value, i) => {
        return {
          label: labels[i],
          value: dataset[i].value,
          color: dataset[i].color,
        };
      });
  };

  return {
    domainX: calcXDomain(),
    domainY: calcYDomain(),
    chartData: handleData(),
  };
};

export const ChartContext = createContext();

const Chart = ({ labels, dataset, marginX, marginY, children }) => {
  const [chartWrapperRef, { width, height }] = useMeasure();
  const { domainX, domainY, chartData } = initChart({ labels, dataset });

  const svgRef = useRef();

  const { xScale, yScale } = useMemo(() => {
    const xScale = d3
      .scaleBand()
      .range([marginX, width - marginX])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(domainX);

    const yScale = d3
      .scaleLinear()
      .range([height - marginY, marginY + 20, marginY])
      .domain(domainY);

    return {
      xScale,
      yScale,
    };
  }, [width, height, marginX, marginY, domainX, domainY]);

  useEffect(() => {
    if (!svgRef.current || height === 0) return;

    const bars = d3
      .select(svgRef.current)
      .selectAll('.bar')
      .data(chartData)
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - marginY - yScale(d.value))
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value));
  }, [chartData, height, marginY, xScale, yScale]);

  return (
    <ChartContext.Provider
      value={{
        chartData,
        chartWidth: width,
        chartHeight: height,
        xScale,
        yScale,
        marginX,
        marginY,
      }}
    >
      <div className="chart" ref={chartWrapperRef}>
        <svg width="100%" height="100%" ref={svgRef}>
          {children}
          {chartData.map((d, i) => (
            <rect key={i} className="bar" fill={d.color} />
          ))}
        </svg>
      </div>
    </ChartContext.Provider>
  );
};

export default Chart;
