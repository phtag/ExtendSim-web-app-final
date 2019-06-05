// Cycle-TimeBarChart.js
import React from 'react';
import UserContext from './UserContext'; 
import {Bar, Line} from 'react-chartjs-2';

class PoolBarChart extends React.Component {
    render() {
        const {poolChartData} = this.props;
        const ChartData = {
            labels: poolChartData.TotalIdleTime.map(element => (element.label)),
            datasets: [
                {
                    label: 'Total Busy Time',
                    data: poolChartData.TotalBusyTime.map(element => (element.value)),
                    backgroundColor: 
                        'rgba(0, 0, 255, .75)'
                },
                {
                    label: 'Total Idle Time',
                    data: poolChartData.TotalIdleTime.map(element => (element.value)),
                    backgroundColor: 
                        'rgba(255, 0, 0, .75)'
                },               
            ] 

        }
        const legendItems = [
            { title: 'Total Idle Time', color: 'red', stroke: '#fff', strokeWidth: '10' },
            { title: 'Total Busy Time', color: 'blue', stroke: '#fff', strokeWidth: '2' }
        ];
        return (
            <div id="cycle-time-chart">
                <Bar
                    data={ChartData}
                    options={{
                        title:{
                            display: true,
                            fontSize: 30,
                            text: 'Total Idle Time/Total Busy Time by Pool'
                        },
                        scales: {
                            xAxes: [
                                { 
                                    display:true,
                                    stacked: true ,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Pools',
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
                        },
                        layout: {}
                    }}
                />
            </div>
        );
    }
}
export default PoolBarChart;