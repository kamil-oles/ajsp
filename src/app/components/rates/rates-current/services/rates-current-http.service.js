import { URL } from '../../../../app.module';

export class RatesCurrentHttpService {
  constructor($http) {
    this.http = $http;
  }

  getRates() {
    return this.http({
      method: 'GET',
      url: `${URL}tables/c/`
    });
  }

  rates() {
    return this.getRates().then(response => this.removeXdr(response.data[0]));
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