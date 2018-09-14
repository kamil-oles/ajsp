import templateUrl from './rates-historical.html';

export const ratesHistoricalComponent = {
  templateUrl,
  controller: class RatesHistoricalComponentController {
    constructor(ComponentsCurrenciesService, RatesHistoricalHttpService) {
      this.currencies = ComponentsCurrenciesService.currencies;
      this.currency = 'EUR';
      this.from = new Date();
      this.to = new Date();
      this.rhhs = RatesHistoricalHttpService;
    }

    getRates() {
      this.rhhs.rates(this.currency, this.from, this.to).then(response => {
        this.rates = response.data.rates;
      });
    }
  }
};