export const CONVERTER_SLIDER = {
  template: require('./converter-slider.html'),
  controller: class ConverterSliderCtrl {
    constructor($animate, $element, $interval, ConverterHttp) {
      this._animate = $animate;
      this._element = $element;
      this._http = ConverterHttp;
      this._interval = $interval;
    }

    $onInit() {
      this._index = 0;
      this._mainCurrencies = [];
    }

    $postLink() {
      this._slide = this._element.children().children();
      this._http.rate('USD').then(response => {
        this._fillArray('USD', response);
        this._fireAnimations();
        this._intervalPromise = this._interval(this._fireAnimations.bind(this), 5000);
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
        rate: this._prepareString(response.data.rates[0].ask)
      };
      this._mainCurrencies.push(CURRENCY);
    }

    _fireAnimations() {
      this._animate.setClass(this._slide, 'converter-slider-hide', 'converter-slider-show')
        .then(() => {
          return this._animate.setClass(
            this._slide,
            'converter-slider-default',
            'converter-slider-hide'
          );
        })
        .then(() => {
          this._changeView();
          this._animate.setClass(this._slide, 'converter-slider-show', 'converter-slider-default');
        });
    }

    _prepareString(number) {
      return String(number.toFixed(4)).replace(/\./, ',');
    }
  }
};