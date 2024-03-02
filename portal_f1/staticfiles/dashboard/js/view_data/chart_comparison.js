$(document).ready(function(){

    updateChart();
    setInterval(function(){ updateChart(); }, 300000);

    $( "#update_chart_comparison" ).click(function() {
        updateChart();
    })

    $( "#up_comparison_month" ).click(function() {
        document.getElementById('up_comparison_month').classList.add('btn-selected');
        document.getElementById('up_comparison_year').classList.remove('btn-selected');
        document.getElementById("filter").style.display = "flex";
    })
})

var endpoint = '/api/chart/comparison'
var defaultData = []
var cores = ['#fe9900', '#ca3201', '#fad403', '#006599', '#003466']
var types_chart = ['bar','line']
var units = [' MWh']
var ctx = document.getElementById('chart_comparison');
var chartLine = new Chart(ctx, {
    responsive: false,
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
                      res = 'Energia - '+months[month]+'/'+context[0].raw.z;

                      return res;
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
                offset : true,
                title: {
                  display: true
                },

                ticks: {
                    callback: function(value, index, values) {
                        return value.substring(0,3);
                    }
                },
               type: 'time',
               time: {
                    unit: 'month',
               }
            }
         }
    }
});

function updateChart() {
    let type_chart = $("#type").val()
    $.ajax({
        method: "GET",
        url: endpoint,
        success: function(data){

            chartLine.data.datasets = []

            data.names.forEach((name, index) => {
                chartLine.data.datasets.push({
                    label: name,
                    type: types_chart[type_chart],
                    borderWidth: 2,
                    pointStyle: 'rectRot',
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    borderColor: cores[index],
                    backgroundColor: cores[index],
                    data: data.data[index],
                })
            })

            chartLine.update();
        },
        error: function(error_data){
            console.log("error2")
            console.log(error_data)
        }
    })
}



