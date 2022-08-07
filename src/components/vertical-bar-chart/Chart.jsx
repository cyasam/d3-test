import { createContext, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { randomColor } from '../../utils';

const g = (svgSelection) => svgSelection.append('g').attr('class', 'group');

const initChart = ({ dataset, labels }) => {
  const calcXDomain = () => {
    return labels;
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
          label: labels[i],
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
  const [chartWidth, setChartWidth] = useState();
  const [chartHeight, setChartHeight] = useState();

  const { domainX, domainY, chartData } = initChart({ labels, dataset });
  const mountedRef = useRef();

  const svgRef = useRef();
  const xScaleRef = useRef();
  const yScaleRef = useRef();

  useEffect(() => {
    if (mountedRef.current) return;

    const svg = svgRef.current;
    const svgWidth = svg.clientWidth;
    const svgHeight = svg.clientHeight;

    setChartWidth(svgWidth);
    setChartHeight(svgHeight);

    xScaleRef.current = d3
      .scaleBand()
      .range([marginX, svgWidth - marginX])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(domainX);

    yScaleRef.current = d3
      .scaleLinear()
      .range([svgHeight - marginY, marginY + 20, marginY])
      .domain(domainY);

    mountedRef.current = true;
  }, []);

  useEffect(() => {
    if (!chartWidth || !chartHeight) return;

    const svg = svgRef.current;
    const svgSelection = d3.select(svg);

    const xScale = xScaleRef.current;
    const yScale = yScaleRef.current;

    const rects = svgSelection
      .selectAll('rect')
      .data(chartData)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => chartHeight - marginY - yScale(d.value))
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('fill', () => randomColor());
  }, [chartWidth, chartHeight]);

  return (
    <ChartContext.Provider
      value={{
        chartData,
        chartWidth,
        chartHeight,
        xScale: xScaleRef.current,
        yScale: yScaleRef.current,
        marginX,
        marginY,
      }}
    >
      <div className="chart">
        <svg width="500" height="400" ref={svgRef}>
          {children}
        </svg>
      </div>
    </ChartContext.Provider>
  );
};

export default Chart;
