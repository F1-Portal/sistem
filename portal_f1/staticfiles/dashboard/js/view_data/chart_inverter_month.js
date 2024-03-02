$(document).ready(function(){
    const endpoint = 'api/month/energy'
    const defaultData = []
    const cores = ['#fe9900']
    const units = [' MWh']
    const chart = ['bar']
    const ctx = document.getElementById('chart_inverter');

    let chartLine = new Chart(ctx, {
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
                              year  = date.getUTCFullYear();

                              return 'Previsão de Geração - '+day+'/'+month+'/'+year
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
                                return value.toFixed(1) + units[0];
                            }
                        },
                    },
                    x: {
                            display: true,
                            offset: true,
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
                            unit: 'day',
                            displayFormats: {
                                'day': 'DD/MM/YY',
                            }
                       }
                    }
                }
            }
        });

    updateChart();
    setInterval(() => updateChart(), 300000);

    $( "#atualizar_chart_data" ).click(function() {
        updateChart();
    })

    function updateChart() {

      $.ajax({
        method: "GET",
        url: endpoint+'?month='+$("#month").val()+'&year='+$("#year").val(),
        success: function(data){

            // Limpa os valores anteriores - É importante manter
            chartLine.data.datasets = []

            chartLine.data.datasets.push({
                label: 'Geração',
                type: chart[0],
                borderWidth: 2,
                pointStyle: 'rectRot',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                borderColor: cores[0],
                backgroundColor: cores[0],
                data: data.data.map((d) => d),
            });

            chartLine.update();
        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
      })
    }
})
