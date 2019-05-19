export class ChartsLineConfigService {
  /* @ngInject */
  constructor($window) {
    this._window = $window;
  }

  _colorPrimary = 'rgb(158, 158, 158)';
  _colorPrimaryDark = 'rgb(66, 66, 66)';
  _colorTextLight = 'rgba(255, 255, 255, .87)';
  _dataSetCommon = {
    fill: false,
    lineTension: 0,
    pointRadius: 4
  };
  _fontFamily = '"Roboto", "Helvetica Neue", "sans-serif"';
  _scaleLabelCommon = {
    fontColor: this._colorPrimary,
    fontFamily: this._fontFamily,
  };
  _ticksCommon = {
    fontColor: 'rgba(0, 0, 0, .87)',
    fontFamily: this._fontFamily
  };

  dataset(data, codes) {
    return [
      {
        borderColor: this._colorPrimary,
        currencyCode: codes[0].code,
        data: data[0],
        pointBackgroundColor: 'rgb(238, 255, 65)',
        pointBorderColor: this._colorPrimary,
        ...this._dataSetCommon
      },
      {
        borderColor: this._colorPrimaryDark,
        currencyCode: codes[1].code,
        data: data[1],
        pointBackgroundColor: 'rgb(224, 224, 224)',
        pointBorderColor: this._colorPrimaryDark,
        ...this._dataSetCommon
      },
    ];
  }

  options() {
    const MID_RATE = 'Kurs średni',
      SCALE_LABEL = this._window.innerWidth > 600;

    return {
      animation: { duration: 0 },
      aspectRatio: (!SCALE_LABEL && this._window.innerWidth < this._window.innerHeight) ? 1 : 2,
      hover: { animationDuration: 300 },
      legend: { display: false },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: SCALE_LABEL,
            labelString: 'Data kursu',
            ...this._scaleLabelCommon
          },
          ticks: this._ticksCommon
        }],
        yAxes: [{
          afterDataLimits(axis) {
            (axis.min < 0) && (axis.min = 0);
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
            } else {
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
            display: SCALE_LABEL,
            labelString: MID_RATE,
            ...this._scaleLabelCommon
          },
          ticks: {
            callback: function ticksConfig(value) {
              return value.replace(/\./, ',');
            },
            ...this._ticksCommon
          }
        }]
      },
      tooltips: {
        backgroundColor: 'rgba(0, 0, 0, .87)',
        bodyFontColor: this._colorTextLight,
        bodyFontFamily: this._fontFamily,
        callbacks: {
          title: function prepareTitle(tooltip, data) {
            return `${data.datasets[tooltip[0].datasetIndex].currencyCode} ${tooltip[0].xLabel}`;
          },
          label: function prepareLabel(tooltip) {
            return `${MID_RATE}: ${tooltip.yLabel.toFixed(4).replace(/\./, ',')}`;
          }
        },
        displayColors: false,
        titleFontColor: this._colorTextLight,
        titleFontFamily: this._fontFamily,
        titleFontStyle: '500'
      }
    };
  }
}