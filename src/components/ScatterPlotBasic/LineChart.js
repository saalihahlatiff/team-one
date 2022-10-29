import React, { Component } from 'react';
import { scaleBand, scaleUtc, scaleLinear, scaleTime, scaleSequential} from 'd3-scale'
import * as d3 from 'd3';
import Axes from './Axes'
import Line from './Line'
import data from './data/data'
import { timeDay } from 'd3-time';
import {timeFormat, timeParse} from "d3-time-format"

class LineChart extends Component {
  constructor() {
    super()
      this.xScale = scaleTime()
      this.yScale = scaleLinear()
    }
   
   
   
    render() {
        
        let margins = {top: 10, right: 30, bottom: 30, left: 60}
        const svgDimensions = { width: 460 - margins.left - margins.right, 
          height: 400 - margins.top - margins.bottom}
        const max = d3.max(data, d => Math.abs(d.value))
        const min= d3.min(data, d => Math.abs(d.value))
       
        
        const xScale = this.xScale
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, svgDimensions.width ]);

        const yScale = this.yScale
        .domain( [8000, 9200])
        .range([ svgDimensions.height, 0 ]);
        return (
        <div>
            
          <svg  viewBox={`0 0 ${svgDimensions.width+ margins.left + margins.right} ${svgDimensions.width+ margins.top + margins.bottom}`}>
            <Axes
            scales={{ xScale, yScale }}
            margins={margins}
            svgDimensions={svgDimensions}
            />
            <Line scales={{ xScale, yScale }}
                svgDimensions={svgDimensions}
                margins={margins}
                maxValue={max}
                minValue={min}
                data={data} 
              
            />
          </svg> 
          </div>
        );
      }
}
export default LineChart;