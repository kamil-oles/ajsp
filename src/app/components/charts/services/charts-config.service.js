export class ChartsConfigService {
  dataset(data) {
    return [
      {
        borderColor: 'rgb(158, 158, 158)',
        data: data[0],
        fill: false,
        lineTension: 0,
        pointBackgroundColor: 'rgb(238, 255, 65)',
        pointBorderColor: 'rgb(158, 158, 158)'
      },
      {
        borderColor: 'rgb(66, 66, 66)',
        data: data[1],
        fill: false,
        lineTension: 0,
        pointBackgroundColor: 'rgb(224, 224, 224)',
        pointBorderColor: 'rgb(66, 66, 66)'
      },
    ];
  }

  options() {
    return {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: 'rgba(0, 0, 0, .87)',
            fontFamily: '"Roboto", "Helvetica Neue", "sans-serif"'
          },
        }],
        yAxes: [{
          ticks: {
            callback: function ticksConfig(value) {
              return String(value.toFixed(4)).replace(/\./, ',');
            },
            fontColor: 'rgba(0, 0, 0, .87)',
            fontFamily: '"Roboto", "Helvetica Neue", "sans-serif"'
          },
          type: 'linear'
        }]
      }
    };
  }
}