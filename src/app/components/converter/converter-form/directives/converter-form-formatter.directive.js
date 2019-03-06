export class ConverterFormFormatterDirective {
  constructor() {
    this.controller = ConverterFormFormatterDirectiveCtrl;
    this.restrict = 'A';
    this.scope = {};
  }
}

class ConverterFormFormatterDirectiveCtrl {
  constructor($element, ConverterFormFormatter) {
    this.element = $element;
    this.service = ConverterFormFormatter;
  }

  $postLink() {
    this.model = this.element.controller('ngModel');
    this.element.on('blur', () => {
      this.model.$processModelValue();
    });
    this.model.$parsers.push((value) => {
      return this._toNumber(value);
    });
    this.model.$formatters.push((value) => {
      return this.service.format(value);
    });
  }

  _toNumber(value) {
    let string = value.replace(/[^0-9,.\s]|^0{2,}|^0(?!\.)|\s/g, '').replace(/,/g, '.');
    const INDEX = string.search(/\./);
    string = string.replace(/\./g, '');
    if (string.length === 0) {
      return string;
    }
    if (INDEX > 0) {
      const INTEGER = string.slice(0, INDEX),
        FRACTION = string.slice(INDEX);
      string = `${INTEGER}.${FRACTION}`;
      return Number(string).toFixed(2);
    } else if (INDEX === 0) {
      string = `0.${string}`;
      return Number(string).toFixed(2);
    }
    return Number(string);
  }
}