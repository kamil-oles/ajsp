export class RatesCurrentHttpService {
  constructor($http, base) {
    this.http = $http;
    this.url = base.url;
  }

  getRates() {
    return this.http({
      method: 'GET',
      url: `${this.url}tables/c/`
    });
  }

  rates() {
    const SESSION_RATES = JSON.parse(sessionStorage.getItem('rates_current'));
    if (!SESSION_RATES) {
      return this.getRates().then(response => {
        const DATA = this.removeXdr(response.data[0]);
        sessionStorage.setItem('rates_current', JSON.stringify(DATA));
        return DATA;
      });
    } else {
      return SESSION_RATES;
    }
  }

  removeXdr(response) {
    const len = response.rates.length;
    for (let i = 0; i < len; i++) {
      if (response.rates[i].code === 'XDR') {
        response.rates.splice(i, 1);
        break;
      }
    }
    return response;
  }
}