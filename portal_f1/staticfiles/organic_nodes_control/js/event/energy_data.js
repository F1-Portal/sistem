$(document).ready(function() {

    var chart_energy_consumption = document.getElementById('energy_consumption');
    var chart_energy_consumption_detail = document.getElementById('energy_consumption_detail');
    var chart_energy_consumption_per_setup = document.getElementById('energy_consumption_per_setup');
    var chart_energy_consumption_plug = document.getElementById('energy_consumption_plug');
    var chart_power_factor_1 = document.getElementById('power_factor_1');
    var chart_power_factor_2 = document.getElementById('power_factor_2');
    var chart_power_factor_3 = document.getElementById('power_factor_3');
    var chart_power_factor_4 = document.getElementById('power_factor_4');
    var chart_power_factor_5 = document.getElementById('power_factor_5');
    var chart_power_factor_6 = document.getElementById('power_factor_6');

    var chart_energy_consumption_line = new Chart(chart_energy_consumption, {
        responsive: true,
        drawTicks: false,
        maintainAspectRatio: false,
        data: {
            labels: [], //eixo x
            datasets: []
        },
        options: {
            aspectRatio: 3,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
            },
            plugins: {
                tooltip: {
                    callbacks:{
                        title: function(context) {
                          const d = Date.parse(context[0].raw.x);
                          const date = new Date(d);

                          day  = date.getUTCDate().toString().padStart(2, '0'),
                          month  = (date.getUTCMonth()+1).toString().padStart(2, '0'),
                          hour = (date.getHours()).toString().padStart(2, '0'),
                          min = (date.getMinutes()).toString().padStart(2, '0');

                          return 'Date - '+day+'/'+month+' - '+hour+':'+min
                        },
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.raw.y.toFixed(3) + ' kWh';
                                label = label.replace(".", ",")
                            }

                          return label
                        },
                    }
                },
            },
            responsive: true,
            scales: {
                y: {
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Energy Consumption'
                    },
                    ticks: {
                        precision: 0,
                        callback: function(value, index, values) {
                            return value+ ' kWh';
                        }
                    }
                },
                x: {
                    display: true,
                    title: {
                      display: true,

                    },

                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20,
                        callback: function(value, index, values) {
                            return value + ' h';
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

    var chart_energy_consumption_plug_line = new Chart(chart_energy_consumption_plug, {
        responsive: true,
        drawTicks: false,
        maintainAspectRatio: false,
        data: {
            labels: [], //eixo x
            datasets: []
        },
        options: {
            aspectRatio: 3,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
            },
            plugins: {
                tooltip: {
                    callbacks:{
                        title: function(context) {
                          const d = Date.parse(context[0].raw.x);
                          const date = new Date(d);

                          day  = date.getUTCDate().toString().padStart(2, '0'),
                          month  = (date.getUTCMonth()+1).toString().padStart(2, '0'),
                          hour = (date.getHours()).toString().padStart(2, '0'),
                          min = (date.getMinutes()).toString().padStart(2, '0');

                          return 'Date - '+day+'/'+month+' - '+hour+':'+min
                        },
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.raw.y.toFixed(3) + ' kWh';
                                label = label.replace(".", ",")
                            }

                          return label
                        },
                    }
                },
            },
            responsive: true,
            scales: {
                y: {
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Energy Consumption'
                    },
                    ticks: {
                        precision: 0,
                        callback: function(value, index, values) {
                            return value+ ' kWh';
                        }
                    }
                },
                x: {
                    display: true,
                    title: {
                      display: true,

                    },

                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20,
                        callback: function(value, index, values) {
                            return value + ' h';
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

     var chart_energy_consumption_detail_line = new Chart(chart_energy_consumption_detail, {
        responsive: true,
        drawTicks: false,
        maintainAspectRatio: false,
        data: {
            labels: [], //eixo x
            datasets: []
        },
        options: {
            aspectRatio: 3,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
            },
            plugins: {
                tooltip: {
                    callbacks:{
                        title: function(context) {
                          const d = Date.parse(context[0].raw.x);
                          const date = new Date(d);

                          day  = date.getUTCDate().toString().padStart(2, '0'),
                          month  = (date.getUTCMonth()+1).toString().padStart(2, '0'),
                          hour = (date.getHours()).toString().padStart(2, '0'),
                          min = (date.getMinutes()).toString().padStart(2, '0');

                          return 'Date - '+day+'/'+month+' - '+hour+':'+min
                        },
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.raw.y.toFixed(3) + ' kWh';
                                label = label.replace(".", ",")
                            }

                          return label
                        },
                    }
                },
            },
            responsive: true,
            scales: {
                y: {
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Energy Consumption'
                    },
                    ticks: {
                        precision: 0,
                        callback: function(value, index, values) {
                            return value+ ' kWh';
                        }
                    }
                },
                x: {
                    display: true,
                    title: {
                      display: true,

                    },

                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20,
                        callback: function(value, index, values) {
                            return value + ' h';
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

    var chart_energy_consumption_per_setup_pie = new Chart(chart_energy_consumption_per_setup, {
        type: 'pie',
        responsive: true,
        maintainAspectRatio: false,
        data: {
            labels: [
              ],
          datasets: [
          ]
        },
        plugins: [ChartDataLabels],
        options: {
            aspectRatio: 1.5,
                plugins: {

                    interaction: {
                        intersect: false,
                    },
                    responsive: false,
                    datalabels: {
                        formatter: function(value) {
                             return String(value)+'%';
                        },
                        color: 'white',
                        font: {
                          weight: 'bold',
                          size: 16,
                        }
                    },
                    title: {
                        display: true,
                    }

                }

        }
    });

    const data_1 = {
        labels: [], //eixo x
        datasets: [
            {
                backgroundColor: ['#FF5370', '#ff7400', 'green'],
                //fator de potencia
                power_factor: 0,
                data: [84, 8, 8],
                //arredondar bordas
                borderRadius: [{ outerStart: 10, innerStart: 10 }, 0, { outerEnd: 10, innerEnd: 10 }],
                //fazer grafico ficar em meia circulo
                cutout: '80%',
                circumference: 180,
                rotation: -90,
            }
        ]
    };

    const data_2 = {
        datasets: [
            {
                backgroundColor: ['#FF5370', '#ff7400', 'green'],
                //fator de potencia
                power_factor: 0,
                data: [84, 8, 8],
                //arredondar bordas
                borderRadius: [{ outerStart: 10, innerStart: 10 }, 0, { outerEnd: 10, innerEnd: 10 }],
                //fazer grafico ficar em meia circulo
                cutout: '80%',
                circumference: 180,
                rotation: -90,
            }
        ]
    };

    const data_3 = {
        datasets: [
            {
                backgroundColor: ['#FF5370', '#ff7400', 'green'],
                //fator de potencia
                power_factor: 0,
                data: [84, 8, 8],
                //arredondar bordas
                borderRadius: [{ outerStart: 10, innerStart: 10 }, 0, { outerEnd: 10, innerEnd: 10 }],
                //fazer grafico ficar em meia circulo
                cutout: '80%',
                circumference: 180,
                rotation: -90,
            }
        ]
    };

    const data_4 = {
        datasets: [
            {
                backgroundColor: ['#FF5370', '#ff7400', 'green'],
                //fator de potencia
                power_factor: 0,
                data: [84, 8, 8],
                //arredondar bordas
                borderRadius: [{ outerStart: 10, innerStart: 10 }, 0, { outerEnd: 10, innerEnd: 10 }],
                //fazer grafico ficar em meia circulo
                cutout: '80%',
                circumference: 180,
                rotation: -90,
            }
        ]
    };

    const data_5 = {
        datasets: [
            {
                backgroundColor: ['#FF5370', '#ff7400', 'green'],
                //fator de potencia
                power_factor: 0,
                data: [84, 8, 8],
                //arredondar bordas
                borderRadius: [{ outerStart: 10, innerStart: 10 }, 0, { outerEnd: 10, innerEnd: 10 }],
                //fazer grafico ficar em meia circulo
                cutout: '80%',
                circumference: 180,
                rotation: -90,
            }
        ]
    };

    const data_6 = {
        datasets: [
            {
                backgroundColor: ['#FF5370', '#ff7400', 'green'],
                //fator de potencia
                power_factor: 0,
                data: [84, 8, 8],
                //arredondar bordas
                borderRadius: [{ outerStart: 10, innerStart: 10 }, 0, { outerEnd: 10, innerEnd: 10 }],
                //fazer grafico ficar em meia circulo
                cutout: '80%',
                circumference: 180,
                rotation: -90,
            }
        ]
    };

    const Needle_1 = {
        id: 'needle',
        afterDraw: (chart, args, options) => {
            const { ctx, config, data, chartArea: { top, bottom, left, right, width, height } } = chart;

            ctx.save();

            const needleValue = data.datasets[0].power_factor;
            const angle = needleValue * Math.PI + Math.PI;

            const cx = width / 2;
            const cy = chart._metasets[0].data[0].y;

            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -11);
            ctx.lineTo(height / 2, 0);
            ctx.lineTo(0, 11);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, 10);
            ctx.fill();
            ctx.restore();

            if(needleValue < 0.84){
                ctx.fillStyle = 'red';
            }else if(needleValue < 0.92){
                ctx.fillStyle = '#ff7400';
            }else{
                ctx.fillStyle = 'green';
            }

            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('QDC 2: ' + needleValue.toFixed(2), cx, cy - height / 3.5);
            ctx.restore();
        }
    }

    const Needle_2 = {
        id: 'needle',
        afterDraw: (chart, args, options) => {
            const { ctx, config, data, chartArea: { top, bottom, left, right, width, height } } = chart;

            ctx.save();

            const needleValue = data.datasets[0].power_factor;
            const angle = needleValue * Math.PI + Math.PI;

            const cx = width / 2;
            const cy = chart._metasets[0].data[0].y;

            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -11);
            ctx.lineTo(height / 2, 0);
            ctx.lineTo(0, 11);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.restore();

            if(needleValue < 0.84){
                ctx.fillStyle = 'red';
            }else if(needleValue < 0.92){
                ctx.fillStyle = '#ff7400';
            }else{
                ctx.fillStyle = 'green';
            }

            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, 10);
            ctx.fill();
            ctx.restore();

            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('QDC 4: ' + needleValue.toFixed(2), cx, cy - height / 3.5);
            ctx.restore();
        }
    }

    const Needle_3 = {
        id: 'needle',
        afterDraw: (chart, args, options) => {
            const { ctx, config, data, chartArea: { top, bottom, left, right, width, height } } = chart;

            ctx.save();

            const needleValue = data.datasets[0].power_factor;
            const angle = needleValue * Math.PI + Math.PI;

            const cx = width / 2;
            const cy = chart._metasets[0].data[0].y;

            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -11);
            ctx.lineTo(height / 2, 0);
            ctx.lineTo(0, 11);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, 10);
            ctx.fill();
            ctx.restore();

            if(needleValue < 0.84){
                ctx.fillStyle = 'red';
            }else if(needleValue < 0.92){
                ctx.fillStyle = '#ff7400';
            }else{
                ctx.fillStyle = 'green';
            }

            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('QDC 5: ' + needleValue.toFixed(2), cx, cy - height / 3.5);
            ctx.restore();
        }
    }

    const Needle_4 = {
        id: 'needle',
        afterDraw: (chart, args, options) => {
            const { ctx, config, data, chartArea: { top, bottom, left, right, width, height } } = chart;

            ctx.save();

            const needleValue = data.datasets[0].power_factor;
            const angle = needleValue * Math.PI + Math.PI;

            const cx = width / 2;
            const cy = chart._metasets[0].data[0].y;

            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -11);
            ctx.lineTo(height / 2, 0);
            ctx.lineTo(0, 11);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, 10);
            ctx.fill();
            ctx.restore();

            if(needleValue < 0.84){
                ctx.fillStyle = 'red';
            }else if(needleValue < 0.92){
                ctx.fillStyle = '#ff7400';
            }else{
                ctx.fillStyle = 'green';
            }

            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('QDC 6: ' + needleValue.toFixed(2), cx, cy - height / 3.5);
            ctx.restore();
        }
    }

    const Needle_5 = {
        id: 'needle',
        afterDraw: (chart, args, options) => {
            const { ctx, config, data, chartArea: { top, bottom, left, right, width, height } } = chart;

            ctx.save();

            const needleValue = data.datasets[0].power_factor;
            const angle = needleValue * Math.PI + Math.PI;

            const cx = width / 2;
            const cy = chart._metasets[0].data[0].y;

            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -11);
            ctx.lineTo(height / 2, 0);
            ctx.lineTo(0, 11);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, 10);
            ctx.fill();
            ctx.restore();


            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#000';

            if(needleValue < 0.84){
                ctx.fillStyle = 'red';
            }else if(needleValue < 0.92){
                ctx.fillStyle = '#ff7400';
            }else{
                ctx.fillStyle = 'green';
            }

            ctx.fillText('QDC 9: ' + needleValue.toFixed(2), cx, cy - height / 3.5);
            ctx.restore();
        }
    }

    const Needle_6 = {
        id: 'needle',
        afterDraw: (chart, args, options) => {
            const { ctx, config, data, chartArea: { top, bottom, left, right, width, height } } = chart;

            ctx.save();

            const needleValue = data.datasets[0].power_factor;
            const angle = needleValue * Math.PI + Math.PI;

            const cx = width / 2;
            const cy = chart._metasets[0].data[0].y;

            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -11);
            ctx.lineTo(height / 2, 0);
            ctx.lineTo(0, 11);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, 10);
            ctx.fill();
            ctx.restore();


            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#000';

            if(needleValue < 0.84){
                ctx.fillStyle = 'red';
            }else if(needleValue < 0.92){
                ctx.fillStyle = '#ff7400';
            }else{
                ctx.fillStyle = 'green';
            }

            ctx.fillText('CPID: ' + needleValue.toFixed(2), cx, cy - height / 3.5);
            ctx.restore();
        }
    }

    var chart_power_factor_1_velo = new Chart(chart_power_factor_1, {
        type: 'doughnut',
        data: data_1,
        textAlign: 'center',
        plugins: [Needle_1],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    padding: 0,
                    margin: 0,
                    generateLabels: function (chart) {
                        original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
                        labelsOriginal = original.call(this, chart);
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            // console.log(context);
                            if (context.dataIndex == 0) {
                                return 'Ruim'
                            }
                            if (context.dataIndex == 1) {
                                return 'Alerta'
                            }
                            if (context.dataIndex == 2) {
                                return 'Bom'
                            }
                        }
                    }
                }
            }
        },
    });

     var chart_power_factor_2_velo = new Chart(chart_power_factor_2, {
        type: 'doughnut',
        data: data_2,
        textAlign: 'center',
        plugins: [Needle_2],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    generateLabels: function (chart) {
                        original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
                        labelsOriginal = original.call(this, chart);
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            // console.log(context);
                            if (context.dataIndex == 0) {
                                return 'Ruim'
                            }
                            if (context.dataIndex == 1) {
                                return 'Alerta'
                            }
                            if (context.dataIndex == 2) {
                                return 'Bom'
                            }
                        }
                    }
                }
            }
        },
    });

    var chart_power_factor_3_velo = new Chart(chart_power_factor_3, {
        type: 'doughnut',
        data: data_3,
        textAlign: 'center',
        plugins: [Needle_3],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    generateLabels: function (chart) {
                        original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
                        labelsOriginal = original.call(this, chart);
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            // console.log(context);
                            if (context.dataIndex == 0) {
                                return 'Ruim'
                            }
                            if (context.dataIndex == 1) {
                                return 'Alerta'
                            }
                            if (context.dataIndex == 2) {
                                return 'Bom'
                            }
                        }
                    }
                }
            }
        },
    });

    var chart_power_factor_4_velo = new Chart(chart_power_factor_4, {
        type: 'doughnut',
        data: data_4,
        textAlign: 'center',
        plugins: [Needle_4],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    generateLabels: function (chart) {
                        original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
                        labelsOriginal = original.call(this, chart);
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            // console.log(context);
                            if (context.dataIndex == 0) {
                                return 'Ruim'
                            }
                            if (context.dataIndex == 1) {
                                return 'Alerta'
                            }
                            if (context.dataIndex == 2) {
                                return 'Bom'
                            }
                        }
                    }
                }
            }
        },
    });

    var chart_power_factor_5_velo = new Chart(chart_power_factor_5, {
        type: 'doughnut',
        data: data_5,
        textAlign: 'center',
        plugins: [Needle_5],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    generateLabels: function (chart) {
                        original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
                        labelsOriginal = original.call(this, chart);
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            // console.log(context);
                            if (context.dataIndex == 0) {
                                return 'Ruim'
                            }
                            if (context.dataIndex == 1) {
                                return 'Alerta'
                            }
                            if (context.dataIndex == 2) {
                                return 'Bom'
                            }
                        }
                    }
                }
            }
        },
    });

    var chart_power_factor_6_velo = new Chart(chart_power_factor_6, {
        type: 'doughnut',
        data: data_6,
        textAlign: 'center',
        plugins: [Needle_6],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    generateLabels: function (chart) {
                        original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
                        labelsOriginal = original.call(this, chart);
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            // console.log(context);
                            if (context.dataIndex == 0) {
                                return 'Ruim'
                            }
                            if (context.dataIndex == 1) {
                                return 'Alerta'
                            }
                            if (context.dataIndex == 2) {
                                return 'Bom'
                            }
                        }
                    }
                }
            }
        },
    });

    function updateConsumptionHistory(data, labels_used, colors){
        chart_energy_consumption_line.data.datasets.forEach((dataset) => {
            labels_used.push(dataset.label);
        });


        for (var i = 0; i < labels_used.length; ++i) {
            chart_energy_consumption_line.data.datasets.pop();
            chart_energy_consumption_line.data.labels.pop();
        }

        for (var i = 0; i < data.labels.length; ++i) {
            var newDataset = {
                label: data.labels[i],
                type: 'line',
                borderWidth: 2,
                pointStyle: false,
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                borderColor: colors[i],
                backgroundColor: colors[i],
                data: data.energy_consumption[i],
                fill: true
            }
            chart_energy_consumption_line.data.datasets.push(newDataset);
        }
        chart_energy_consumption_line.update();
        //////////////////////////
    }

    function updateConsumptionHistoryPlug(data, labels_used, colors){
        chart_energy_consumption_plug_line.data.datasets.forEach((dataset) => {
            labels_used.push(dataset.label);
        });


        for (var i = 0; i < labels_used.length; ++i) {
            chart_energy_consumption_plug_line.data.datasets.pop();
            chart_energy_consumption_plug_line.data.labels.pop();
        }

        for (var i = 0; i < data.labels_plug.length; ++i) {
            var newDataset = {
                label: data.labels_plug[i],
                type: 'line',
                borderWidth: 2,
                pointStyle: false,
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                borderColor: '#278bc7',
                backgroundColor: '#278bc7',
                data: data.energy_consumption_plug[i],
                fill: true
            }
            chart_energy_consumption_plug_line.data.datasets.push(newDataset);
        }
        chart_energy_consumption_plug_line.update();
        //////////////////////////
    }

    function updateConsumptionHistoryDetail(data, labels_used, colors){
        chart_energy_consumption_detail_line.data.datasets.forEach((dataset) => {
            labels_used.push(dataset.label);
        });

        for (var i = 0; i < labels_used.length; ++i) {
            chart_energy_consumption_detail_line.data.datasets.pop();
            chart_energy_consumption_detail_line.data.labels.pop();
        }
        for (var i = 0; i < data.labels.length; ++i) {

            var newDataset = {
                label: data.labels[i],
                type: 'line',
                borderWidth: 2,
                pointStyle: false,
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                borderColor: colors[i],
                backgroundColor: colors[i],
                data: data.energy_consumption_detail[i],
            }
            chart_energy_consumption_detail_line.data.datasets.push(newDataset);
        }
        chart_energy_consumption_detail_line.update();
        //////////////////////////
    }

    function updateConsumptionHistoryDetailPerSetup(data, labels_used, colors){
        chart_energy_consumption_per_setup_pie.data.labels.forEach((dataset) => {
            labels_used.push(dataset.label);
        });

        for (var i = 0; i < labels_used.length; ++i) {
            chart_energy_consumption_per_setup_pie.data.datasets.pop();
            chart_energy_consumption_per_setup_pie.data.labels.pop();
        }
        console.log(data.data_per_setup[i])
        var newDataset = {
            data: data.data_per_setup,
            backgroundColor: colors
        }
        for (var i = 0; i < data.labels_per_setup.length; ++i) {
            chart_energy_consumption_per_setup_pie.data.labels.push(data.labels_per_setup[i]);
        }
        chart_energy_consumption_per_setup_pie.data.datasets.push(newDataset);
        chart_energy_consumption_per_setup_pie.update()

    }

    function updatePowerFactor(data){
        console.log( data.power_factor_values[0])
        chart_power_factor_1_velo.data.datasets[0].power_factor = data.power_factor_values[0];
        chart_power_factor_1_velo.update();

        chart_power_factor_2_velo.data.datasets[0].power_factor = data.power_factor_values[1];
        chart_power_factor_2_velo.update();

        chart_power_factor_3_velo.data.datasets[0].power_factor = data.power_factor_values[2];
        chart_power_factor_3_velo.update();

        chart_power_factor_4_velo.data.datasets[0].power_factor = data.power_factor_values[3];
        chart_power_factor_4_velo.update();

        chart_power_factor_5_velo.data.datasets[0].power_factor = data.power_factor_values[4];
        chart_power_factor_5_velo.update();

        chart_power_factor_6_velo.data.datasets[0].power_factor = data.power_factor_total;
        chart_power_factor_6_velo.update();

    }

    setInterval(function(){ updateCharts(); }, 30000);

    updateCharts();

    function updateCharts() {
        endpoint = '/data/energy/nocs/'
        var colors = ['#c62828', '#283593', '#6a1b9a', '#00695c', '#f9a825', '#278bc7', '#78bc7']
        var colors_cxp = [ '#278bc7', '#ff7400']
        var labels_used = [];
        $.ajax({
            method: "GET",
            url: endpoint,
            success: function(data){
                updateConsumptionHistory(data.consumption_history, labels_used, colors_cxp)
                updateConsumptionHistoryPlug(data.consumption_plug, labels_used, colors)
                updateConsumptionHistoryDetail(data.consumption_history_detail, labels_used, colors)
                updateConsumptionHistoryDetailPerSetup(data.consumption_per_setup, labels_used, colors)
                updatePowerFactor(data.power_factor)
            },
            error: function(error_data){
                console.log(error_data)
            }
        })
    }
});