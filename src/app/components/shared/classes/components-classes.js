export class Currency {
  constructor(code = null, value = null) {
    this.code = code;
    this.value = value;
  }
}

export class Rate {
  constructor(code = null, denomination = null, rate = null) {
    this.code = code;
    this.denomination = denomination;
    this.rate = rate;
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