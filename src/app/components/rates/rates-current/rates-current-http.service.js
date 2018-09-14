export class RatesCurrentHttpService {
  constructor($http) {
    this.http = $http;
  }

  currentRates() {
    return this.http({
      method: 'GET',
      url: 'http://api.nbp.pl/api/exchangerates/tables/c/'
    });
  }

  prepareRates(response) {
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