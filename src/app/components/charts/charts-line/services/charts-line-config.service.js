export class ChartsLineConfigService {
  _colorPrimary = 'rgb(158, 158, 158)';
  _colorPrimaryDark = 'rgb(66, 66, 66)';
  _colorTextDark = 'rgba(0, 0, 0, .87)';
  _fontFamily = '"Roboto", "Helvetica Neue", "sans-serif"';

  dataset(data, codes) {
    return [
      {
        borderColor: this._colorPrimary,
        currencyCode: codes[0].code,
        data: data[0],
        fill: false,
        lineTension: 0,
        pointBackgroundColor: 'rgb(238, 255, 65)',
        pointBorderColor: this._colorPrimary
      },
      {
        borderColor: this._colorPrimaryDark,
        currencyCode: codes[1].code,
        data: data[1],
        fill: false,
        lineTension: 0,
        pointBackgroundColor: 'rgb(224, 224, 224)',
        pointBorderColor: this._colorPrimaryDark
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
            fontColor: this._colorTextDark,
            fontFamily: this._fontFamily
          },
        }],
        yAxes: [{
          afterDataLimits(axis) {
            if (axis.min < 0) {
              axis.min = 0;
            }
          },
          afterBuildTicks(axis, ticks) {
            const DATASETS = axis.chart.config.data.datasets;
            if (DATASETS[1].data.length) {
              const SIX_DIGITS = DATASETS.every(function comparison(element) {
                return element.currencyCode === 'HUF' || element.currencyCode === 'JPY';
              });
              return ticks.map(function ticksRounding(element) {
                return element.toFixed(SIX_DIGITS ? 6 : 2);
              });
            } else if (!DATASETS[1].data.length) {
              const CODE = DATASETS[0].currencyCode,
                SIX_DIGITS = (CODE === 'HUF' || CODE === 'JPY');
              return ticks.map(function ticksRounding(element) {
                return element.toFixed(SIX_DIGITS ? 6 : 4);
              });
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
              return String(value).replace(/\./, ',');
            },
            fontColor: this._colorTextDark,
            fontFamily: this._fontFamily
          }
        }]
      }
    };
  }
}