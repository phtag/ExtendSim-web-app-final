// Cycle-TimeBarChart.js
import React from 'react';
import UserContext from './UserContext'; 
import {Bar, Line} from 'react-chartjs-2';

class ResourceBarChart extends React.Component {
    static contextType = UserContext;
    state = {
        dataSeries1: [],
        dataSeries2: [],
        dataSeriesDisplay: [],
        dataSeriesLabels: []
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
        const { resourceChartData } = this.context;

        if (chartType == "idle-busy") {
            this.state.dataSeries1  = resourceChartData.TotalBusyTime;
            this.state.dataSeries2  = resourceChartData.TotalIdleTime;
            this.state.dataSeriesLabels[0] = 'Total Busy Time';
            this.state.dataSeriesLabels[1] = 'Total Idle Time';
            this.state.dataSeriesDisplay[0] = true;
            this.state.dataSeriesDisplay[1] = true;
        } else  if (chartType == "utilization") {
            this.state.dataSeries1  = resourceChartData.Utilization;
            this.state.dataSeries2  = resourceChartData.Utilization;
            this.state.dataSeriesLabels[0] = 'Utilization';
            this.state.dataSeriesDisplay[0] = true;
            this.state.dataSeriesDisplay[1] = false;

        }
        var ChartData = {
            // labels: resourceChartData.TotalIdleTime.map(element => (element.label)),
            labels: this.state.dataSeries1.map(element => (element.label)),
            datasets: [
                {
                    label: this.state.dataSeriesLabels[0],
                    // data: resourceChartData.TotalBusyTime.map(element => (element.value)),
                    data: this.state.dataSeries1.map(element => (element.value)),
                    backgroundColor: 'rgba(0, 0, 255, .75)',
                    hidden:  !this.state.dataSeriesDisplay[0]
                },
                {
                    label: this.state.dataSeriesLabels[1],
                    // data: resourceChartData.TotalIdleTime.map(element => (element.value)),
                    data: this.state.dataSeries2.map(element => (element.value)),
                    backgroundColor: 'rgba(255, 0, 0, .75)',
                    hidden:  !this.state.dataSeriesDisplay[1]
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
                                        fontSize: chartProperties.axesLabelFontSize
                                    }
                                }],
                            yAxes: [
                                { 
                                    display:true,
                                    stacked: true ,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time (hrs)',
                                        fontSize: chartProperties.axesLabelFontSize
                                    }
                                }
                            ]
                          },
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                filter: () => function(legendItem, ChartData) {
                                 if (this.state.dataSeriesDisplay[legendItem.datasetIndex]) {
                                   return false;
                                 }
                                return true;
                                }
                             }
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