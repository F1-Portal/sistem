$(document).ready(function(){
    var endpoint = '/wifi/dashboard/api/'
    var defaultData = []
    var labels = []
    var cores = ['#00BFFF', '#4682B4', '#778899', '#191970', '#0000CD']
    var units = [' %', ' ºC', ' %']
    var axistitle = ['Taxa de Humidade', 'Temperatura em °C', 'Porcentagem de Bateria']


    var tipo = 'line'
    var formato = "DD"
    var unidade = 'day'
    var displayFormats = 'DD'

    var ctx = document.getElementById('device_data');
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
                    intersect: false,
                },
                responsive: false,
                scales: {
                    y:{
                        title: {
                            display: true,
                            text: function(value, index, values) {
                                return axistitle[$("#medidas").val()];
                            }
                        },

                        ticks: {
                            autoSkip: true,
                            callback: function(value, index, values) {
                                return value + units[$("#medidas").val()];
                            }
                        },

                    },
                    x: {
                        display: true,
                        title: {
                          text: "Dia e Horário",     
                          display: true
                        },

                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20,
                            callback: function(value, index, values) {
                                return value;
                            }
                        },
                       type: 'time',
                       time: {
                            unit: 'minute',
                            displayFormats: {
                                'minute': 'DD/MM HH:mm',
                            }

                       }
                    }
                 }
            }
        });

    updateChart();

    $( "#atualizar_device_data" ).click(function() {
        updateChart();
    })

    function updateChart() {
    var labels_used = [];
      $.ajax({

        method: "GET",
        url: endpoint+'?data_inicio='+$("#data_inicio_device_data").val()+'&data_final='+$("#data_final_device_data").val()+'&tipo='+$("#medidas").val()+'&device='+$("#device").val(),
        success: function(data){
            chartLine.data.datasets.forEach((dataset) => {
                labels_used.push(dataset.label);
            });

            for (var i = 0; i < labels_used.length; ++i) {
                chartLine.data.datasets.pop();
            }
            chartLine.update()


            for (var i = 0; i < data.devices_names.length; ++i) {
                var newDataset = {
                    label: data.devices_names[i],
                    type: 'line',
                    borderWidth: 2,
                    pointStyle: 'rectRot',
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    borderColor: cores[i],
                    backgroundColor: cores[i],
                    data: data.data[i],
                }
                chartLine.data.datasets.push(newDataset);
            }
            chartLine.update();
        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
      })
    }
})
