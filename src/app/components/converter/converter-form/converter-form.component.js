class ConverterFormComponentCtrl {
  /* @ngInject */
  constructor(
    $element,
    $scope,
    ConverterFormCalculate,
    ConverterFormStorage,
    ConverterFormGeneral,
    ConverterFormHttp,
    eventEmitter
  ) {
    this._calculate = ConverterFormCalculate;
    this._element = $element;
    this._eventEmitter = eventEmitter;
    this._general = ConverterFormGeneral;
    this._http = ConverterFormHttp;
    this._scope = $scope;
    this._storage = ConverterFormStorage;
  }

  $onChanges(changes) {
    this.loader = changes.loading.currentValue;
  }

  $onInit() {
    this.currencyFirst = this._storage.getData('first_currency');
    this.currencySecond = this._storage.getData('second_currency');
  }

  $postLink() {
    this._model = this._element.find('input').controller('ngModel');
    this._scope.calculateForm.value.$touched = true;
  }

  setValue(code) {
    this.setBackdrop(this._eventEmitter(false));
    this._general.processValue(this._model);
    const CURRENCY = (code === 'PLN' ? 'Second' : 'First');
    this._http.rate(this[`currency${CURRENCY}`].code).then(
      response => {
        this._updateData(this._calculate.setData(
          this[`currency${CURRENCY}`].code,
          this.currencyFirst.value,
          response,
          (code === 'PLN')
        ));
      },
      error => {
        this._scope.$emit('toast', error.data);
        this.loader = false;
      }
    );
  }

  swap() {
    const CURRENCIES_DATA = this._general.swap(this.currencyFirst, this.currencySecond);
    this.currencyFirst = CURRENCIES_DATA[0];
    this.currencySecond = CURRENCIES_DATA[1];
  }

  updateCode(data) {
    this[`currency${this.currencyFirst.code === 'PLN' ? 'Second' : 'First'}`].code = data.value;
  }

  _updateData(results) {
    this.currencySecond = results.currency;
    this.updateRate(this._eventEmitter({
      code: this[`currency${this.currencyFirst.code === 'PLN' ? 'Second' : 'First'}`].code,
      denomination: results.denomination,
      rate: results.rate
    }));
    this.setBackdrop(this._eventEmitter(true));
    this._storage.setData(this.currencyFirst, this.currencySecond);
  }
}

export const CONVERTER_FORM_COMPONENT = {
  template: require('./converter-form.html'),
  bindings: {
    currencies: '<',
    loading: '<',
    setBackdrop: '&',
    updateRate: '&'
  },
  controller: ConverterFormComponentCtrl
};