export class ConverterFormFormatterService {
  format(value) {
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

  toNumber(value) {
    if (!value) {
      return '';
    }
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

  _insertSpaces(string) {
    let array = string.split('').reverse();
    for (let i = 3; i < array.length; i = i + 4) {
      array.splice(i, 0, ' ');
    }
    return array.reverse().join('');
  }
}