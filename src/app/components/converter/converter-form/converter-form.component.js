export const CONVERTER_FORM_COMPONENT = {
  template: require('./converter-form.html'),
  bindings: {
    currencies: '<',
    loading: '<',
    setBackdrop: '&',
    updateRate: '&'
  },
  controller: class ConverterFormComponentCtrl {
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

    _regex = /^\d{1,3}$|^\d{1,3},\d{2}$|^(\d{1,3}\s)*\d{3}$|^(\d{1,3}\s)*\d{3},\d{2}$/;

    $onInit() {
      this.currencyFirst = this._storage.getData('first_currency');
      this.currencySecond = this._storage.getData('second_currency');
    }

    $onChanges(changes) {
      this.loader = changes.loading.currentValue;
    }

    $postLink() {
      this._model = this._element.find('input').controller('ngModel');
      this._scope.calculateForm.value.$touched = true;
    }

    setValue(code) {
      this.setBackdrop(this._eventEmitter(false));
      if (!this._regex.test(this._model.$viewValue)) {
        this._model.$processModelValue();
      }
      const CURRENCY = code === 'PLN' ? 'Second' : 'First';
      this._http.rate(this[`currency${CURRENCY}`].code).then(response => {
        this._updateData(this._calculate.setData(
          this[`currency${CURRENCY}`].code,
          this.currencyFirst.value,
          response,
          (code === 'PLN')
        ));
      });
    }

    swap() {
      const CURRENCIES_DATA = this._general.swap(this.currencyFirst, this.currencySecond);
      this.currencyFirst = CURRENCIES_DATA[0];
      this.currencySecond = CURRENCIES_DATA[1];
    }

    updateCode(code) {
      this[this.currencyFirst.code === 'PLN' ? 'currencySecond' : 'currencyFirst'].code = code;
    }

    _updateData(results) {
      this.currencySecond = results.currency;
      this.updateRate(this._eventEmitter(results));
      this.setBackdrop(this._eventEmitter(true));
      this._storage.setData(this.currencyFirst, this.currencySecond);
    }
  }
};