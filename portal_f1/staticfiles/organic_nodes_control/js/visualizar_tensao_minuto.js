$(document).ready(function(){
    var endpoint = '/nocs/visualizar_tensao/api/'
    var defaultData = []
    var labels = []

    var ctx = document.getElementById('tensao_minuto');
    var myChart = new Chart(ctx, {
        responsive: true,
        drawTicks: false,
            data: {
                labels: [],
                datasets: [{
                    label: 'Tensão',
                    type: 'line',
                    data: [],
                    borderWidth: 2,
                    pointStyle: 'rectRot',
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    borderColor: '#FF5733',
                    backgroundColor: '#FF5733'
                }]
            },
            options: {
                aspectRatio: 3,
                interaction: {
                    intersect: false,
                },
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                          display: true
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20,
                            callback: function(value, index, values) {
                                return 'Dia ' + value;
                            }
                        },
                        type: 'time',
                        time: {
                            format: "DD HH:mm",
                            unit: 'day',
                            displayFormats: {
                                'day': 'DD  HH:mm',
                            }
                        }
                    }
                 }
            }
        });


     $( "#atualizar_tensao_minuto" ).click(function() {
      $.ajax({
        method: "GET",
        url: endpoint+'?data_inicio='+$("#data_inicio_valor_tensao_minuto").val()+'&data_final='+$("#data_final_valor_tensao_minuto").val()+'&tipo=minuto',
        success: function(data){
            myChart.data.labels = data.labels;
            myChart.data.datasets[0].data = data.tensoes;
            myChart.update();
        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
      })
    })

    $.ajax({
        method: "GET",
        url: endpoint+'?data_inicio='+$("#data_inicio_valor_tensao_minuto").val()+'&data_final='+$("#data_final_valor_tensao_minuto").val()+'&tipo=minuto',
        success: function(data){
            myChart.data.labels = data.labels;
            myChart.data.datasets[0].data = data.tensoes;
            myChart.update();
        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
    })

})