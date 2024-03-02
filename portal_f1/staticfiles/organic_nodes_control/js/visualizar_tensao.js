$(document).ready(function(){
    var endpoint = '/nocs/visualizar_tensao/api/'
    var defaultData = []
    var labels = []


    var tipo = 'line'
    var formato = "DD"
    var unidade = 'day'
    var displayFormats = 'DD'



    var ctx = document.getElementById('tensao');
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
                                if ($("#agrupamentos").val() == 'dia'){
                                    return value;
                                }else{
                                    return value + ' h';
                                }
                            }
                        },
                        type: 'time',
                        time: {
//                            unit: 'minute',
//                            format: "DD",
////                            unit: 'day',
                            displayFormats: {
                                'day': 'DD/MM',
                                'minute': 'HH:mm'
                            }
                        }
                    }
                 }
            }
        });

    updateChart();

    $( "#atualizar_tensao" ).click(function() {
        updateChart();
    })

    function updateChart() {
        if ($("#agrupamentos").val() == 'dia'){
            tipo = 'bar';
            unidade = 'day';
            formato= "DD";
        }
        else{
            tipo = 'line';
            unidade = 'minute';
        }

      $.ajax({
        method: "GET",
        url: endpoint+'?data_inicio='+$("#data_inicio_valor_tensao").val()+'&data_final='+$("#data_final_valor_tensao").val()+'&tipo='+$("#agrupamentos").val(),
        success: function(data){
            myChart.data.labels = data.labels;
            myChart.data.datasets[0].data = data.tensoes;
            myChart.data.datasets[0].type = tipo;
            myChart.options.scales.x.time.unit = unidade;
            myChart.options.scales.x.time.format = formato;
            myChart.update();
        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
      })
    }

//    $.ajax({
//        method: "GET",
//        url: endpoint+'?data_inicio='+$("#data_inicio_valor_tensao").val()+'&data_final='+$("#data_final_valor_tensao").val()+'&tipo='+$("#agrupamentos").val(),
//        success: function(data){
//            myChart.data.labels = data.labels;
//            myChart.data.datasets[0].data = data.tensoes;
//            myChart.update();
//        },
//        error: function(error_data){
//            console.log("error2")
//            console.log(error_data)
//        }
//    })

})
