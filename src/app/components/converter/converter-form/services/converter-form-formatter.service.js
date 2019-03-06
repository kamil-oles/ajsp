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

  _insertSpaces(string) {
    let array = string.split('').reverse();
    for (let i = 3; i < array.length; i = i + 4) {
      array.splice(i, 0, ' ');
    }
    return array.reverse().join('');
  }
}