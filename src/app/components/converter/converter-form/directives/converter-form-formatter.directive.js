export class ConverterFormFormatterDirective {
  constructor() {
    this.controller = ConverterFormFormatterDirectiveCtrl;
    this.require = '^ngModel';
    this.restrict = 'A';
    this.scope = {};
  }
}

class ConverterFormFormatterDirectiveCtrl {
  constructor($element) {
    this.element = $element;
  }

  $postLink() {
    this.element.$parsers.push((value) => {
      return this._toNumber(value);
    });
    this.element.$formatters.push((value) => {
      return this._formatter(value);
    });
  }

  _formatter(value) {
    const STRING = value.toString(),
      INDEX = STRING.search(/\./);
    let integer = INDEX > 0 ? STRING.slice(0, INDEX) : STRING;
    if (Math.floor((integer.length - 1) / 3)) {
      integer = this._insertSpaces(integer);
    }
    if (INDEX > 0) {
      const FRACTION = STRING.slice(INDEX + 1);
      return `${integer},${FRACTION}`;
    } else {
      return integer;
    }
  }

  _insertSpaces(string) {
    let array = string.split('').reverse(),
      len = array.length;
    for (let i = 3; i < len; i = i + 4) {
      array.splice(i, 0, ' ');
    }
    return array.reverse().join('');
  }

  _toNumber(value) {
    let number = value.replace(/^0{2,}|^0(?!\.)|\s/g, '').replace(/,/g, '.');
    const INDEX = number.search(/\./);
    number = number.replace(/\./g, '');
    if (INDEX > 0) {
      const INTEGER = number.slice(0, INDEX),
        fraction = number.slice(INDEX);
      number = `${INTEGER}.${fraction}`;
      return Number(number).toFixed(2);
    } else if (INDEX === 0) {
      number = `0.${number}`;
      return Number(number).toFixed(2);
    }
    return Number(number);
  }
}