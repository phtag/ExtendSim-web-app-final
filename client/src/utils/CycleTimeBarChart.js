// Cycle-TimeBarChart.js
import React from 'react';
import UserContext from './UserContext'; 
import {Bar, Line} from 'react-chartjs-2';

class CycleTimeBarChart extends React.Component {
    render() {
        const {cycleTimeChartData} = this.props;
        const ChartData = {
            labels: cycleTimeChartData.avgWaitTime.map(element => (element.label)),
            datasets: [
                {
                    label: 'Avg. Process Time',
                    data: cycleTimeChartData.avgProcessTime.map(element => (element.value)),
                    backgroundColor: 
                        'rgba(0, 0, 255, .75)'
                },
                {
                    label: 'Avg. Wait Time',
                    data: cycleTimeChartData.avgWaitTime.map(element => (element.value)),
                    backgroundColor: 
                        'rgba(255, 0, 0, .75)'
                },               
            ] 

        }
        const legendItems = [
            { title: 'Avg. Wait Time', color: 'red', stroke: '#fff', strokeWidth: '10' },
            { title: 'Avg. Process Time', color: 'blue', stroke: '#fff', strokeWidth: '2' }
        ];
        return (
            <div id="cycle-time-chart">
                <Bar
                    data={ChartData}
                    options={{
                        title:{
                            display: true,
                            fontSize: 30,
                            text: 'Avg. Wait Time/Avg. Process Time by Process Step'
                        },
                        scales: {
                            xAxes: [
                                { 
                                    display:true,
                                    stacked: true ,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Process Steps',
                                        fontSize: 24
                                    }
                                }],
                            yAxes: [
                                { 
                                    display:true,
                                    stacked: true ,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time (hrs)',
                                        fontSize: 24
                                    }
                                }
                            ]
                          },
                        legend: {
                            display: true,
                            position: 'right',
                            // labels: ['Step1', 'Step2', 'Step3']
                        },
                        layout: {}
                    }}
                />
            </div>
        );
    }
}
export default CycleTimeBarChart;