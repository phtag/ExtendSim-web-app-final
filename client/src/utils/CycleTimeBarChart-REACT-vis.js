// Cycle-TimeBarChart.js
import React from 'react';
import UserContext from './UserContext'; 
import {
    XYPlot,
    XAxis, // Shows the values on x axis
    YAxis, // Shows the values on y axis
    VerticalBarSeries,
    HorizontalGridLines,
    VerticalGridLines,
    ChartLabel
} from 'react-vis';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';


class CycleTimeBarChart extends React.Component {
    render() {
        const {cycleTimeChartData} = this.props;
        const chartWidth = 800;
        const chartHeight = 500;
        const chartDomain = [0, 20];
        const legendItems = [
            { title: 'Avg. Wait Time', color: 'red', stroke: '#fff', strokeWidth: '10' },
            { title: 'Avg. Process Time', color: 'blue', stroke: '#fff', strokeWidth: '2' }
        ];
        return (
            <div id="cycle-time-chart">
                <h3>Average Wait and Process Times by Process Step</h3>
                <XYPlot 
                    xType="ordinal" 
                    stackBy="y"
                    width={chartWidth} 
                    height={chartHeight} 
                    yDomain={chartDomain}
                >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <ChartLabel
                    text="X Axis"
                    // className="alt-x-label-mine"
                    includeMargin={false}
                    xPercent={0.5}
                    yPercent={-.01}
                />
                <YAxis />
                <ChartLabel
                    text="Y Axis"
                    // className="alt-y-label"
                    // includeMargin={false}
                    includeMargin={false}
                    xPercent={-0.05}
                    yPercent={0.50}
                    style={{
                        transform: 'rotate(-90)',
                        textAnchor: 'end',
                    }}
                />

                    <VerticalBarSeries
                        color="red"
                        data={cycleTimeChartData.avgWaitTime}
                    />
                    <VerticalBarSeries
                        color="blue"
                        data={cycleTimeChartData.avgProcessTime}
                    />
                    {/* <LabelSeries
                        data={cycleTimeData.map(obj => {
                            return { ...obj, label: obj.y.toString() }
                        })}
                        labelAnchorX="middle"
                        labelAnchorY="text-after-edge"
                    /> */}
                        <DiscreteColorLegend
                            style={
                                {
                                position: 'relative', 
                                left: '50px', 
                                top: '10px'
                                }
                            }
                            height={200}
                            width={200}
                            items={legendItems}                      
                        />
                </XYPlot>
            </div>
        );
    }
}
export default CycleTimeBarChart;