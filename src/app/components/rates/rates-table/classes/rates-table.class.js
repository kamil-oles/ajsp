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