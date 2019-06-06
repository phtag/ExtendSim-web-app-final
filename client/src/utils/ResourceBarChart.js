// Cycle-TimeBarChart.js
import React from 'react';
import UserContext from './UserContext'; 
import {Bar, Line} from 'react-chartjs-2';

class ResourceBarChart extends React.Component {
    static contextType = UserContext;
    state = {
        dataSeries1: [],
        dataSeries2: []
    }

    handlePopupChange = (event) => {

    }
    componentDidMount () {
        const { resourceChartData } = this.context;
        this.dataSeries1 = resourceChartData.TotalBusyTime;
        this.dataSeries2 = resourceChartData.TotalIdleTime;
    };
    render() {
        const {chartType, chartTitle} = this.props;
        // this.dataSeries1 = resourceChartData.TotalBusyTime;
        // this.dataSeries2 = resourceChartData.TotalIdleTime;
        const { resourceChartData, resourceChartDataSeries1, resourceChartDataSeries2 } = this.context;

        if (chartType == "idle-busy") {
            this.dataSeries1  = resourceChartData.TotalBusyTime;
            this.dataSeries2  = resourceChartData.TotalIdleTime;
        } else  if (chartType == "utilization") {
            this.dataSeries1  = resourceChartData.TotalOrdersServiced;
            this.dataSeries2  = resourceChartData.TotalOrdersServiced;           
        }
        alert('Resource bar chart: chartType=' + chartType);

        var ChartData = {
            // labels: resourceChartData.TotalIdleTime.map(element => (element.label)),
            labels: this.dataSeries1.map(element => (element.label)),
            datasets: [
                {
                    label: 'Total Busy Time',
                    // data: resourceChartData.TotalBusyTime.map(element => (element.value)),
                    data: this.dataSeries1.map(element => (element.value)),
                    backgroundColor: 
                        'rgba(0, 0, 255, .75)'
                },
                {
                    label: 'Total Idle Time',
                    // data: resourceChartData.TotalIdleTime.map(element => (element.value)),
                    data: this.dataSeries2.map(element => (element.value)),
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
            <UserContext.Consumer>
            {({chartProperties}) => (
            <div id="cycle-time-chart">
                <Bar
                    data={ChartData}
                    options={{
                        title:{
                            display: true,
                            fontSize: chartProperties.titleFontSize,
                            text: chartTitle
                            // text: 'Total Idle Time/Total Busy Time by Resource'
                        },
                        scales: {
                            xAxes: [
                                { 
                                    display:true,
                                    stacked: true ,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Resources',
                                        fontSize: chartProperties.axesFontSize
                                    }
                                }],
                            yAxes: [
                                { 
                                    display:true,
                                    stacked: true ,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time (hrs)',
                                        fontSize: chartProperties.axesFontSize
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
        )}
        </UserContext.Consumer>  
        );
    }
}
export default ResourceBarChart;