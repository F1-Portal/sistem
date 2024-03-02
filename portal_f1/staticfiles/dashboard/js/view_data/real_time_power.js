$(document).ready(function(){
    var endpoint = '/real/time/power/api/'
    var defaultData = []

    var tipo = 'line'
    var formato = "DD"
    var unidade = 'day'
    var displayFormats = 'DD'

    var ctx = document.getElementById('real_time_power');
    var myChart = new Chart(ctx, {
        width: 200,
        responsive: true,
        drawTicks: false,
            data: {
                labels: [], //eixo x
                datasets: [{
                    label: 'Potência',
                    type: tipo,
                    data: [],
                    borderWidth: 2,
                    pointStyle: 'rectRot',
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    borderColor: '#ca3201',
                    backgroundColor: '#ca3201'
                }]
            },
            options: {
                aspectRatio: 2,
                interaction: {
                    intersect: false,
                },
                plugins: {
                    tooltip: {
                        callbacks:{
                            title: function(context) {
                              const d = Date.parse(context[0].raw.x);
                              const date = new Date(d);

                              day  = date.getUTCDate().toString().padStart(2, '0'),
                              month  = (date.getUTCMonth()+1).toString().padStart(2, '0'),
                              hour = (date.getHours()).toString().padStart(2, '0'),
                              min = (date.getMinutes()).toString().padStart(2, '0');

                              return 'Energia Gerada - '+day+'/'+month+' - '+hour+':'+min
                            },
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.raw.y.toFixed(3) + " MWh";
                                    label = label.replace(".", ",")
                                }

                              return label
                            },
                        }
                    },
                },
                responsive: true,
                scales: {
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return value+ ' kW';
                            }
                        }
                    },
                    x: {
                        display: true,
                        title: {
                          display: true
                        },

                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20,
                            callback: function(value, index, values) {
                                return value + ' h';
                            }
                        },
                       type: 'time',
                       time: {
                            unit: 'minute',
                            displayFormats: {
                                'minute': 'HH:mm'
                            }

                       }
                    }
                 }
            }
        });

    updateChart();
    setInterval(function(){ updateChart(); }, 300000);

    function updateChart() {
      $.ajax({
        method: "GET",
        url: endpoint,
        success: function(data){
            myChart.data.labels = data.labels;
            myChart.data.datasets[0].data = data.data;
            myChart.data.datasets[0].type = tipo;
            myChart.update();
        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
      })
    }

})
