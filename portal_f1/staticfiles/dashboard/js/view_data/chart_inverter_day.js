$(document).ready(function(){
    var endpoint = 'api/inverter/data'
    var defaultData = []
    var cores = ['#fe9900', '#ca3201', '#fad403', '#006599', '#003466']
    var units = [' kW']
    var chart = ['line','bar']
    var offset = ['false', 'true']
    var ctx = document.getElementById('inverter_data');
    var chartLine = new Chart(ctx, {
        responsive: true,
        drawTicks: false,
            data: {
                labels: [], //eixo x
                datasets: [
                ]
            },
            options: {
                aspectRatio: 2,
                interaction: {
                    mode: 'x',
                },
                plugins: {
                    tooltip: {
                        callbacks:{
                            title: function(context) {
                              const d = Date.parse(context[0].raw.x);
                              const date = new Date(d);

                              day  = date.getUTCDate().toString().padStart(2, '0'),
                              month  = (date.getUTCMonth()+1).toString().padStart(2, '0'),
                              year  = date.getUTCFullYear(),
                              hour = (date.getHours()).toString().padStart(2, '0'),
                              min = (date.getMinutes()).toString().padStart(2, '0');

                              return 'Energia Gerada - '+day+'/'+month+'/'+year+' - '+hour+':'+min
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
                    y:{
                        ticks: {
                            autoSkip: true,
                            callback: function(value, index, values) {
                                return value + units[0];
                            }
                        },

                    },
                    x: {
                        display: true,
                        offset: false,
                        title: {
                          display: true
                        },

                        ticks: {
                            autoSkip: true,
                            callback: function(value, index, values) {
                                return value;
                            }
                        },
                        type: 'time',
                        time: {
                            unit: 'minute',
                            stepSize: 15,
                            displayFormats: {
                                'minute': 'DD/MM/YY HH:mm',
                            }

                        }
                    }
                 }
            }
        });

    updateChart();
    setInterval(function(){ updateChart(); }, 300000);

    $( "#atualizar_inverter_data" ).click(function() {
        updateChart();
    })

    function updateChart() {
    let type_chart = $("#type_chart").val()

      $.ajax({

        method: "GET",
        url: endpoint+'?date='+$("#date_reference").val()+'&start-time='+$("#start_time").val()+'&end-time='+$("#end_time").val(),
        success: function(data){
        
            chartLine.data.datasets = []

            chartLine.data.datasets.push({
                label: 'Potência',
                type: chart[type_chart],
                borderWidth: 2,
                pointStyle: 'rectRot',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                borderColor: cores[0],
                backgroundColor: cores[0],
                data: data.data.map(p => p),
            })

            chartLine.update();
        },

        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
      })
    }
    $("#export_chart").click(function(){
        var link = document.createElement('a');
        link.href = chartLine.toBase64Image();
        link.download = 'gráfico.png';
        link.click();
    });
})

