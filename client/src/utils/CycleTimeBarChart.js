// Cycle-TimeBarChart.js
import React from 'react';
import UserContext from './UserContext'; 
import {
    XYPlot,
    XAxis, // Shows the values on x axis
    YAxis, // Shows the values on y axis
    VerticalBarSeries,
    LabelSeries
} from 'react-vis';

class CycleTimeBarChart extends React.Component {
    render() {
        const {cycleTimeChartData} = this.props;
        const chartWidth = 800;
        const chartHeight = 500;
        const chartDomain = [0, chartHeight];
        alert("Data series length=" + cycleTimeChartData.totalJobsProcessed.data.length)
        return (
            <XYPlot 
                xType="ordinal" 
                width={chartWidth} 
                height={chartHeight} 
                yDomain={chartDomain}
            >
            <XAxis />
            <YAxis />
            <VerticalBarSeries
                data={cycleTimeChartData.totalJobsProcessed.data}
            />
                {/* <LabelSeries
                    data={cycleTimeData.map(obj => {
                        return { ...obj, label: obj.y.toString() }
                    })}
                    labelAnchorX="middle"
                    labelAnchorY="text-after-edge"
                /> */}
            </XYPlot>
        );
    }
}
export default CycleTimeBarChart;