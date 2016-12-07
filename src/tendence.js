/**
 * Created by shen on 06/12/16.
 */

const US = getData("US");
const Europe = getData("Europe");
const Japan = getData("Japan");


const USMPG = getAttrPerYear(US);
const JapanMPG = getAttrPerYear(Japan);
const EuropeMPG = getAttrPerYear(Europe);

let attrDesc = [
    ["MPGPerYear", "Yearly Average MPG", "Kilometers per liter (km/L)"],
    ["cylindersPerYear", "Yearly Average cylinders", "Engine number"],
    ["displacementPerYear", "Yearly Average displacement", "meters (m)"],
    ["horsepowerPerYear", "Yearly Average horsepower", "kilogram-metres per minute (Kg*m/min)"],
    ["weightPerYear", "Yearly Average weight", "kilogram (Kg)"],
    ["accelerationPerYear", "Yearly Average acceleration", "meters per second by second (m/(s^2))"],
];

/******************************************************************************/
//$('.chart').hide();
//$('#MPGPerYear').show();

let btnGroup=$('#btn-group');
drawLineChart("MPGPerYear");

attrDesc.forEach(function (x) {
    btnGroup.append(`<button id="btn_${x[0]}" class="button">${x[0]}</button>`);
});

$('.button').on("click", function (e) {
    e.stopPropagation();
    let chartId = $(this)[0]['id'].slice(4);
    drawLineChart(chartId);
});


/*******************************************************************************/
function getData(origin) {
    let length = data.length;
    let result = [];
    for (let i = 0; i < length; i++) {
        if (data[i]['Origin'] === origin) {
            result.push(data[i]);
        }
    }
    return result;
}

function getAttrPerYear(origin) {

    let [MPG,cylinders,displacement,horsepower,weight,acceleration]= [[], [], [], [], [], []];
    let length = origin.length;

    for (let i = 0; i < length - 1; i++) {
        let [sumMPG,sumCylinders,sumDisplacement,sumHorsepower,sumWeight,sumAcceleration]=new Array(6).fill(0);
        let countYearNum = 0;

        while (origin[i]['Model'] === origin[i + 1]['Model']) {
            sumMPG = sumMPG + parseInt(origin[i]['MPG']);
            sumCylinders = sumCylinders + parseInt(origin[i]['Cylinders']);
            sumDisplacement = sumDisplacement + parseInt(origin[i]['Displacement']);
            sumHorsepower = sumHorsepower + parseInt(origin[i]['Horsepower']);
            sumWeight = sumWeight + parseInt(origin[i]['Weight']);
            sumAcceleration = sumAcceleration + parseInt(origin[i]['Acceleration']);
            countYearNum++;
            i++;

            if (origin[i + 1] == undefined) {
                break
            }
        }

        MPG.push(sumMPG / countYearNum);
        cylinders.push(sumCylinders / countYearNum);
        displacement.push(sumDisplacement / countYearNum);
        horsepower.push(sumHorsepower / countYearNum);
        weight.push(sumWeight / countYearNum);
        acceleration.push(sumAcceleration / countYearNum);
    }

    return [MPG, cylinders, displacement, horsepower, weight, acceleration];
}


function drawLineChart(chartId){
    let i=0;

    for (i; i < attrDesc.length; i++) {
        if (attrDesc[i][0] === chartId) {
            break
        }
    }

    Highcharts.chart("container", {
        credits: {
            enabled: false
        },
        title: {
            text: attrDesc[i][1],
            x: -20 //center
        },
        /*subtitle: {
         text: 'Source: WorldClimate.com',
         x: -20
         },*/
        xAxis: {
            categories: ['70', '71', '72', '73', '74', '75',
                '76', '77', '78', '79', '80', '81', '82']
        },
        yAxis: {
            title: {
                text: attrDesc[i][2],
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        /*tooltip: {
         valueSuffix: 'km/L'
         },*/
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'US',
            color: 'rgba(144, 237, 125, .8)',
            data: USMPG[i]
        }, {
            name: 'Japan',
            color: 'rgba(247, 163, 92, .8)',
            data: JapanMPG[i]
        }, {
            name: 'Europe',
            color: 'rgba(119, 152, 191, .8)',
            data: EuropeMPG[i]
        }]
    });
}

