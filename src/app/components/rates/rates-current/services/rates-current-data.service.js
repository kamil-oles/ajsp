export class RatesCurrentDataService {
  constructor(RatesCurrentHttp) {
    this.http = RatesCurrentHttp;
  }

  rates() {
    const SESSION_RATES = JSON.parse(sessionStorage.getItem('rates_current'));
    if (!SESSION_RATES) {
      return this.http.getRates().then(response => {
        const DATA = this._removeXdr(response.data[0]);
        sessionStorage.setItem('rates_current', JSON.stringify(DATA));
        return DATA;
      });
    } else {
      return SESSION_RATES;
    }
  }

  _removeXdr(response) {
    const LEN = response.rates.length;
    for (let i = 0; i < LEN; i++) {
      if (response.rates[i].code === 'XDR') {
        response.rates.splice(i, 1);
        break;
      }
    }
    return response;
  }
}