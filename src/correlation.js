function scatterPlot() {
    // reformat data
    const Attributes = ["MPG", "Cylinders", "Displacement", "Horsepower", "Weight", "Acceleration"];
    const desc = [
        "Miles per gallon (M/gal)",
        "Cylinders (n)",
        "Displacement (cc)",
        "Horsepower (hp)",
        "Weight (kg)",
        "Acceleration (m/s)"
    ];
    const [MPG, Cylinders, Displacement, Horsepower, Weight, Acceleration] = Attributes;

    const mat = data.map((record) => {
        let reduced = {};
        for (let attr of Attributes) {
            reduced[attr] = parseFloat(record[attr]);
        }
        return reduced;
    });
    
    // create table
    const tbody = document.getElementById('correlationMatrix');

    for (let i = 0; i < Attributes.length; i++) {
        let tr = document.createElement('tr');
        let tds = document.createDocumentFragment();

        for (let j = 0; j < Attributes.length; j++) {
            if (i === j) {
                let label = document.createElement('td');
                label.className = 'label';
                label.innerHTML = Attributes[i];
                tds.appendChild(label);
            }
            else {
                let td = document.createElement('td');
                let tdDiv = document.createElement('div');
                tdDiv.id = `cor-${i}-${j}`;
                tdDiv.className = 'chart';
                td.appendChild(tdDiv);
                tds.appendChild(td);
            }
        }
        tr.appendChild(tds);
        tbody.appendChild(tr);
    }

    // draw scatter plots
    for (let i = 0; i < Attributes.length; i++) {
        for (let j = 0; j < Attributes.length; j++) {
            if (i !== j) {
                subplot(i, j);
            }
        }
    }

    // set up big plot on click
    let currentBigPlot = [-1, -1];
    tbody.addEventListener('click', (evt) => {
        let p = evt['path'];
        for (let el of p) {
            if (el.id) {
                let match = el.id.match(/cor-(.)-(.)/);
                if (match &&
                    (currentBigPlot[0] !== match[1] ||
                     currentBigPlot[1] !== match[2])) {
                    currentBigPlot[0] = match[1];
                    currentBigPlot[1] = match[2];
                    bigPlot(parseInt(match[1]), parseInt(match[2]));
                }
            }
        }
    });

    function subplot(i, j) {
        Highcharts.chart(`cor-${i}-${j}`, {
            credits: {
                enabled: false
            },
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            tooltip: {
                enabled: false
            },
            xAxis: {
                visible: false,
                title: {
                    enabled: true,
                    text: desc[j]
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                visible: false,
                title: {
                    text: desc[i]
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 1.4,
                        states: {
                            hover: {
                                enabled: false,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                }
            },
            series: [{
                showInLegend: false,
                color: 'rgba(223, 83, 83, .5)',
                data: data.map((record) => [
                    parseFloat(record[Attributes[j]]),
                    parseFloat(record[Attributes[i]])
                ])
            }]
        });
    }

    function bigPlot(i, j) {
        Highcharts.chart('bigCorrelation', {
            credits: {
                enabled: false
            },
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: `${Attributes[j]} versus ${Attributes[i]}`
            },
            subtitle: {
                text: ''
            },
            tooltip: {
                enabled: true
            },
            xAxis: {
                visible: true,
                title: {
                    enabled: true,
                    text: desc[j]
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                visible: true,
                title: {
                    text: desc[i]
                }
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 3,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x}, {point.y}'
                    }
                }
            },
            series: [{
                name: 'US',
                color: 'rgba(144, 237, 125, .8)',
                data: data.filter((record) => record['Origin'] === 'US').map((record) => [
                    parseFloat(record[Attributes[j]]),
                    parseFloat(record[Attributes[i]])
                ])
            }, {
                name: 'Europe',
                color: 'rgba(119, 152, 191, .8)',
                data: data.filter((record) => record['Origin'] === 'Europe').map((record) => [
                    parseFloat(record[Attributes[j]]),
                    parseFloat(record[Attributes[i]])
                ])
            }, {
                name: 'Japan',
                color: 'rgba(247, 163, 92, .8)',
                data: data.filter((record) => record['Origin'] === 'Japan').map((record) => [
                    parseFloat(record[Attributes[j]]),
                    parseFloat(record[Attributes[i]])
                ])
            }]
        });
    }
}
