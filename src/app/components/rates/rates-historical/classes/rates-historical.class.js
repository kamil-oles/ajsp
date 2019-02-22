export class RatesHistorical {
  constructor(code, from, data = null) {
    this.currency = code;
    this.data = data;
    this.from = from;
  }
}