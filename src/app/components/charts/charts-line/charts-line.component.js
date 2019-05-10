import Chart from 'chart.js';

class ChartsLineComponentCtrl {
  /* @ngInject */
  constructor($element, ChartsConfig) {
    this._config = ChartsConfig;
    this._element = $element;
  }

  $onChanges(changes) {
    if (changes.data.currentValue[0].length > 0) {
      const CHART = new Chart(this._ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this._config.dataset(this.data),
        },
        options: this._config.options()
      });
      console.log(CHART);
    }
  }

  $postLink() {
    this._ctx = this._element.children().children()[0].getContext('2d');
  }
}

export const CHARTS_LINE_COMPONENT = {
  bindings: {
    data: '<',
    labels: '<'
  },
  template: require('./charts-line.html'),
  controller: ChartsLineComponentCtrl
};