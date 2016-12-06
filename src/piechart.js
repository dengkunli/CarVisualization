//read data
input = data.map((record) => { return {
  origin: record['Origin'],
  carmark: record['Car'].split(' ')[0]
}});
console.log(input);

function calculate(array){
  var n ={
    usSet: new Set(),
    euSet: new Set(),
    jpSet: new Set()
  };
  for (var i = 0; i < array.length; i++) {
    switch (array[i].origin) {
      case 'US': n.usSet.add(array[i].carmark)
        break;
      case 'Europe': n.euSet.add(array[i].carmark)
        break;
      case 'Japan': n.jpSet.add(array[i].carmark)
        break;
      default:
    }
  }
  return n;
}

var result;
result = calculate(input);
console.log(result);
console.log(result.usSet.size);


function drawPieChart() {
  Highcharts.chart('piechart', {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: 'Number of marks in each origin'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                      style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      }
                  }
              }
          },
          series: [{
              name: 'Brands',
              colorByPoint: true,
              data: [{
                  name: 'US',
                  y: result.usSet.size
              }, {
                  name: 'Europe',
                  y: result.euSet.size,
              }, {
                  name: 'Japan',
                  y: result.jpSet.size
              }]
          }]
      });
}
