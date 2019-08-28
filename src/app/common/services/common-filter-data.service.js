export class CommonFilterDataService {
  filterConfig(currency, from, to, label, comparison) {
    return {
      comparison: comparison,
      currency: {
        code: currency
      },
      from: from,
      label: label,
      to: to
    };
  }

  filterParams(currencies, from, to) {
    return {
      currencies: currencies,
      from: from,
      to: to
    };
  }
}