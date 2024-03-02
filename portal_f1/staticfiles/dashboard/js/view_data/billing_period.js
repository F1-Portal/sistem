$(document).ready(function(){
    var endpoint = '/billing/period/api/'
    var defaultData = []

    var tipo = 'bar'
    var formato = "DD"
    var unidade = 'day'
    var displayFormats = 'DD'

    var ctx = document.getElementById('billing_period');
    var myChart = new Chart(ctx, {
//        width: 200,
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
                    borderColor: '#fe9900',
                    backgroundColor: '#fe9900'
                }]
            },
            options: {
                aspectRatio: 2,
                interaction: {
                    //intersect: false,
                    mode: 'x',
                },
                plugins: {
                    tooltip: {
                        callbacks:{
                            title: function(context) {
                              const d = Date.parse(context[0].raw.x);
                              const date = new Date(d);

                              day  = date.getUTCDate().toString().padStart(2, '0'),
                              month  = (date.getUTCMonth()+1).toString().padStart(2, '0');

                              return 'Energia Gerada - '+day+'/'+month
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
                            callback: function(value, index, values) {
                                return value+ ' MWh';
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
                            maxTicksLimit: 31,
                            callback: function(value, index, values) {
                                return value;
                            }
                        },
                       type: 'time',
                       time: {
                            unit: 'day',
                            displayFormats: {
                                'day': 'DD/MM'
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
