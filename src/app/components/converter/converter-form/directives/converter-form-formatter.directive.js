export class ConverterFormFormatterDirective {
  constructor() {
    this.controller = ConverterFormFormatterDirectiveCtrl;
    this.restrict = 'A';
    this.scope = {};
  }
}

class ConverterFormFormatterDirectiveCtrl {
  constructor($element, ConverterFormFormatter) {
    this._element = $element;
    this._service = ConverterFormFormatter;
  }

  $postLink() {
    this._model = this._element.controller('ngModel');
    this._element.on('blur', () => {
      this._model.$processModelValue();
    });
    this._model.$parsers.push((value) => {
      return this._service.toNumber(value);
    });
    this._model.$formatters.push((value) => {
      return this._service.format(value);
    });
  }
}