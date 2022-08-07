import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useMeasure } from 'react-use';

const initChart = ({ dataset, labels }) => {
  const calcXDomain = () => {
    return labels;
  };

  const calcYDomain = () => {
    return [
      d3.max(dataset, function (d) {
        return d.value;
      }),
      0,
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
      .scaleLinear()
      .range([width - marginX * 2, 0])
      .domain(domainY);

    const yScale = d3
      .scaleBand()
      .range([0, height - marginY * 2])
      .domain(domainX)
      .paddingInner(0.2)
      .paddingOuter(0.5);

    return {
      xScale,
      yScale,
    };
  }, [width, height, marginX, marginY, domainX, domainY]);

  useEffect(() => {
    if (width === 0 || height === 0) return;

    const bars = d3
      .select(svgRef.current)
      .selectAll('.bar')
      .data(chartData)
      .attr('height', yScale.bandwidth())
      .attr('width', (d) => xScale(d.value))
      .attr('x', () => marginX)
      .attr('y', (d) => yScale(d.label) + marginY);
  }, [chartData, marginX, marginY, xScale, yScale]);

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
