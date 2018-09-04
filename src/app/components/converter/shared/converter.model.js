export class Currency {
  constructor(active = null, code = null, value = null) {
    this.active = active;
    this.code = code;
    this.value = value;
  }
}

export class Results {
  constructor(currency, denomination, rate) {
    this.currency = currency;
    this.denomination = denomination;
    this.rate = rate;
  }
}