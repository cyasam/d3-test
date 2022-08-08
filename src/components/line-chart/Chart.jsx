import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useMeasure } from 'react-use';

const initChart = ({ dataset, labels }) => {
  const calcXDomain = () => {
    return d3.extent(labels, function (d) {
      return d3.timeParse('%Y-%m-%d')(d);
    });
  };

  const calcYDomain = () => {
    return [
      0,
      d3.max(dataset, function (d) {
        return d;
      }),
    ];
  };

  const handleData = () => {
    return Array(dataset.length)
      .fill(0)
      .map((value, i) => {
        return {
          label: d3.timeParse('%Y-%m-%d')(labels[i]),
          value: dataset[i],
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
      .scaleTime()
      .range([marginX, width - marginX])
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
    if (width === 0 || height === 0) return;

    const lines = d3
      .select(svgRef.current)
      .select('.line')
      .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x(function (d) {
            return xScale(d.label);
          })
          .y(function (d) {
            return yScale(d.value);
          })
      );
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
          <path className="line" />
        </svg>
      </div>
    </ChartContext.Provider>
  );
};

export default Chart;
