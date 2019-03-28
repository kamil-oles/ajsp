export class RatesCurrentDataService {
  constructor(RatesCurrentHttp) {
    this._http = RatesCurrentHttp;
  }

  rates() {
    const SESSION_RATES = JSON.parse(sessionStorage.getItem('rates_current'));
    if (!SESSION_RATES) {
      return this._http.getRates().then(response => {
        const DATA = this._removeXdr(response.data[0]);
        sessionStorage.setItem('rates_current', JSON.stringify(DATA));
        return DATA;
      });
    } else {
      return SESSION_RATES;
    }
  }

  _removeXdr(response) {
    response.rates.every(function searchForXdr(element, index) {
      if (element.code === 'XDR') {
        response.rates.splice(index, 1);
        return false;
      }
      return true;
    });
    return response;
  }
}