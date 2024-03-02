'use strict';
$(document).ready(function() {
    var endpoint = '/nocs/visualizar_corrente/api/'
    var defaultData = []
    var labels2 = []

    $.ajax({
        method: "GET",
        url: endpoint,

        success: function(data){
            labels2 = data.labels
            defaultData = data.tensoes
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
                    name: "Tensão",
                    data: defaultData
                  }
                ],

                chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: labels2,
          forceNiceScale: true

            },
        yaxis:{
            labels: {
                formatter: function (value) {
                  return Math.round(value * 10) / 10
                },
                ticks: {
                            autoSkip: true,
                            maxTicksLimit: 2
                            }
              },
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart-tensao"), options);
        chart.render();
            });
        }, 700);
    }
});
