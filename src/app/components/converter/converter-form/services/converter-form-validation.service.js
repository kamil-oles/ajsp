export class ConverterFormValidationService {
  formatting(value) {
    const string = value.toString(),
      index = string.search(/\./);
    let integer = index > 0 ? string.slice(0, index) : string;
    const spaces = Math.floor((integer.length - 1) / 3);
    if (spaces) {
      integer = this.insertSpaces(integer);
    }
    if (index > 0) {
      const fraction = string.slice(index + 1);
      return `${integer},${fraction}`;
    } else {
      return integer;
    }
  }

  insertSpaces(string) {
    let array = string.split('').reverse();
    for (let i = 3; i < array.length; i = i + 4) {
      array.splice(i, 0, ' ');
    }
    return array.reverse().join('');
  }

  toNumber(value) {
    let fixed = false,
      number = value.replace(/^0{2,}|^0(?!\.)|\s/g, '').replace(/,/g, '.');
    const index = number.search(/\./);
    number = number.replace(/\./g, '');
    if (index > 0) {
      const integer = number.slice(0, index),
        fraction = number.slice(index);
      number = `${integer}.${fraction}`;
      fixed = true;
    } else if (index === 0) {
      number = `0.${number}`;
      fixed = true;
    }
    if (fixed) {
      return Number(number).toFixed(2);
    } else {
      return Number(number);
    }
  }

  validation(value, form) {
    console.log(value);
    const error = !/[0-9]/.test(value);
    form.value.$setValidity('required', !error);
    return error ? '' : value.replace(/[^0-9,.\s]/g, '');
  }
}