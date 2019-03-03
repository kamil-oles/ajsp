export const CONVERTER_SLIDER = {
  template: require('./converter-slider.html'),
  controller: class ConverterSliderCtrl {
    constructor($animate, $element, $interval, ConverterSliderData, ConverterSliderHttp) {
      this._animate = $animate;
      this._element = $element;
      this._http = ConverterSliderHttp;
      this._interval = $interval;
      this._data = ConverterSliderData;
    }

    $onInit() {
      this._index = 0;
      this._mainCurrencies = [];
    }

    $postLink() {
      this._slide = this._element.children().children();
      this._http.rates('USD').then(response => {
        this._mainCurrencies.push(this._data.prepareData(response.data));
        this._fireAnimations();
        this._intervalPromise = this._interval(this._fireAnimations.bind(this), 5450);
        return this._http.rates('EUR');
      }).then((response) => {
        this._mainCurrencies.push(this._data.prepareData(response.data));
        return this._http.rates('CHF');
      }).then((response) => {
        this._mainCurrencies.push(this._data.prepareData(response.data));
        return this._http.rates('GBP');
      }).then((response) => {
        this._mainCurrencies.push(this._data.prepareData(response.data));
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
  }
};