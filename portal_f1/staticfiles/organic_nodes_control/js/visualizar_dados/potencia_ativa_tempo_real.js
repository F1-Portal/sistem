$(document).ready(function(){

    var endpoint_line = '/corrente_tempo_real/api/'
    var cores = ['#642BB6', '#EE7200', '#DD2D6B', '#A31CA6',  '#EE7200']

    var ctxDonutPeriod = document.getElementById('donut_tempo_real');
    var chartDonut = new Chart(ctxDonutPeriod, {
        responsive: true,
        drawTicks: false,
        type: 'pie',
        fontSize: 9,
        plugins: [ChartDataLabels],
            data: {
                labels: [],
                datasets: []
            },
            options: {
                plugins: {
                    aspectRatio: 1,
                    interaction: {
                        intersect: false,
                    },
                    responsive: true,
                    datalabels: {
                        formatter: function(value) {
                            return 'R$ '+String(value).replace('.', ',');
                        },
                    },
                    title: {
                        display: true,
                        text: 'Gasto no período'
                    }

                }
            }
        });

    var ctxDonutMonth = document.getElementById('donut_tempo_real_mes');
    var chartDonutMonth = new Chart(ctxDonutMonth, {
        responsive: true,
        drawTicks: false,
        type: 'pie',
        plugins: [ChartDataLabels],
            data: {
                labels: [],
                datasets: []
            },
            options: {
                plugins: {
                    aspectRatio: 1,
                    interaction: {
                        intersect: false,
                    },
                    responsive: true,
                    datalabels: {
                        formatter: function(value) {
                            return 'R$ '+String(value).replace('.', ',');
                        }
                    },
                    title: {
                        display: true,
                        text: 'Gasto mensal previsto'
                    }

                }
            }
        });

    var ctxLine = document.getElementById('grafico_tempo_real');
    var chartLine = new Chart(ctxLine, {
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
                responsive: true,
                scales: {
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return value+ ' mW';
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
                            maxTicksLimit: 20,
                            callback: function(value, index, values) {
                                return value + 'h';
                            }
                        },
                       type: 'time',
                       time: {
                            unit: 'minute',
                            displayFormats: {
                                'minute': 'HH:mm'
                            }

                       }
                    }
                 }
            }
        });

    updateChart();
    setInterval(function(){ updateChart(); }, 5000);

    function updateChart() {
        var labels_used = [];
        var labels_new = [];
        var changed = 0;
        try {
            $.ajax({

                method: "GET",
                url: endpoint_line+'?int_tempo='+$("#int_tempo").val()+'&dispositivo_id='+$("#tipo_dispositivo").val(),
                success: function(data){
                    labels_new = data.devices_names
                    chartLine.data.datasets.forEach((dataset) => {
                       labels_used.push(dataset.label);
                    });

                    labels_new.sort();
                    labels_used.sort();

                    if (labels_new.length === labels_used.length){
                        for (var i = 0; i < labels_used.length; ++i) {
                            if (labels_new[i] !== labels_used[i]){
                                changed = 1;
                            }
                        }
                    }else{
                        changed = 1;
                    }

                    if (changed === 1){
                        for (var i = 0; i < labels_used.length; ++i) {
                            chartDonutMonth.data.datasets.pop();
                            chartDonutMonth.data.labels.pop();
                            chartDonut.data.datasets.pop();
                            chartDonut.data.labels.pop();
                            chartLine.data.datasets.pop();

                        }
                        chartDonutMonth.update()
                        chartDonut.update()
                        chartLine.update()

                        for (var i = 0; i < data.devices_names.length; ++i) {
                            var newDataset = {
                                label: data.devices_names[i],
                                type: 'line',
                                data: [],
                                borderWidth: 2,
                                pointStyle: 'rectRot',
                                fill: false,
                                cubicInterpolationMode: 'monotone',
                                tension: 0.4,
                                borderColor: cores[i],
                                backgroundColor: cores[i],
                                data: data.data_ac_power[i],
                            }
                            chartLine.data.datasets.push(newDataset);
                        }


                        var newDataSetDounut = {
                            data: data.total_devices,
                            datalabels: {
                                anchor: 'center',
                                color: 'white',
                                font: {
                                    size: 12
                                }
                            },
                            backgroundColor: cores,
                            hoverBackgroundColor: cores
                        }
                        chartDonut.data.datasets.push(newDataSetDounut);
                        chartDonut.data.labels = data.devices_names;

                        var newDataSetDounutMonth = {
                            data: data.total_devices_month,
                            datalabels: {
                                anchor: 'center',
                                color: 'white',
                                font: {
                                    size: 12
                                }
                            },
                            backgroundColor: cores,
                            hoverBackgroundColor: cores
                        }
                        chartDonutMonth.data.labels = data.devices_names;
                        chartDonutMonth.data.datasets.push(newDataSetDounutMonth);
                    }else{
                        for (var i = 0; i < data.devices_names.length; ++i) {
                            chartLine.data.datasets[i].data = data.data_ac_power[i];
                            chartDonutMonth.data.datasets[0].data =  data.total_devices_month;
                            chartDonut.data.datasets[0].data =  data.total_devices;
                        }
                    }
                    chartLine.update();
                    chartDonutMonth.update();
                    chartDonut.update();
                },
                error: function(error_data){
                    console.log(error_data)
                }

            })
        }catch (e) {
           updateChart();
        }
    }

})
