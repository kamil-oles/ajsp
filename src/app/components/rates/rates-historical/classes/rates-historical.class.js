export class RatesHistorical {
  constructor(code, from, to, rates) {
    this.currency = code;
    this.from = from;
    this.rates = rates;
    this.to = to;
  }
}