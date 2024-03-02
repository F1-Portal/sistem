'use strict';
$(document).ready(function() {
    var endpoint = '/nocs/visualizar_dados/api/'
    var defaultData = []
    var defaultData2 = []
    var labels = []
    console.log("error2");
    $.ajax({
        method: "GET",
        url: endpoint,

        success: function(data){
            labels = data.labels
            defaultData = data.default
            defaultData2 = data.default2
            setChart()
        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
    })

    function setChart(){
        setTimeout(function() {
            $(function() {
            var options = {
                  series: [
                  {
                    name: "High - 2013",
                    data: defaultData
                  },
                  {
                    name: "Low - 2013",
                    data: defaultData2
                  }
                ],

                chart: {
                      height: 450,
                      type: 'line',
                      dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                      },
                      toolbar: {
                        show: false
                      }
                },
                colors: ['#77B6EA', '#545454'],
                dataLabels: {
                  enabled: true,
                },
                stroke: {
                  curve: 'smooth'
                },
                title: {
                  text: 'Average High & Low Temperature',
                  align: 'left'
                },
                grid: {
                  borderColor: '#e7e7e7',
                  row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                  },
                },
                markers: {
                  size: 1
                },
                xaxis: {
                  categories: labels,
                  title: {
                    text: 'Month'
                  }
                },
                yaxis: {
                  title: {
                    text: 'Temperature'
                  },
                },
                legend: {
                  position: 'top',
                  horizontalAlign: 'right',
                  floating: true,
                  offsetY: -25,
                  offsetX: -5
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    colors: undefined,
                    width: 2,
                    dashArray: 0,
                },
                };
                var chart = new ApexCharts(
                    document.querySelector("#line-chart-1"),
                    options
                );
                chart.render();
            });
        }, 700);
    }
});
