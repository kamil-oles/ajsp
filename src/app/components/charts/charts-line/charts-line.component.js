import Chart from 'chart.js';

class ChartsLineComponentCtrl {
  /* @ngInject */
  constructor($element, $interval, $window, ChartsLineConfig) {
    this._config = ChartsLineConfig;
    this._element = $element;
    this._interval = $interval;
    this._window = $window;
  }

  $onChanges(changes) {
    if (changes.data.currentValue[0].length) {
      this._prepareChart();
    }
  }

  $onInit() {
    this._boundEventHandler = this._orientationChangeHandler;
    this._window.addEventListener('orientationchange', this._boundEventHandler.bind(this));
  }

  $postLink() {
    this._ctx = this._element.children().children()[0].getContext('2d');
  }

  $onDestroy() {
    this._window.removeEventListener('orientationchange', this.boundEventHandler);
    if (this._intervalPromise) {
      this._interval.cancel(this._intervalPromise);
    }
  }

  _prepareChart() {
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

  _orientationChangeHandler() {
    if (this.data[0].length) {
      let noChangeCounter = 0;
      const LAST_INNER_WIDTH = this._window.innerWidth;
      this._intervalPromise = this._interval(() => {
        if (LAST_INNER_WIDTH === this._window.innerWidth) {
          noChangeCounter++;
          if (noChangeCounter > 10) {
            this._interval.cancel(this._intervalPromise);
          }
        } else {
          this._prepareChart();
          this._interval.cancel(this._intervalPromise);
        }
      }, 100);
    }
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