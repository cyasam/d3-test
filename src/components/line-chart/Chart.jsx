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

const Chart = ({
  labels,
  dataset,
  marginX,
  marginY,
  lineColor,
  areaColor,
  children,
}) => {
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
      .attr('stroke', lineColor)
      .attr('stroke-width', 2)
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

    const I = d3.range(labels.length);
    const defined = (_, i) =>
      !isNaN(new Date(labels[i]).getTime()) && !isNaN(dataset[i]);
    const D = d3.map(chartData, defined);

    const area = d3
      .area()
      .defined((_, i) => D[i])
      .curve(d3.curveLinear)
      .x((i) => xScale(new Date(labels[i])))
      .y0(yScale(0))
      .y1((i) => yScale(dataset[i]));

    d3.select(svgRef.current)
      .select('.area')
      .attr('fill', areaColor)
      .attr('d', area(I));
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
          <path className="area" />
        </svg>
      </div>
    </ChartContext.Provider>
  );
};

export default Chart;
