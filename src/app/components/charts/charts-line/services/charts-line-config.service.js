export class ChartsLineConfigService {
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
      legend: { display: false },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Data kursu'
          },
          ticks: {
            fontColor: 'rgba(0, 0, 0, .87)',
            fontFamily: '"Roboto", "Helvetica Neue", "sans-serif"'
          },
        }],
        yAxes: [{
          beforeBuildTicks(axis) {
            if (axis.min < 0) {
              axis.min = 0;
            }
          },
          gridLines: {
            color: 'rgb(245, 245, 245)',
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Kurs średni'
          },
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