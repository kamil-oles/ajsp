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
      eventEmitter
    ) {
      this._calculate = ConverterFormCalculate;
      this._element = $element;
      this._eventEmitter = eventEmitter;
      this._general = ConverterFormGeneral;
      this._local = ConverterFormStorage;
      this._scope = $scope;
    }

    $onInit() {
      this.currencyFirst = this._local.getData('first_currency');
      this.currencySecond = this._local.getData('second_currency');
      this._regex = /^\d{1,3}$|^\d{1,3},\d{2}$|^(\d{1,3}\s)*\d{3}$|^(\d{1,3}\s)*\d{3},\d{2}$/;
    }

    $onChanges(changes) {
      this.loader = changes.loading.currentValue;
    }

    $postLink() {
      this._model = this._element.find('input').controller('ngModel');
      this._scope.calculateForm.value.$touched = true;
    }

    setValue() {
      this.setBackdrop(this._eventEmitter(false));
      if (!this._regex.test(this._model.$viewValue)) {
        this._model.$processModelValue();
      }
      if (this.currencyFirst.code === 'PLN') {
        this._calculate.check(this.currencySecond.code, this.currencyFirst.value, true)
          .then(results => {
            this.currencySecond = this._general.setData
              .call(this, results, this.currencySecond.code);
            this.setBackdrop(this._eventEmitter(true));
          });
      } else {
        this._calculate.check(this.currencyFirst.code, this.currencyFirst.value)
          .then(results => {
            this.currencySecond = this._general.setData
              .call(this, results, this.currencyFirst.code);
            this.setBackdrop(this._eventEmitter(true));
          });
      }
      this._local.setData.call(this);
    }

    swap() {
      const CURRENCIES_DATA = this._general.swap(this.currencyFirst, this.currencySecond);
      this.currencyFirst = CURRENCIES_DATA[0];
      this.currencySecond = CURRENCIES_DATA[1];
    }

    updateCode(code) {
      this[this.currencyFirst.code === 'PLN' ? 'currencySecond' : 'currencyFirst'].code = code;
    }
  }
};