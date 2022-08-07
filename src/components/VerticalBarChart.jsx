import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { randomColor } from '../utils';

function VerticalBarChart({ dataset, marginLeft = 30, marginBottom = 30 }) {
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
      return dataset.map((data) => data.year);
    };

    const calcYDomain = () => {
      return [
        0,
        d3.max(dataset, function (d) {
          return d.value;
        }),
      ];
    };

    xScaleRef.current = d3
      .scaleBand()
      .range([marginLeft, svgWidth - marginLeft])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(calcXDomain());
    yScaleRef.current = d3
      .scaleLinear()
      .range([svgHeight - marginBottom, marginBottom * 0.5, 0])
      .domain(calcYDomain());

    const xScale = xScaleRef.current;
    const yScale = yScaleRef.current;

    g(svgElement)
      .classed('x-axis', true)
      .attr('transform', `translate(0, ${svgHeight - marginBottom})`)
      .call(d3.axisBottom(xScale));

    g(svgElement)
      .classed('y-axis', true)
      .attr('transform', `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(yScale));

    const rects = svgElement
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => svgHeight - marginBottom - yScale(d.value))
      .attr('x', (d) => xScale(d.year))
      .attr('y', (d) => yScale(d.value))
      .attr('fill', () => randomColor());

    rects.on('click', function (event) {
      const text = d3
        .select('text')
        .text((d) => d.value)
        .attr('x', (d) => xScale(d.year))
        .attr('y', (d) => yScale(d.value));

      svgElement.select('text').append(text);
    });

    /* rects.on('mouseout', function () {
      d3.select(this).selectAll('text').remove();
    }); */

    mountedRef.current = true;
  }, []);

  return (
    <div className="chart">
      <svg width="500" height="400" ref={svgRef} />
    </div>
  );
}

export default VerticalBarChart;
