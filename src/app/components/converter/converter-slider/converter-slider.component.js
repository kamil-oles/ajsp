class ConverterSliderComponentCtrl {
  /* @ngInject */
  constructor($animate, $element, $interval, ConverterSliderData, ConverterSliderHttp) {
    this._animate = $animate;
    this._element = $element;
    this._http = ConverterSliderHttp;
    this._interval = $interval;
    this._data = ConverterSliderData;
  }

  _blockLoader = false;
  _mainCurrencies = [];

  $onChanges(changes) {
    this.loader = (!this._blockLoader ? changes.loading.currentValue : false);
  }

  $postLink() {
    const SLIDE = this._element.children().children()[0];
    this._http.rates('USD').then(response => {
      this._mainCurrencies.push(this._data.prepareData(response.data));
      this._fireAnimations(SLIDE);
      this._blockLoader = true;
      return this._http.rates('EUR');
    }).then(response => {
      this._mainCurrencies.push(this._data.prepareData(response.data));
      this._intervalPromise = this._interval(this._fireAnimations.bind(this, SLIDE), 5450);
      return this._http.rates('CHF');
    }).then(response => {
      this._mainCurrencies.push(this._data.prepareData(response.data));
      return this._http.rates('GBP');
    }).then(response => {
      this._mainCurrencies.push(this._data.prepareData(response.data));
    }, () => {
      this._blockLoader = true;
      this.message = (this._mainCurrencies.length === 0);
    });
  }

  $onDestroy() {
    this._interval.cancel(this._intervalPromise);
  }

  _changeView() {
    const INDEX = this._mainCurrencies.indexOf(this.view),
      LENGTH = this._mainCurrencies.length;
    this.view = this._mainCurrencies[INDEX === LENGTH - 1 ? 0 : INDEX + 1];
  }

  _fireAnimations(slide) {
    this._animate.setClass(slide, 'converter-slider-hide', 'converter-slider-show')
      .then(() => {
        return this._animate.setClass(slide, 'converter-slider-default', 'converter-slider-hide');
      })
      .then(() => {
        this._changeView();
        this._animate.setClass(slide, 'converter-slider-show', 'converter-slider-default');
      });
  }
}

export const CONVERTER_SLIDER_COMPONENT = {
  bindings: { loading: '<' },
  template: require('./converter-slider.html'),
  controller: ConverterSliderComponentCtrl
};