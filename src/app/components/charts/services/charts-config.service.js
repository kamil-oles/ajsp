export class ChartsConfigService {
  dataset() {
    return [
      {
        borderColor: 'rgb(158, 158, 158)',
        fill: false,
        lineTension: 0,
        pointBackgroundColor: 'rgb(238, 255, 65)',
        pointBorderColor: 'rgb(158, 158, 158)'
      },
      {
        borderColor: 'rgb(66, 66, 66)',
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
            fontColor: 'rgba(0, 0, 0, .87)',
            fontFamily: '"Roboto", "Helvetica Neue", "sans-serif"',
            precision: 4
          },
          type: 'linear'
        }]
      }
    };
  }
}