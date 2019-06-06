// Cycle-TimeBarChart.js
import React from 'react';
import UserContext from './UserContext'; 
import {Bar, Line} from 'react-chartjs-2';

class CycleTimeBarChart extends React.Component {
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
        // const { cycleTimeChartData } = this.context;
        // this.dataSeries1 = cycleTimeChartData.TotalBusyTime;
        // this.dataSeries2 = cycleTimeChartData.TotalIdleTime;
    };
    render() {
        // totalJobsProcessed: [],
        // totalProcessTime: [],
        // totalWaitTime: [],
        // avgProcessTime: [], 
        // avgWaitTime: [],
        // avgCycleTime: [],
  
        const {chartType} = this.props;
        const { cycleTimeChartData } = this.context;
        if (chartType == "avg-wait-process") {
            this.state.chartTitle = 'Avg. Wait-Time/Avg. Process-Time by Process Step';
            this.state.YaxisTitle = 'Time (hrs)'
            this.state.XaxisTitle = 'Process Steps'
            this.state.dataSeries1  = cycleTimeChartData.avgProcessTime;
            this.state.dataSeries2  = cycleTimeChartData.avgWaitTime;
            this.state.dataSeriesLabels[0] = 'Avg. Process Time';
            this.state.dataSeriesLabels[1] = 'Avg. Wait Time';
            this.state.dataSeriesDisplay[0] = true;
            this.state.dataSeriesDisplay[1] = true;
            this.state.dataSeriesBorderWidths[0] = 2;
            this.state.dataSeriesBorderWidths[1] = 2;
            this.state.dataSeriesBackgroundColors[0] = 'rgba(255, 0, 0, .75)';
            this.state.dataSeriesBackgroundColors[1] = 'rgba(0, 0, 255, .75)';
        } else if (chartType == "total-wait-process") {
            this.state.chartTitle = 'Total Wait-Time/Total Process-Time by Process Step';
            this.state.YaxisTitle = 'Time (hrs)'
            this.state.XaxisTitle = 'Process Steps'
            this.state.dataSeries1  = cycleTimeChartData.totalProcessTime;
            this.state.dataSeries2  = cycleTimeChartData.totalWaitTime;
            this.state.dataSeriesLabels[0] = 'Total Process Time';
            this.state.dataSeriesLabels[1] = 'Total Wait Time';
            this.state.dataSeriesDisplay[0] = true;
            this.state.dataSeriesDisplay[1] = true;
            this.state.dataSeriesBorderWidths[0] = 2;
            this.state.dataSeriesBorderWidths[1] = 2;
            this.state.dataSeriesBackgroundColors[0] = 'rgba(255, 0, 0, .75)';
            this.state.dataSeriesBackgroundColors[1] = 'rgba(0, 0, 255, .75)';
        } else  if (chartType === "total-jobs-processed") {
            this.state.chartTitle = 'Total Jobs Processed by Process Step';
            this.state.YaxisTitle = 'Jobs Processed'
            this.state.XaxisTitle = 'Process Steps'
            this.state.dataSeries1  = cycleTimeChartData.totalJobsProcessed;
            this.state.dataSeriesLabels[0] = 'Total Jobs Processed';
            this.state.dataSeriesLabels[1] = '';
            this.state.dataSeriesDisplay[0] = true;
            this.state.dataSeriesDisplay[1] = false;
            this.state.dataSeriesBorderWidths[0] = 2;
            this.state.dataSeriesBorderWidths[1] = 0;
            this.state.dataSeriesBackgroundColors[0] = 'rgba(0, 255, 0, 1)';
            this.state.dataSeriesBackgroundColors[1] = 'rgba(0, 0, 0, 0)';
        }  else  if (chartType == "covarrivals-covdepartures") {
            this.state.chartTitle = 'Coefficient of Variation Arrivals/Departures by Process Step';
            this.state.YaxisTitle = 'CoV Arrivals/CoV Departures'
            this.state.XaxisTitle = 'Process Step'
            this.state.dataSeries1  = cycleTimeChartData.CoVarrivals;
            this.state.dataSeries2  = cycleTimeChartData.CoVdepartures;
            this.state.dataSeriesLabels[0] = 'CoV Arrivals';
            this.state.dataSeriesLabels[1] = 'CoV Departures';
            this.state.dataSeriesDisplay[0] = true;
            this.state.dataSeriesDisplay[1] = true;
            this.state.dataSeriesBorderWidths[0] = 2;
            this.state.dataSeriesBorderWidths[1] = 2;
            this.state.dataSeriesBackgroundColors[0] = 'rgba(150, 50, 200, 1)';
            this.state.dataSeriesBackgroundColors[1] = 'rgba(0, 150, 25, 1)';
        }

        var ChartData = {
            labels: this.state.dataSeries1.map(element => (element.label)),
            datasets: [
                {
                    label: this.state.dataSeriesLabels[0],
                    data: this.state.dataSeries1.map(element => (element.value)),
                    backgroundColor: this.state.dataSeriesBackgroundColors[0],
                    hidden:  !this.state.dataSeriesDisplay[0],
                    borderWidth: this.state.dataSeriesBorderWidths[0]
                },
                {
                    label: this.state.dataSeriesLabels[1],
                    data: this.state.dataSeries2.map(element => (element.value)),
                    backgroundColor: this.state.dataSeriesBackgroundColors[1],
                    hidden:  !this.state.dataSeriesDisplay[1],
                    borderWidth: this.state.dataSeriesBorderWidths[1]
                },               
            ] 

        }
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
export default CycleTimeBarChart;