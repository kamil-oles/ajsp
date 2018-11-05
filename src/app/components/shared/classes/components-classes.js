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

export class TableRowCurrent {
  constructor(bid, ask, code, currency) {
    this.code = code;
    this.currency = currency;
    this.bid = bid;
    this.ask = ask;
  }
}

export class TableRowHistorical {
  constructor(bid, ask, date) {
    this.date = date;
    this.bid = bid;
    this.ask = ask;
  }
}