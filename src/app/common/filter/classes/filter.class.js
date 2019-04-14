export class FilterConfig {
  constructor(currency, from, label, comparison) {
    this.comparison = comparison;
    this.currency = {
      code: currency
    };
    this.from = from;
    this.label = label;
  }
}

export class FilterParams {
  constructor(currencies, from, to) {
    this.currencies = currencies;
    this.from = from;
    this.to = to;
  }
}