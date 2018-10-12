export class Currency {
  constructor(active = null, code = null, value = null) {
    this.active = active;
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

export class Value {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
}

export class ViewValue {
  constructor(integer, fraction = null) {
    this.integer = integer;
    this.fraction = fraction;
  }
}