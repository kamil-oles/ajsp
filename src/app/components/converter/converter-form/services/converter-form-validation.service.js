import { Value, ViewValue } from '../../../shared/classes/components-classes';

export class ConverterFormValidationService {
  formatting(value, input = false) {
    const vNumber = input ? this.validation(value) : value;
    if (!vNumber) {
      return false;
    }
    const vString = vNumber.toString(),
      vObject = this.setObject(vString),
      len = vObject.integer.length - 1,
      spaces = Math.floor(len / 3);
    if (spaces) {
      let array = vObject.integer.split('').reverse();
      for (let i = 3; i < array.length; i = i + 4) {
        array.splice(i, 0, ' ');
      }
      vObject.integer = array.reverse().join('');
    }
    const view = this.setViewValue(vObject);
    return new Value(view, vNumber);
  }

  setObject(string) {
    const index = string.indexOf('.');
    if (index !== -1) {
      const fractionIndex = index + 1,
        fraction = string.slice(fractionIndex),
        integer = string.slice(0, index);
      return new ViewValue(integer, fraction);
    } else {
      return new ViewValue(string);
    }
  }

  setViewValue(object) {
    if (object.fraction) {
      return object.integer + ',' + object.fraction;
    } else {
      return object.integer;
    }
  }

  validation(value) {
    let vString = value;
    if (/[^0-9,.\s]/.test(vString)) {
      return false;
    }
    vString = vString.replace(/^0{2,}|^0(?!\.)|\s/g, '').replace(/,/g, '.');
    const index = vString.search(/\./);
    let vArray = [];
    if (index !== -1) {
      vArray = vString.split('.');
      vString = vArray.join('');
      vArray = vString.split('');
      vArray.splice(index, 0, '.');
    }
    if (index === 0) {
      vArray.reverse();
      vArray.push(0);
      vArray.reverse();
    }
    const v = index !== -1 ? vArray.join('') : vString;
    return Number(v).toFixed(2);
  }
}