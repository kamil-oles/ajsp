export class Currency {
  constructor(active = null, code = null, value = null) {
    this.active = active;
    this.code = code;
    this.value = value;
  }
}

export class DatepickerOptions {
  constructor(max, min) {
    this.maxDate = max;
    this.minDate = min;
  }
}

export class RatesHistorical {
  constructor(from, data = null) {
    this.data = data;
    this.from = from;
  }
}

export class Results {
  constructor(currency, denomination, rate) {
    this.currency = currency;
    this.denomination = denomination;
    this.rate = rate;
  }
}