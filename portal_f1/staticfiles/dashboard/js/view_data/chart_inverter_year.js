$(document).ready(function(){
    var endpoint = 'api/year/energy'
    var defaultData = []
    var cores = ['#fe9900']
    var units = [' MWh']
    var chart = ['bar']
    var ctx = document.getElementById('chart_energy_year');

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
                plugins: {
                    tooltip: {
                        callbacks:{
                            title: function(context) {
                              var months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
                              const d = Date.parse(context[0].raw.x);
                              const date = new Date(d);
                              month  = (date.getUTCMonth()),
                              year  = date.getUTCFullYear();

                              return `Potência - ${months[month]}/${year}`
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
                responsive: true, //ajusta o gráfico
                scales: {
                    y:{
                        ticks: {
                            autoSkip: true,
                            callback: function(value, index, values) {
                                return value.toFixed(0) ;//+ units[0];
                            }
                        },

                    },
                    x: {
                        display: true,
                        offset : true,
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
                            unit: 'month',
                            displayFormats: {
                                'month': 'MM/YYYY',
                            }

                       }
                    }
                 }
            }
        });

    updateChart();
    setInterval(function(){ updateChart(); }, 300000);

    $( "#update_chart_year" ).click(function() {
        updateChart();
    })

    function updateChart() {

      $.ajax({
        method: "GET",
        url: endpoint+'?year='+$("#year_energy").val(),
        success: function(data){
            chartLine.data.datasets = []

            chartLine.data.datasets.push({
                label: 'Potência',
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
