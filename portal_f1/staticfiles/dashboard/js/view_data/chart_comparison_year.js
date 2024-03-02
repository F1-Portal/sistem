$(document).ready(function(){

    setInterval(function(){ updateYearChart(); }, 352100);
    $( "#up_comparison_year" ).click(function() {
        document.getElementById('up_comparison_month').classList.remove('btn-selected');
        document.getElementById('up_comparison_year').classList.add('btn-selected');
        document.getElementById("filter").style.display = "flex";
        updateYearChart();
    })

})

var endpoint_year = '/api/chart/year/comparison'
var list_data = []
var defaultData = []
var labels = []
var cores = ['#fe9900', '#ca3201', '#fad403', '#006599', '#003466']
var units = [' MWh']
var chart = ['bar']

var ctx = document.getElementById('chart_comparison_year');

var chartLineYear = new Chart(ctx, {
    responsive: false,
    drawTicks: false,
    data: {
        labels: [], //eixo x
        datasets: []
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
                        res = 'Energia';
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
                min: 0,
                beginAtZero: false,
                display: true,
                title: {
                  display: true
                },
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
                        return value;
                    }
                },

            }
        }
    }
});

function updateYearChart() {

        $.ajax({
            method: "GET",
            url: endpoint_year,
            success: function(data){

                chartLineYear.data.datasets = []

                data.data_year.forEach((data, index) => {
                    chartLineYear.data.datasets.push({
                        label: data.x,
                        type: 'bar',
                        borderWidth: 2,
                        pointStyle: 'rectRot',
                        fill: false,
                        type: 'bar',
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4,
                        borderColor: cores[index],
                        backgroundColor: cores[index],
                        data: data,
                    });
                })

                chartLineYear.update();
            },
            
            error: function(error_data){
                console.log("error2")
                console.log(error_data)
            }
        })
    }
