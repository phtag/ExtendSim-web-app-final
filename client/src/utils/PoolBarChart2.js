// Cycle-TimeBarChart.js
import React from 'react';
import UserContext from './UserContext'; 
import {Bar, Line} from 'react-chartjs-2';

class ResourceBarChart extends React.Component {
    static contextType = UserContext;
    state = {
        chartTitle: "",
        XaxisTitle: "",
        YaxisTitle: "",
        dataSeries1: [],
        dataSeries2: [],
        dataSeriesDisplay: [],
        dataSeriesLabels: [],
        dataSeriesBorderWidths: [],
        dataSeriesBackgroundColors: []
    }

    componentDidMount () {
        const { resourceChartData } = this.context;
        this.dataSeries1 = resourceChartData.TotalBusyTime;
        this.dataSeries2 = resourceChartData.TotalIdleTime;
    };
    render() {
        const {chartType} = this.props;
        const { resourceChartData } = this.context;
        if (chartType == "idle-busy") {
            this.state.chartTitle = 'Total Idle-Time/Total Busy-Time by Resource';
            this.state.YaxisTitle = 'Time (hrs)'
            this.state.XaxisTitle = 'Resources'
            this.state.dataSeries1  = resourceChartData.TotalBusyTime;
            this.state.dataSeries2  = resourceChartData.TotalIdleTime;
            this.state.dataSeriesLabels[0] = 'Total Busy Time';
            this.state.dataSeriesLabels[1] = 'Total Idle Time';
            this.state.dataSeriesDisplay[0] = true;
            this.state.dataSeriesDisplay[1] = true;
            this.state.dataSeriesBorderWidths[0] = 2;
            this.state.dataSeriesBorderWidths[1] = 2;
            this.state.dataSeriesBackgroundColors[0] = 'rgba(255, 0, 0, .75)';
            this.state.dataSeriesBackgroundColors[1] = 'rgba(0, 0, 255, .75)';
        } else  if (chartType === "utilization") {
            this.state.chartTitle = 'Utilization by Resource';
            this.state.YaxisTitle = 'Utilization'
            this.state.XaxisTitle = 'Resources'
            this.state.dataSeries1  = resourceChartData.Utilization;
            this.state.dataSeriesLabels[0] = 'Utilization';
            this.state.dataSeriesLabels[1] = '';
            this.state.dataSeriesDisplay[0] = true;
            this.state.dataSeriesDisplay[1] = false;
            this.state.dataSeriesBorderWidths[0] = 2;
            this.state.dataSeriesBorderWidths[1] = 0;
            this.state.dataSeriesBackgroundColors[0] = 'rgba(255, 100, 100, 1)';
            this.state.dataSeriesBackgroundColors[1] = 'rgba(0, 0, 0, 0)';
        }  else  if (chartType == "total-orders-serviced") {
            this.state.chartTitle = 'Total Orders Serviced by Resource';
            this.state.YaxisTitle = 'Orders Serviced'
            this.state.XaxisTitle = 'Resources'
            this.state.dataSeries1  = resourceChartData.TotalOrdersServiced;
            this.state.dataSeriesLabels[0] = 'Total Orders Serviced';
            this.state.dataSeriesLabels[1] = '';
            this.state.dataSeriesDisplay[0] = true;
            this.state.dataSeriesDisplay[1] = false;
            this.state.dataSeriesBorderWidths[0] = 2;
            this.state.dataSeriesBorderWidths[1] = 0;
            this.state.dataSeriesBackgroundColors[0] = 'rgba(0, 255, 0, 1)';
            this.state.dataSeriesBackgroundColors[1] = 'rgba(0, 0, 0, 0)';
        }

        var ChartData = {
            // labels: resourceChartData.TotalIdleTime.map(element => (element.label)),
            labels: this.state.dataSeries1.map(element => (element.label)),
            datasets: [
                {
                    label: this.state.dataSeriesLabels[0],
                    // data: resourceChartData.TotalBusyTime.map(element => (element.value)),
                    data: this.state.dataSeries1.map(element => (element.value)),
                    backgroundColor: this.state.dataSeriesBackgroundColors[0],
                    hidden:  !this.state.dataSeriesDisplay[0],
                    borderWidth: this.state.dataSeriesBorderWidths[0]
                },
                {
                    label: this.state.dataSeriesLabels[1],
                    // data: resourceChartData.TotalIdleTime.map(element => (element.value)),
                    data: this.state.dataSeries2.map(element => (element.value)),
                    backgroundColor: this.state.dataSeriesBackgroundColors[1],
                    hidden:  !this.state.dataSeriesDisplay[1],
                    borderWidth: this.state.dataSeriesBorderWidths[1]
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
                            text: this.state.chartTitle
                        },
                        scales: {
                            xAxes: [
                                { 
                                    display:true,
                                    stacked: true ,
                                    scaleLabel: {
                                        display: true,
                                        labelString: this.state.XaxisTitle,
                                        fontSize: chartProperties.axesLabelFontSize
                                    }
                                }],
                            yAxes: [
                                { 
                                    display:true,
                                    stacked: true ,
                                    scaleLabel: {
                                        display: true,
                                        labelString: this.state.YaxisTitle,
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