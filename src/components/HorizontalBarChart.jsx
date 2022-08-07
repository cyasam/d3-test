import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { randomColor } from '../utils';

function HorizontalBarChart({ dataset, marginLeft = 30, marginBottom = 30 }) {
  const svgRef = useRef();
  const mountedRef = useRef();

  const xScaleRef = useRef();
  const yScaleRef = useRef();

  const g = (svgElement) => svgElement.append('g').attr('class', 'group');

  useEffect(() => {
    if (mountedRef.current) return;

    const svgElement = d3.select(svgRef.current);
    const svgWidth = svgRef.current.clientWidth;
    const svgHeight = svgRef.current.clientHeight;

    const calcXDomain = () => {
      return dataset.map((data) => data.year).reverse();
    };

    const calcYDomain = () => {
      return [
        d3.max(dataset, function (d) {
          return d.value;
        }),
        0,
      ];
    };

    xScaleRef.current = d3
      .scaleLinear()
      .range([svgWidth - marginLeft * 2, 0])
      .domain(calcYDomain());

    yScaleRef.current = d3
      .scaleBand()
      .range([0, svgHeight - marginBottom * 2])
      .domain(calcXDomain())
      .paddingInner(0.2)
      .paddingOuter(0.5);

    const xScale = yScaleRef.current;
    const yScale = xScaleRef.current;

    g(svgElement)
      .classed('x-axis', true)
      .attr(
        'transform',
        `translate(${marginLeft}, ${svgHeight - marginBottom})`
      )
      .call(d3.axisBottom(yScale));
    g(svgElement)
      .classed('x-axis', true)
      .attr('transform', `translate(${marginLeft},  ${marginBottom})`)
      .call(d3.axisTop(yScale));

    g(svgElement)
      .classed('y-axis', true)
      .attr('transform', `translate(${marginLeft}, ${marginBottom})`)
      .call(d3.axisLeft(xScale));

    svgElement
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('height', xScale.bandwidth())
      .attr('width', (d) => yScale(d.value))
      .attr('x', (d) => marginLeft)
      .attr('y', (d) => xScale(d.year) + marginBottom)
      .attr('fill', () => randomColor());

    mountedRef.current = true;
  }, []);

  return (
    <div className="chart">
      <svg width="500" height="400" ref={svgRef} />
    </div>
  );
}

export default HorizontalBarChart;
