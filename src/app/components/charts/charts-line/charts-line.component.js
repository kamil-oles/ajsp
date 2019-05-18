import Chart from 'chart.js';

class ChartsLineComponentCtrl {
  /* @ngInject */
  constructor($element, ChartsLineConfig) {
    this._config = ChartsLineConfig;
    this._element = $element;
  }

  $onChanges(changes) {
    if (changes.data.currentValue[0].length) {
      if (this._chart) {
        this._chart.destroy();
      }
      this._chart = new Chart(this._ctx, {
        data: {
          datasets: this._config.dataset(this.data, this.codes),
          labels: this.labels
        },
        options: this._config.options(),
        type: 'line'
      });
      this.show = true;
    }
  }

  $postLink() {
    this._ctx = this._element.children().children()[0].getContext('2d');
  }
}

export const CHARTS_LINE_COMPONENT = {
  bindings: {
    codes: '<',
    data: '<',
    labels: '<'
  },
  template: require('./charts-line.html'),
  controller: ChartsLineComponentCtrl
};