import { Currency } from './classes/converter-form.class';
import { Rate } from './classes/converter-form.class';

export const CONVERTER_FORM_COMPONENT = {
  template: require('./converter-form.html'),
  bindings: {
    currencies: '<',
    updateRate: '&'
  },
  controller: class ConverterFormComponentCtrl {
    constructor(
      $element,
      $scope,
      ConverterFormCalculate,
      ConverterFormFormatter,
      ConverterFormStorage,
      eventEmitter
    ) {
      this._calculate = ConverterFormCalculate;
      this._element = $element;
      this._eventEmitter = eventEmitter;
      this._formatter = ConverterFormFormatter;
      this._local = ConverterFormStorage;
      this._scope = $scope;
    }

    _blockLoader = true;

    $onInit() {
      this.currencyFirst = this._local.getData('first_currency');
      this.currencySecond = this._local.getData('second_currency');
      this._regex = /^\d{1,3}$|^\d{1,3},\d{2}$|^(\d{1,3}\s)*\d{3}$|^(\d{1,3}\s)*\d{3},\d{2}$/;
      this._scope.$on('loader', (event, loader) => {
        this.loader = !this._blockLoader ? loader : false;
      });
    }

    $postLink() {
      this._model = this._element.find('input').controller('ngModel');
      this._scope.calculateForm.value.$touched = true;
    }

    setValue() {
      this._blockLoader = false;
      if (!this._regex.test(this._model.$viewValue)) {
        this._model.$processModelValue();
      }
      if (this.currencyFirst.code === 'PLN') {
        this._calculate.check(this.currencySecond.code, this.currencyFirst.value, true)
          .then(results => {
            this._setData(results, this.currencySecond.code);
            this._blockLoader = true;
          });
      } else {
        this._calculate.check(this.currencyFirst.code, this.currencyFirst.value)
          .then(results => {
            this._setData(results, this.currencyFirst.code);
            this._blockLoader = true;
          });
      }
      localStorage.setItem('first_currency', JSON.stringify(this.currencyFirst));
      localStorage.setItem('second_currency', JSON.stringify(this.currencySecond));
    }

    swap() {
      const STASH = Object.assign({}, this.currencyFirst);
      this.currencyFirst = new Currency(
        this.currencySecond.code,
        this._formatter.toNumber(this.currencySecond.value)
      );
      this.currencySecond = new Currency(
        STASH.code,
        this._formatter.format(STASH.value)
      );
    }

    updateCode(code) {
      this[this.currencyFirst.code === 'PLN' ? 'currencySecond' : 'currencyFirst'].code = code;
    }

    _setData(data, code) {
      this.currencySecond = data.currency;
      data.rate = data.rate.replace('.', ',');
      this.updateRate(this._eventEmitter(new Rate(code, data.denomination, data.rate)));
    }
  }
};