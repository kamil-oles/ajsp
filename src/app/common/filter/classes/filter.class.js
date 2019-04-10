export class FilterConfig {
  constructor(currency, from, label, comparison = false) {
    this.comparison = comparison;
    this.currency = {
      code: currency
    };
    this.from = from;
    this.label = label;
  }
}