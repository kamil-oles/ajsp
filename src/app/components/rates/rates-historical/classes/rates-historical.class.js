export class RatesHistorical {
  constructor(code, from, data = null) {
    this.currency = {
      code: code
    };
    this.data = data;
    this.from = from;
  }
}