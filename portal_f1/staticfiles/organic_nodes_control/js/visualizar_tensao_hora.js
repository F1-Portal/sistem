$(document).ready(function(){


    var endpoint = '/nocs/visualizar_tensao/api/'
    var defaultData = []
    var labels = []

    var tipo = 'line'
    var formato = "DD"
    var unidade = 'day'
    var displayFormats = 'DD'

    var ctx = document.getElementById('tensao_hora');
    var myChart = new Chart(ctx, {
        responsive: true,
        drawTicks: false,
            data: {
                labels: [],
                datasets: [{
                    label: 'Tensão',
                    type: tipo,
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
                                return value;
                            }
                        },
                        type: 'time',
                        time: {
                            unit: 'minute',
//                            format: "DD HH",
//                            unit: 'hour',
//                            displayFormats: {
//                                'hour': 'DD HH:mm',
//                            }
                        }
                    }
                 }
            }
        });

    updateChart();

    function updateChart() {
        if ($("#agrupamentos").val() == 'dia'){
            tipo = 'bar';
        }
        else{
            tipo = 'line';
        }

     $( "#atualizar_tensao_hora" ).click(function() {
      $.ajax({
        method: "GET",
        url: endpoint+'?data_inicio='+$("#data_inicio_valor_tensao_hora").val()+'&data_final='+$("#data_final_valor_tensao_hora").val()+'&tipo=hora',
        success: function(data){
            myChart.data.labels = data.labels;
            myChart.data.datasets[0].data = data.tensoes;
            myChart.update();
            console.log(data.labels)
        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
      })
    })
    }

})