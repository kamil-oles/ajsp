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
      return this.service.toNumber(value);
    });
    this.model.$formatters.push((value) => {
      return this.service.format(value);
    });
  }
}