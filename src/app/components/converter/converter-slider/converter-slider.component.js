export const CONVERTER_SLIDER = {
  template: require('./converter-slider.html'),
  controller: class ConverterSliderCtrl {
    constructor($interval, ConverterHttp) {
      this._http = ConverterHttp;
      this._interval = $interval;
    }

    $onInit() {
      this._index = 0;
      this._mainCurrencies = [];
      this._http.rate('USD').then(response => {
        this._fillArray('USD', response);
        this._changeView();
        this._intervalPromise = this._interval(this._changeView.bind(this), 5000);
        return this._http.rate('EUR');
      }).then((response) => {
        this._fillArray('EUR', response);
        return this._http.rate('CHF');
      }).then((response) => {
        this._fillArray('CHF', response);
        return this._http.rate('GBP');
      }).then((response) => {
        this._fillArray('GBP', response);
      }, (error) => {
        console.log(error);
      });
    }

    $onDestroy() {
      this._interval.cancel(this._intervalPromise);
    }

    _changeView() {
      this.view = this._mainCurrencies[this._index];
      if (this._index < 3) {
        this._index++;
      } else {
        this._index = 0;
      }
    }

    _fillArray(input, response) {
      const CURRENCY = {
        code: input,
        rate: (response.data.rates[0].ask).toFixed(4)
      };
      this._mainCurrencies.push(CURRENCY);
    }
  }
};